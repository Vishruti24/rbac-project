// const mongoose = require('mongoose');
// require('dotenv').config();

// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// const db = mongoose.connection;

// db.on('connected', () => console.log('Connected to MongoDB'));
// db.on('error', (err) => console.log('MongoDB connection error:', err));

// module.exports = db;
const mongoose = require('mongoose');
require('dotenv').config();

//Define the MongoDB connection URL
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/rbac-project';




//setup MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

//get default connection
//mongoose maintains a default connection object representing mongodb connection
const db = mongoose.connection;

//default event listener for database connection
db.on('connected', () => {
    console.log('Connected to Mongodb server..');
});
db.on('error', (err) => {
    console.log('Mongodb connection error..',err);
});
db.on('disconnected', () => {
    console.log('Mongodb disconnected..');
});

//export the database connection
module.exports = db;  