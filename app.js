const express = require("express");
const bodyparser = require("body-parser");
const path = require('path');
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const router = require("./routes/route");

const app = express();


app.use(express.static(path.join(__dirname,'public')));
app.use('/uploads', express.static('uploads'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

mongoose.connect('mongodb://localhost:27017/cloudinary',{useNewUrlParser: true});

mongoose.connection;

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');

        return res.status(200).json({})
    }
    next();
})

app.use('/uploads', router);


app.use((req, res, next) => {
    const error = new Error('NOT FOUND')
    error.status = 404
    next(error)
    })

app.use((error, req, res, next) =>{
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})


app.listen(port, () => console.log(`Server started on ${port}`));


module.exports = app