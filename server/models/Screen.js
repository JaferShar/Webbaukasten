const mongoose = require("mongoose");

/**
 * This mongoose schema defines the structure of an element placed on a screen. 
 * It uses the discriminator feature of mongoose to determine between elements.
 * The discriminator key is the elementType property.
 */
const elementSchema = new mongoose.Schema(
  {
    elementType: { type: String, required: true },
  },
  { discriminatorKey: "elementType" }
);

const Element = mongoose.model("Element", elementSchema);

/**
 * This mongoose schema defines the structure of a picture element placed on a screen.
 */
const Picture = Element.discriminator(
  "Picture",
  new mongoose.Schema({
    url: {
      type: String,
      required: true,
    },
  })
);

/**
 * This mongoose schema defines the structure of a text field element placed on a screen.
 */
const TextField = Element.discriminator(
  "TextField",
  new mongoose.Schema({
    text: {
      type: String,
      default: "",
    },
  })
);

/**
 * This mongoose schema defines the structure of a H5P element placed on a screen.
 */
const H5P = Element.discriminator(
  "H5P",
  new mongoose.Schema({
    content: {
      type: String,
      required: true,
    },
  })
);

/**
 * This mongoose schema defines the structure of a screen document in the database.
 */
const screenSchema = new mongoose.Schema({
  // allowed templates are "Welcome", "Standard" and "End"
  template: {
    type: String,
    enum: ["Welcome", "Standard", "End"],
    default: "Welcome",
    required: true,
  },
  // The elements of a screen are stored as an array of embedded documents.
  elements: {
    type: [elementSchema],
    default: [],
  },
});

screenSchema.pre("remove", async function () {
  const elementIds = this.elements.map((element) => element._id);
  await Element.deleteMany({ _id: { $in: elementIds } });
});

const Screen = mongoose.model("Screen", screenSchema);

/**
 * Export the schemas as mongoose models.
 */
module.exports = {
  Screen,
  Picture,
  TextField,
  H5P,
};
