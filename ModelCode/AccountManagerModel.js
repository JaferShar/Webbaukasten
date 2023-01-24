const { default: mongoose } = require('mongoose');
const MongoDBAccess = require('./MongoDBAccess');
const { accountSchema } = require('./schema');

/**
 * MongoDBAccess class is an abstraction layer that simplifies interaction with MongoDB database.
 */
class AccountManagerModel {
    constructor() {
        super();
        this.model = mongoose.model('Account', accountSchema);
    }

    /**
     * This method creates a new Account document in MongoDB collection Account.
     * @param {Account} account Object of lib/Account
     */
    async create(account) {

    }

    /**
     * This method gets an Account
     * @param {ObjectId} accountId 
     */
    async getAccount(accountId) {

    }

    async getAccount(email) {

    }

    async update(account) {

    }

    async delete(accountId) {

    }
}