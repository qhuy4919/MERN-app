export { }
require('dotenv').config();
const express = require('express');
const router = express.Router();
//
const User = require('../model/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// @router Post api/auth/register
// @desc Register user
// @access public

router.post('/register', async (req: any, res: any) => {
    const { username, password } = req.body;

    // simple validate
    if (!username || !password) {
        return res.status(400)
            .json({ sucess: false, message: 'Missing usrename and/or password' });
    }
    try {
        //check for exstring user
        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({
                success: false,
                message: 'Username already taken',
            });
        }
        //hash password
        const hashedPassword = await argon2.hash(password);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // return a token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);

        res.json({
            success: true,
            message: 'User created successfully',
            token: accessToken
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
})

//@router POST api/auth/login
//@desc Login user
//@access public
router.post('/login', async (req: any, res: any) => {
    const { username, password } = req.body;
    //simple validation
    if (!username || !password)
        return res
            .status(400)
            .json({ success: false, message: 'Missing username and/or password' });
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect username and/or password' });
        }

        //user found
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            return res
                .status(400)
                .json({ success: false, meassage: 'Password not valid' });
        }
        else {
            //access token was made by userId and signature
            const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
            return res
                .json({ success: true, message: 'Login successful', accessToken });
        }

    } catch (error) {
        return res
            .status(500)
            .json({ success: false, meassage: 'Internal server error' });
    }

})

module.exports = router;