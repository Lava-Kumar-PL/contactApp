const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const path = require('path');
require('dotenv').config();
let { connectDb } = require('./config/db');
const cntRouter = require('./router/cntRouter');
const authRouter = require('./router/authRouter')
// import cookieParser from 'cookie-parser';
const cookieParser  = require('cookie-parser')


connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');


app.use('/contact', cntRouter);
app.use('/auth', authRouter);


app.get('/', (req, res) => {
    res.render('contact/home', {
        title: 'Home',
    });
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    console.log("click here http://localhost:5000/")
});