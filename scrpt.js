const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Route marka qofku fariin soo diro
app.post('/contact', (req, res) => {
    const { name, email, message, phone } = req.body;

    // Tani waa meesha aad ku xirayso Email-kaaga si aad u hesho dalabaadka
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Email-kaaga halkan geli
            pass: 'your-app-password'      // Password-kaaga halkan geli
        }
    });

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com',
        subject: `New Order from ${name} - Barwaaqo Fresh`,
        text: `Name: ${name}\nPhone: ${phone}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send("Error occurred: " + error.message);
        }
        res.send("<h1>Thank you! Your order/message has been received. We will contact you soon.</h1>");
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});