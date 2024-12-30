const UserModel = require("../../models/userModel");
const otpData = new Map();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const sendOtpOnUserRegistration = async (req, res) => {
    try {
        const isAvailable = await UserModel.findOne({ email: req.body.email });
        console.log(isAvailable);

        if (!isAvailable) {

            otpData.clear();

            const otp = Math.floor(Math.random() * 900000);
            otpData.set(req.body.email, otp);
            console.log(otpData);

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.USER_NAME,
                    pass: process.env.PASS
                }
            })

            const info = await transporter.sendMail({
                from: '"Frank and Oak" <frankandoak@gmail.com>',
                to: req.body.email,
                subject: 'OTP for Registration in Frank and Oak',
                text: ``, // can't add html, only plan text
                body: `<i><b>Your OTP is : ${otp}</b></i>`, // doesn't show anywhere in the mail  // mail with html attribute, but if included, will overwrite the text attribute
                html: `
                <!doctype html> <html lang="en">
                <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <title>OTP for Login</title> <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"> <link rel="stylesheet" href="/style.css"> <style> body {font-family: Arial, sans-serif;background-color: #f4f4f4;padding: 0;margin: 0}.container-sec {background-color: #ffffff;border-radius: 8px;padding: 20px;margin-top: 30px;box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);max-width: 600px;} .otp-code { font-size: 24px; font-weight: bold; background-color: #f8f9fa; padding: 15px; text-align: center; border-radius: 8px; border: 1px dashed #007bff; color: #007bff; } .footer-text { color: #6c757d; font-size: 14px; text-align: center; margin-top: 20px; } .footer-text a { color: #007bff; text-decoration: none; } .otp-lock { color: #333; font-size: 80px; } .welcome-section { background: #144fa9db; padding: 30px; border-radius: 4px; color: #fff; font-size: 20px; margin: 20px 0px; }i.fas.fa-envelope-open { font-size: 35px !important; color: #ffffff; } </style> </head>
                <body> <div class="container-sec"> <div class="text-center"><h2 class="text-center">Hello</h2> <p>Your One-Time Password (OTP) for verification is:</p> <div class="otp-code">${otp}</div> <p class="mt-4">Please use this OTP to complete your verification. The OTP is valid for the next 10 minutes.</p> </div> <div class="footer-text"> <p>If you did not request this OTP, please <a href="#">contact us</a> immediately.</p> <p>Thank you, <br>Frank And Oak Team</p> </div> </div> </body> </html>`
            })
            console.log(otp);
            setTimeout(() => {
                otpData.delete(req.body.email);
            }, 120000);

        }
        res.status(200).json({ message: 'success', data: isAvailable });
    }
    catch (error) {
        console.log(error);
        if (error.name == 'ValidationError') return res.status(400).json({ message: 'required fields are missing!' })
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const validateOtpAndRegisterUser = async (req, res) => {
    try {
        const generatedOtp = otpData.get(req.body.email);
        console.log(req.body);
        console.log('generated otp is ', generatedOtp);
        if (!generatedOtp) return res.status(401).json({ message: 'OTP Expired! Generate OTP again' });
        if (generatedOtp !== Number(req.body.otp)) return res.status(403).json({ message: 'Invalid OTP!' });

        const data = new UserModel(req.body);
        const response = await data.save();
        console.log(response);
        res.status(204).json({ message: 'OTP Varified. Your Account have been created successfully' });
    }
    catch (error) {
        console.log(error);
        if (error.name == 'ValidationError') return res.status(400).json({ message: 'required fields are missing!' })
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const loginUser = async (req, res) => {
    try {
        const isAvailable = await UserModel.findOne({ email: req.body.email });

        if (isAvailable) {
            if (isAvailable.password === req.body.password) {
                const { password, ...userWithoutPassword } = isAvailable._doc;
                console.log(userWithoutPassword);
                jwt.sign(userWithoutPassword, process.env.JWT_SECRET_KEY, { expiresIn: 600 }, (err, token) => { // expires in 600 seconds
                    if (err) return res.status(500).json({ message: 'try again after sometime...', data: null });
                    return res.status(200).json({ message: 'success', token });
                });
            }
            else {
                return res.status(403).json({ message: 'incorrect password', data: null });
            }
        }
        if (!isAvailable) return res.status(404).json({ message: 'user not found! Please Register', data: null });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const isAvailable = await UserModel.findOne(req.params);
        
        if (!isAvailable) return res.status(404).json({ message: 'user not found! Please Register', data: null });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_NAME,
                pass: process.env.PASS
            }
        })

        const info = await transporter.sendMail({
            from: '"Frank and Oak" <frankandoak@gmail.com>',
            to: isAvailable.email,
            subject: 'Password for Login FrankAndOak',
            body: `<i><b>Your PASSWORD is : ${isAvailable.password}</b></i>`,
            html: `
            <!doctype html> <html lang="en">
            <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <title>Password for Login</title> <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"> <link rel="stylesheet" href="/style.css"> <style> body {font-family: Arial, sans-serif;background-color: #f4f4f4;padding: 0;margin: 0}.container-sec {background-color: #ffffff;border-radius: 8px;padding: 20px;margin-top: 30px;box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);max-width: 600px;} .otp-code { font-size: 24px; font-weight: bold; background-color: #f8f9fa; padding: 15px; text-align: center; border-radius: 8px; border: 1px dashed #007bff; color: #007bff; } .footer-text { color: #6c757d; font-size: 14px; text-align: center; margin-top: 20px; } .footer-text a { color: #007bff; text-decoration: none; } .otp-lock { color: #333; font-size: 80px; } .welcome-section { background: #144fa9db; padding: 30px; border-radius: 4px; color: #fff; font-size: 20px; margin: 20px 0px; }i.fas.fa-envelope-open { font-size: 35px !important; color: #ffffff; } </style> </head>
            <body> <div class="container-sec"> <div class="text-center"><h2 class="text-center">Hello</h2> <p>You password to Log into FrankAndOak is:</p> <div class="otp-code">${isAvailable.password}</div> <p class="mt-4">Please use this Password to Log into FrankAndOak.</p> </div> <div class="footer-text"> <p>If you did not request this password, please <a href="#">contact us</a> immediately.</p> <p>Thank you, <br>Frank And Oak Team</p> </div> </div> </body> </html>`
        })
        console.log(info);

        res.status(200).json({ message: 'Password sent to your registered email' })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const verifyJWT = async (req, res) => {
    try {

        const authHeader = req.headers.authorization; // Get the Authorization header
        if (authHeader && authHeader.startsWith('Bearer ')) {
            req.token = authHeader.split(' ')[1]; // Extract the token (after "Bearer")
        } else {
            req.token = null; // Handle cases where the token isn't present
        }

        jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, decoded_userData) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ message: 'Please Login Again!', data: null });
            }
            console.log(decoded_userData);
            return res.status(200).json({ message: 'success', data: decoded_userData });
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    sendOtpOnUserRegistration,
    validateOtpAndRegisterUser,
    loginUser,
    verifyJWT,
    forgotPassword
}