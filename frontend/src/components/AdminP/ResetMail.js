import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: 'emailsender203@gmail.com', 
    pass: 'azet ezjd rnli rvir' 
  }
});

const sendEmail = (req, res) => {
  const { status, password, reason, email } = req.body;

  const requestStatus = status;
  const newPassword = password;
  const rejectReason = reason;

  if (requestStatus === "Approved") {
    transporter.sendMail({
      to: email, 
      subject: 'Approved Password Reset',
      html: `<h3>Your password reset request has been approved.</h3>
             <h4>Your new password is:</h4>
             <h1 style="color: red;">${newPassword}</h1>`
    })
    .then(info => {
      res.status(200).json({ message: 'Email sent', info: info.response });
    })
    .catch(err => {
      res.status(500).json({ error: 'Error sending email', err });
    });

  } else if (requestStatus === "Rejected") {
    transporter.sendMail({
      to: email, 
      subject: 'Rejected Password Reset',
      html: `<h3 style="color: red;">Your request for password reset has been rejected</h3>
             <h4>Reason: ${rejectReason}</h4>`
    })
    .then(info => {
      res.status(200).json({ message: 'Email sent', info: info.response });
    })
    .catch(err => {
      res.status(500).json({ error: 'Error sending email', err });
    });
  }
};

export default sendEmail;
