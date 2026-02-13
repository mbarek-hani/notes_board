import mongoose from 'mongoose';
import { body, param } from "express-validator";

const noteSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    colors: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // name of the User model
        // required: true,
        index: true
    }

}, { timestamps: true });

export default mongoose.model('Note', noteSchema);

//validation
export const createNoteValidator = [
    body("body")
        .notEmpty().withMessage("Body is required"),

    body("colors")
        .notEmpty().withMessage("Color is required"),

    body("position")
        .notEmpty().withMessage("Position is required")
];

export const updateNoteValidator = [
    param("id")
        .isMongoId().withMessage("Invalid note ID"),

    body("body")
        .optional()
        .notEmpty().withMessage("Body cannot be empty"),

    body("colors")
        .optional()
        .notEmpty().withMessage("Color cannot be empty"),

    body("position")
        .optional()
        .notEmpty().withMessage("Position cannot be empty")
];
