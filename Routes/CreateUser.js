const express = require('express')
const router = express.Router()
const User = require("../models/User")

const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = "f6e1a07ed465cdf507cace28ffad68ab33c188db77b4a17d19881f4b525a43aff91114e1fa66949ebce3e478fcdf4f16eb9c143660f8b0c0b72d60c8c7c0905e";

router.post("/createuser",
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', "Minimum length needs to be 5").isLength({ min: 5 }),
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });

        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

router.post("/loginuser",
    body('email').isEmail(),
    body('password', "Minimum length needs to be 5").isLength({ min: 5 }),
    async (req, res) => {

        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging with correct password" });
            }

            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken: authToken });


        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })


module.exports = router;