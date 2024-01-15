require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = async () => {
    const URI = process.env.DATABASE_URI;
    try {
        await mongoose.connect(URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;