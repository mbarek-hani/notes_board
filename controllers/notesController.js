import Note from "../models/Note.js";
import { validationResult } from "express-validator";


// Get All Notes
export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// Get Note By ID
export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id
        });

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// Add Note
export const addNote = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const note = await Note.create({
            body: req.body.body,
            colors: req.body.colors,
            position: req.body.position
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// Update Note
export const updateNoteById = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const note = await Note.findOneAndUpdate(
            {
                _id: req.params.id,
                user_id: req.user.id
            },
            req.body,
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// Delete Note
export const deleteNoteById = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            user_id: req.user.id
        });

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
