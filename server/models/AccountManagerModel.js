const { default: mongoose } = require('mongoose');
const MongoDBAccess = require('./MongoDBAccess');
const Account = require('../databases/Account');

/**
 * The AccountManagerModel class is a database access class to save and load data of an Account. It extends from its super class 
 * MongoDBAccess.
 */
class AccountManagerModel extends MongoDBAccess {
    constructor() {
        super();
    }

    /**
     * This method creates a new Account document in MongoDB collection Account.
     * @param {Account} account Object of lib/Account
     */
    async create(account) {
        this.connect();
        Account.insertOne()
    }

    /**
     * This method gets an Account by its identifier. The identifier could be either an Account identifier
     * nor an email to identifiy the Account document.
     * @param {String} identifier  
     */
    async getAccount(identifier) {

    }

    /**
     * This method updates the data of an Account. It uses the getAccount method to get the Account to be changed. 
     * @param {Account} account Object of lib/Account
     */
    async update(account) {

    }

    /**
     * This method deletes an Account from the collection Account by its identifier. The identifier could be either
     * an Account identifier nor an email to identifiy the Account document.
     * @param {String} identifier 
     */
    async delete(identifier) {

    }
}

module.exports = AccountManagerModel;