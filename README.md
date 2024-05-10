# ScheduSend

ScheduSend is a web application that allows users to schedule SMS messages for sending at a later time. This project integrates with Twilio for sending SMS messages and Nodemailer for sending OTP verification emails.

![ScheduSend](https://firebasestorage.googleapis.com/v0/b/portfolio-31d98.appspot.com/o/Screenshot%202024-05-10%20140407.png?alt=media&token=a54de966-e184-4d38-be0b-14f267e7c774)


![ScheduSend](https://firebasestorage.googleapis.com/v0/b/portfolio-31d98.appspot.com/o/Screenshot%202024-05-10%20152120.png?alt=media&token=14204020-3347-448c-b215-492c672df047)


![ScheduSend](https://firebasestorage.googleapis.com/v0/b/portfolio-31d98.appspot.com/o/Screenshot%202024-05-10%20152257.png?alt=media&token=c408af30-27a5-4c3c-a63b-4698059b12cb)

![ScheduSend](https://firebasestorage.googleapis.com/v0/b/portfolio-31d98.appspot.com/o/Screenshot%202024-05-10%20152403.png?alt=media&token=8ad67c65-7985-4fe5-895d-2a717e77fc35)

## Features

- User authentication (signup, login, OTP verification)
- Schedule SMS messages for future delivery
- Email verification using OTP
- Responsive design for mobile and desktop

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine
- A Twilio account for sending SMS messages
- A Gmail account for sending OTP verification emails

## Installation

To install and run ScheduSend locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ScheduSend.git


2. Navigate to the project directory:

   ```bash
   cd ScheduSend

3. Install dependencies:

   ```bash
   npm install

4. Set up environment variables: Create a .env file in the root directory and add the following variables:

   ```bash
   PORT=3000
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
Replace your_twilio_account_sid and your_twilio_auth_token with your actual Twilio credentials.


5. Run the application:

   ```bash
   npm start
The application should now be running on http://localhost:3000.


## Usage

- Sign up for a new account or login if you already have one.
- Verify your email address using the OTP sent to your email.
- Once logged in, navigate to the "Send Message" page.
- Enter the recipient's name, phone number, message content, and the desired send time.
- Click the "Send Message" button to schedule the SMS for sending.
- You'll be redirected to the "Send Message" page where you can see the status of your scheduled message.


## Technology
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Twilio (for sending SMS messages)
- Nodemailer (for sending OTP verification emails)
- HTML/CSS (with Bootstrap)
- Handlebars (for templating)


## Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

- Fork the repository
- Create a new branch (git checkout -b feature)
- Make your changes
- Commit your changes (git commit -am 'Add feature')
- Push to the branch (git push origin feature)
- Create a new pull request


## Acknowledgements

- [Twilio API Documentation](https://www.twilio.com/docs)
- [Nodemailer Documentation](https://nodemailer.com/about/)
- [Express.js Documentation](https://expressjs.com/)
- [Handlebars Documentation](https://handlebarsjs.com/)


## Demo

Watch the demo video below to see how the ScheduSend works:

[![ScheduSend Demo](https://firebasestorage.googleapis.com/v0/b/portfolio-31d98.appspot.com/o/Screenshot%202024-05-10%20140407.png?alt=media&token=a54de966-e184-4d38-be0b-14f267e7c774)](https://firebasestorage.googleapis.com/v0/b/portfolio-31d98.appspot.com/o/ScheduSend%20-%20Google%20Chrome%202024-05-10%2015-19-22.mp4?alt=media&token=c229db67-fced-48be-9977-df3da5ac74db)

