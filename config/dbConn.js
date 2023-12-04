require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = async () => {
    const URI = 'mongodb+srv://Ivsha10:ABCurh1Y7QJ84km5@cluster0.l8mwozk.mongodb.net/CollegeCentralDB?retryWrites=true&w=majority'
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