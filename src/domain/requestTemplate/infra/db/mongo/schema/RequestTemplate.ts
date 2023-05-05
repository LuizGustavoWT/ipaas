import * as mongoose from "mongoose";

const RequestTemplateSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true,
        auto: true
    },

    type: {
        type: String,
        enum: ["queryParams", "json", "xml", "namedParams"],
        required: true
    },

    template: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },

    deletedAt: {
        type: Date,
        default: null
    }
});


export const RequestTemplateModel = mongoose.model("RequestTemplate", RequestTemplateSchema);