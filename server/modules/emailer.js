// module to send emails using nodemailer
// called from message.router
const nodemailer = require('nodemailer');

module.exports = sendEmail = ( emailInfo) => {
    // get email parameters from emailInfo
    // toAddress is email message is being sent to
    // recipient is first name of user email is being sent to
    // message is current message being sent
    // original message is only true if this is a reply to a message
    const toAddress = emailInfo.email;
    const recipient = emailInfo.first_name;
    const message = emailInfo.message;
    const originalMessage = emailInfo.originalMessage;
    let body;
    if( originalMessage !== undefined ){
        // if there is an originalMessage then this is a reply to a message
        // href must be modified to link to correct url
        body = `<p>Hi ${recipient}! <br />You got a response to your request in the We Can Ride volunteer app:<br /><br />"${message}"
        <br /><br /><i>Original Message: ${originalMessage}</i><br /><br />
        <br /><br />To keep looking for someone to cover your shift please log into your volunteer account.
        If you are having trouble finding a replacement please contact We Can Ride:<br />
        Email: volunteers@wecanride.org<br />
        Phone: 952-934-0057 <br /><br />
        <a href="http://we-can-ride-volunteer-schedule.herokuapp.com//#/">We Can Ride</a><br /><br />
        This is an automated email. Please do not reply to this email here.</p>`
    }
    else {
        // else, this is an original message / request to cover a shift
        body = `<p>Hi ${recipient}! <br />You got a request to trade a We Can Ride volunteer shift:<br /><br />"${message}"
        <br /><br />To reply to this message or take the shift please log into your volunteer account.<br />
        <a href="https://we-can-ride-volunteer-schedule.herokuapp.com//#/">We Can Ride</a><br /><br />
        This is an automated email. Please do not reply to this email here.</p>`
    }

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
        subject: `You got a request in We Can Ride`,
        html: `${body}`
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

}; // end sendEmail
