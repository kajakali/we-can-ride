// module to send email links protected with web token's
const nodemailer = require('nodemailer');

module.exports = sendEmailLink = ( emailInfo) => {
    // get email parameters from emailInfo
    const toAddress = emailInfo.email;
    const recipient = emailInfo.name;
    const id = emailInfo.id;
    const token = emailInfo.newToken;
    //console.log( `Sending email to user ${recipient}, id = ${id}, at email address ${toAddress} with token ${token}` );


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
        subject: `You got a message`,
        html: `<p>Hi ${recipient}, You are receiving this email because a request was made to reset your volunteer
                account password with We Can Ride. To reset your password click the link below.</p> <br />
                <a href="https://we-can-ride-volunteer-schedule.herokuapp.com//#/reset/${id}/${token}">RESET PASSWORD</a><br />
                <p>If you still have trouble with your account pleaser contact the volunteer coordinator.<br />
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

}; // end sendEmailLink
