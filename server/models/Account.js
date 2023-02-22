const mongoose = require("mongoose");

/**
 * This mongoose schema defines the structure of an account document in the database.
 */
const accountSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a firstName"],
    },

    lastName: {
      type: String,
      required: [true, "Please add a lastName"],
    },

    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },

    picture: {
      type: String,
      required: [true, "Please add a picture"],
    },
  },

  {
    timestamps: true,
  }
);

/**
 * Export the schema as a mongoose model.
 */
module.exports = mongoose.model("Account", accountSchema);
