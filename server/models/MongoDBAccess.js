const mongoose = require('mongoose');
const config = require('./dbConfig.json')

class MongoDBAccess {
    constructor() {
        this.connection = null;
        this.uri = config.mongoUri;
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