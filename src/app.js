const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const nodemailer = require("nodemailer");
const path = require("path");
require("./db/conn");
const Message = require('./models/message');
const UserDetails = require("./models/user");
const twilio = require('twilio');
const accountSid = '';
const authToken = '';
const client = twilio(accountSid, authToken);

const port = process.env.PORT || 3000;

const app = express();

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");

app.use(express.static(static_path));
app.use(express.static(static_path, { 
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.js')) {
            res.set('Content-Type', 'text/javascript');
        }
    }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "hbs");
app.set("views", template_path);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/index', (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/otp", (req, res) => {
    res.render("otp");
});

app.get("/details", (req, res)=>{
    res.render("details");
});

app.get("/send-message", (req, res) => {
    res.render("send-message");
});

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: 'Your_Gmail_ID_Here',
        pass: 'Your_Password_Here'
    },
});

// Function to send OTP email
async function sendOTPByEmail(email, otp) {
    try {
        const info = await transporter.sendMail({
            from: 'Your_Gmail_ID_Here',
            to: email,
            subject: "OTP Verification",
            text: `Your OTP for verification is: ${otp}`,
            html: `<b>Your OTP for verification is: ${otp}</b>`,
        });

        console.log("Email sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

// Function to generate random OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

// Handle signup form submission
app.post("/signup", async (req, res) => {
    try {
        const { fullname, email, phone, password } = req.body;

        // Store user details in the database
        const otp = generateOTP();
        const newUser = new UserDetails({ fullname, email, phone, password, otp });
        await newUser.save();

        // Send OTP to user's email
        await sendOTPByEmail(email, otp);

        // Redirect user to OTP verification page
        res.redirect(`/otp?userId=${newUser._id}`);
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Handle OTP verification form submission
app.post("/otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Verify OTP (compare with stored OTP)
        const user = await UserDetails.findOne({ email });
        if (!user) {
            return res.render("otp", { error: "Invalid OTP" });
        }

        // Update user status to indicate email verification
        user.isEmailVerified = true;
        await user.save();

        // Redirect user to details form
        res.redirect(`/details?userId=${user._id}`);
    } catch (error) {
        console.error("Error during OTP verification:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Handle POST request to login endpoint
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if a user with the provided email exists in the database
        const user = await UserDetails.findOne({ email });

        // If user is not found, redirect back to login page with an error message
        if (!user) {
            return res.render("login", { error: "Invalid email or password." });
        }

        // Verify the password
        if (user.password !== password) {
            // If password is incorrect, redirect back to login page with an error message
            return res.render("login", { error: "Invalid email or password." });
        }

        // If email and password are valid, redirect to dashboard or home page
        res.redirect("/details"); // Change "/dashboard" to the appropriate route

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/details", async (req, res) => {
    try {
        const userId = req.query.userId; // Retrieve userId from query parameters
        const { recipientName, messageContent, sendTime } = req.body;

         // Format the phone number to E.164 format (+91XXXXXXXXXX)
         let recipientNumber = req.body.recipientNumber;
         recipientNumber = recipientNumber.replace(/^0+/, ''); // Remove leading zeros
         recipientNumber = "+91" + recipientNumber;

         const currentTime = new Date();

         // Calculate the desired sendAt time (15 minutes in the future)
         const sendAtTime = new Date(currentTime.getTime() + (15 * 60 * 1000)); // 15 minutes in milliseconds

         // Ensure sendAt time is within the allowed range
         if (sendAtTime.getTime() > currentTime.getTime() + 3024000000) {
            // If sendAt time is beyond the maximum allowed range, adjust it to the maximum allowed time
            sendAtTime.setTime(currentTime.getTime() + 3024000000);
         }
        // Create a new message document
        const newMessage = new Message({
            userId: userId,
            recipientName: recipientName,
            recipientNumber: recipientNumber,
            messageContent: messageContent,
            sendTime: sendTime
        });

        // Save the message to the database
        await newMessage.save();

        // Send SMS message
        // await sendSMS(recipientNumber, messageContent);
        // Schedule the message using Twilio
        await client.messages.create({
            body: messageContent,
            from: 'Your_Twilio_Number_Here', // Your Twilio phone number
            to: recipientNumber,
            sendAt: new Date(sendTime),
            scheduleType: 'fixed', 
            messagingServiceSid: 'Your_Messaging_ID_Here' 
        });


        // Redirect to send-message page
        res.redirect("/send-message");
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).send('Internal Server Error');
    }
});


async function sendSMS(recipientNumber, messageContent) {
    try {
        const message = await client.messages.create({
            body: messageContent,
            from: 'Your_Twilio_Number_Here',
            to: recipientNumber
        });
        console.log('SMS scheduled:', message.sid, 'at', sendTime);
        return message.sid;
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
}


app.listen(port, () => {
    console.log(`Server is running at port number ${port}`);
});
