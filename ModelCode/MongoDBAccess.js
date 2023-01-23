const mongoose = require('mongoose');
const uri = 'mongodb+srv://Nick:ZnBzioOGU9oFAnwA@cluster0.z5edzea.mongodb.net/test';

class MongoDBAccess {
    constructor() {
        this.connection = null;
    }

    // connects to the database
    async connect() {
        try {
            this.connection = await mongoose.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('Connected to MongoDB');
        } catch (err) {
            console.error(err);
        }
    }

    // close the connection
    async close(){
        await mongoose.connection.close();
        console.log('Connection closed');
    }
}

module.exports = MongoDBAccess;