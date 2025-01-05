import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'emailsender203@gmail.com', 
    pass: 'azet ezjd rnli rvir',      
  },
});

const sendEmail = (req, res) => {
  const { status, password, reason, email } = req.body;
//.
  let mailOptions = {};
  if (status === "Approved") {
    mailOptions = {
      to: email,
      subject: 'Password Reset Approved',
      html: `<h3>Your password reset request has been approved.</h3>
             <h4>Your new password is:</h4>
             <h1 style="color: red;">${password}</h1>`,
    };
  } else if (status === "Rejected") {
    mailOptions = {
      to: email,
      subject: 'Password Reset Rejected',
      html: `<h3 style="color: red;">Your password reset request has been rejected.</h3>
             <h4>Reason: ${reason}</h4>`,
    };
  } else {
    return res.status(400).json({ error: "Invalid status" });
  }

  transporter.sendMail(mailOptions)
    .then(info => {
      res.status(200).json({ message: 'Email sent successfully', info: info.response });
    })
    .catch(err => {
      res.status(500).json({ error: 'Error sending email', err });
    });
};

export default sendEmail;
