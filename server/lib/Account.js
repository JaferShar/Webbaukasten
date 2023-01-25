class Account {
    constructor(accountId, firstName, surname, email) {
        this.accountId = accountId;
        this.firstName = firstName;
        this.surname = surname;
        this.email = email;
    }

    // getters
    getAccountId() {
        return this.accountId;
    }

    getFirstName() {
        return this.firstName;
    }

    getSurname() {
        return this.surname;
    }

    getEmail() {
        return this.email;
    }

    // setters
    setAccountId(accountId) {
        this.accountId = accountId
    }

    setFirstName(firstName) {
        this.firstName = firstName;
    }

    setSurname(surname) {
        this.surname = surname;
    }

    setEmail(email) {
        this.email = email;
    }
}

module.exports = Account