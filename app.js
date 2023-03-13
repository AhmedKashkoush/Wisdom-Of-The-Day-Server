const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const api = require('./routes/api');

app.use(cors());
app.use(express.json());

mongoose.set('strictQuery',true);
mongoose.connect('mongodb://127.0.0.1:27017/wisdomsdb').then(() => {
    const port = process.env.PORT || 3000;
    app.use('/api/v1',api);
    app.listen(port,() => {
        console.log('Server running on port:',port);
    });
});