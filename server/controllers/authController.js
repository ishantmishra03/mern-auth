import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userModel from '../models/user.models.js'
import transporter from '../config/nodemailer.js';

//API for signing up user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Al;l fields are required" });
        }

        //Check is user already exists
        const user = await userModel.findOne({ email });
        if (user) {
            return res.json({ success: false, message: "User exists already" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await userModel.create({
            name, email, password: hashedPassword,
        });

        const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000
        })

        //Welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to DevAuth03",
            text: `Welcome to DevAuth03. Your account has been created with the email: ${email}`,
            html: `<p>Welcome to <strong>DevAuth03</strong>. Your account has been created with the email: <strong>${email}</strong></p>`,
        };


        await transporter.sendMail(mailOptions);

        return res.json({ success: true });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//API for logging USER
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Something went wrong" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000
        })

        return res.json({ success: true });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//API for logging OUT USER
export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
        })

        return res.json({ success: true, message: "Logged Out" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//API for sending verification OTP
export const sendVerifyOTP = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId);
        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account already verified" });
        }

        const OTP = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOTP = OTP;
        user.verifyOTPExpireAt = Date.now() + 1 * 60 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification DevAuth03",
            html: `<p>Verify your <strong>DevAuth03</strong> account. Your verification OTP: <strong>${OTP}</strong></p>`,
        };


        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: "OTP sent to email" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//API for verifying email
export const verifyAccount = async (req, res) => {
    try {
        const userId = req.userId;
        const { OTP } = req.body;

        if (!userId || !OTP) {
            return res.json({ success: false, message: "All fileds are required" });
        }
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "Something went wrong" });
        }

        if (user.verifyOTP === "" || user.verifyOTP !== OTP) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.verifyOTPExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" });
        }

        user.isAccountVerified = true;
        user.verifyOTP = '';
        user.verifyOTPExpireAt = 0;
        await user.save();

        return res.json({ success: true, message: "Account verified" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//API to check if user is Authenticated
export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//OTP to reset password
export const sendResetOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.json({ success: false, message: "All fields are required" });

        const user = await userModel.findOne({ email });
        if (!user) return res.json({ success: fasle, message: "Invalid credentials" });

        const OTP = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOTP = OTP;
        user.resetOTPExpireAt = Date.now() + 1 * 60 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Passwor Reset DevAuth03",
            html: `<p>Reset your <strong>password</strong>. Your reset OTP: <strong>${OTP}</strong></p>`,
        };


        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: "OTP sent to email" });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// API to Reset password
export const resetPassword = async (req, res) => {
    try {
        const { email, OTP, newPassword } = req.body;

        if (!email || !OTP || !newPassword) {
            return res.json({ success: false, message: "All fields are required" });
        }

        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({ success: false, message: "Something went wrong" });
        }

        if (user.resetOTP === "" || user.resetOTP !== OTP) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.resetOTPExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOTP = '';
        user.resetOTPExpireAt = 0;
        await user.save();

        return res.json({ success: true, message: "Password updated" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}