import { Router } from "express";
import {
    getAllNotes,
    getNoteById,
    addNote,
    updateNoteById,
    deleteNoteById
} from "../controllers/notesController.js";

import {
    createNoteValidator,
    updateNoteValidator
} from "../models/Note.js";

//import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

//router.use(verifyToken); // protect all routes

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNoteValidator, addNote);
router.put("/:id", updateNoteValidator, updateNoteById);
router.delete("/:id", deleteNoteById);

export default router;
