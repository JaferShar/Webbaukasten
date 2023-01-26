const mongoose = require('mongoose');

const elementSchema = new mongoose.Schema({
    elementType: {type: String, required: true},
},{ discriminatorKey: 'elementType'});

const pictureSchema = new mongoose.Schema({
    elementId: {type: mongoose.Schema.Types.ObjectId, ref:'Element', required: true},
    picName: String,
    image: {
        data: {type: Buffer, required: true},
        picType: String,
    }
});

const textFieldSchema = new mongoose.Schema({
    elementId: {type: mongoose.Schema.Types.ObjectId, ref:'Element', required: true},
    text: String,
});

const h5pSchema = new mongoose.Schema({
    elementId: {type: mongoose.Schema.Types.ObjectId, ref:'Element', required: true},
    h5pName: String,
    content: {
        type: Buffer,
        required: true
    },
});

module.exports = mongoose.model('Element', elementSchema);
module.exports = mongoose.discriminator('picture', pictureSchema);
module.exports = mongoose.discriminator('text', textFieldSchema);
module.exports = mongoose.discriminator('h5p', h5pSchema);