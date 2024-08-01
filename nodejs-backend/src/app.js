require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const router = require("./routes");
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const ORIGIN = process.env.ORIGIN;
const app = express();


/*
// If "cors" is Used (npm install cors):
const cors = require('cors');
const corsOptions = {
    origin: 'ORIGIN',
    credentials: true,
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
*/


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', ORIGIN);
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    next();
});


app.use(express.json())
app.use(cookieParser())
app.use(router);


app.get('/', (req, res) => {
    res.send('Firestore Database Panel');
});


app.listen(PORT, HOST, () => {
    console.log(`Listening on port ${PORT}`);
});
