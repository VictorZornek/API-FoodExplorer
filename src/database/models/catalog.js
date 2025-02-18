const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const CatalogSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        required: true,
        trim: true
    },

    ingredients: [
        String
    ],

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    image: {
        type: String,
    }
})

const Catalog = mongoose.model('Catalog', CatalogSchema)

module.exports = Catalog;