const mongoose = require('mongoose');

const elementSchema = new mongoose.Schema({
    elementType: { type: String, required: true },
}, {discriminatorKey: 'elementType'});

const Element = mongoose.model('Element', elementSchema)

const Picture = Element.discriminator('Picture', 
    new mongoose.Schema({
        data: {type: Buffer, required: true},
        contentType: { type: String, required: true}
    })
)

const TextField = Element.discriminator('TextField',
    new mongoose.Schema({
        text: {
            type: String,
            default: '',
        }
    })
)

const H5P = Element.discriminator('H5P',
    new mongoose.Schema({
        h5pName: String,
        content: {
            type: Buffer,
            required: true
        },
    })
)

const screenSchema = new mongoose.Schema({
    template: {
        type: String,
        enum: ['Welcome', 'Standard', 'End'],
        default: 'Welcome',
        required: true,
    },
    elements: {
        type: [elementSchema],
        default: [],
    }
})

const Screen = mongoose.model('Screen', screenSchema)

module.exports = {
    Screen,
    Picture,
    TextField,
    H5P,
}