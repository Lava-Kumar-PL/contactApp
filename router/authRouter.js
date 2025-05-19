const { Router } = require('express')
const router = Router();
const userSchema = require('../models/UserSchema')
const bcrypt = require('bcrypt')
// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken')

router.get('/signup', (req, res) => {
    res.render('contact/signup')
})

const generateToken = (userid) => {
    return jwt.sign({userid }, process.env.SECRET_KEY, { expiresIn: '1h' });
};

router.post('/createuser', async (req, res) => {
    console.log(req.body.password, "     intial")
    const salt = await bcrypt.genSalt(8)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword
    let user = await userSchema.create(req.body)
    let token = generateToken(user._id)
    console.log(token)
    res.cookie('token', token, { 
        httpOnly: true,      // Not accessible via JavaScript
        secure: false,       // Set to true in production (HTTPS)
        sameSite: "Strict",  // CSRF protection
        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    });
    console.log(token)
    res.redirect('/contact/list', 307, { success: true, message: "created user" })

})

router.get('/login/:id',(req,res)=>{
    let token = generateToken(req.params.id)
    res.cookie('token', token, { 
        httpOnly: true,      // Not accessible via JavaScript
        secure: false,       // Set to true in production (HTTPS)
        sameSite: "Strict",  // CSRF protection
        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    });
    console.log(token)
    const verified = jwt.verify(token, process.env.SECRET_KEY);
  console.log(verified)
    res.redirect('/contact/list', 307, { success: true, message: "created user" })
})


router.get('/logout', (req, res) => {
  res.clearCookie('token');
  
    res.redirect('/contact/list', 307, { success: true, message: "created user" })
 
});



module.exports = router