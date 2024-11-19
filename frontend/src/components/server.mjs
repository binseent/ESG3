import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const { email } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail', 
        host: "smtp.gmail.com",
        auth: {
            user: 'emailsender203@gmail.com',
            pass: 'azet ezjd rnli rvir',     
        },
    });

    const msg = {
        from: 'emailsender203@gmail.com',  
        to: email, 
        subject: 'Password Reset', 
        text: 'Your new account password is: \n\n --Sample Password--',  
    };

    transporter.sendMail(msg, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email');
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.send('Email sent');
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
