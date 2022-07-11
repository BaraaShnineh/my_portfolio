const express = require('express');
const app = express();

const nodemailer = require("nodemailer");

require('dotenv').config();

const PORT = process.env.PORT;


//Middleware
app.use(express.static('../My_website'));
app.use(express.json());

app.get('/',(req, res)=>{
    res.sendFile(__dirname + '../My_website/index.html')
})


app.post('/', (req, res)=>{
    console.log(req.body)

    const trasporter = nodemailer.createTransport({
        host:process.env.STRATO_HOST,
        port: process.env.STRATO_PORT,
        auth:{
            user:'info@baraa-shnineh.com',
            pass: process.env.ADMIN_PASSWORD
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'info@baraa-shnineh.com',
        text: req.body.form_message
    }

    trasporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email Sent: '+ info.response);
            res.send('success');
        }
    })
})

app.listen(PORT, ()=>{
    console.log('Server running on port ${PORT}')
})