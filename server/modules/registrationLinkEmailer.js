// module to send email links protected with web token's
// called from user router
// require nodemailer to send emails
const nodemailer = require('nodemailer');

module.exports = sendRegistraionLink = ( emailInfo) => {
    // get email parameters from emailInfo
    // toAddress is email the registration link is being sent to, token is webtoken generated for this link
    const toAddress = emailInfo.email;
    const token = emailInfo.token;

    // transporter designates the email service for the We Can Ride account
    // username and password stored in .env file for security
    let transporter = nodemailer.createTransport({
        // service: "Gmail" //instead of host?
        host: `smtp.gmail.com`,
        auth: {
            user: `${process.env.USERNAME}`,
            pass: `${process.env.PASSWORD}`
        }
    });

    // mailOptions specifies the recipient and body of the email
    const mailOptions = {
        from: `${process.env.EMAIL}`,
        to: `${toAddress}`,
        subject: `Become a volunteer`,
        html: `<p>You have been sent a link to register as a volunteer with We Can Ride. To register
                <a href="https://we-can-ride-volunteer-schedule.herokuapp.com/#/register/${token}">Click Here</a></p><br />
                <p>If you have any questions regarding this email please contact We Can Ride.<br />
                Email: volunteers@wecanride.org<br />
                Phone: 952-934-0057</p>`
    };

    // .sendMail uses the transporter and specified mail options to attempt to send an email.
    // logs success or error
    transporter.sendMail( mailOptions, (error, info ) => {
        if(error) {
            console.log( `Error sending email`, error );
        }
        else {
            console.log( 'Success!', info );
        }
    })

}; // end sendRegistrationLink
