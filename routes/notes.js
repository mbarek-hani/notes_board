import { Router } from "express";
import {
  addNote,
  updateNoteById,
  deleteNoteById,
  getAllNotesOfUser,
} from "../controllers/notesController.js";

import { createNoteValidator, updateNoteValidator } from "../models/Note.js";
import {
  authenticateToken,
  validatorMiddleware,
} from "../middlewares/index.js";

const notesRouter = Router();

// notesRouter.use(authenticateToken); // protect all routes
notesRouter.get("/", getAllNotesOfUser);
notesRouter.post("/", createNoteValidator, validatorMiddleware, addNote);
notesRouter.put(
  "/:id",
  updateNoteValidator,
  validatorMiddleware,
  updateNoteById,
);
notesRouter.delete("/:id", deleteNoteById);

export default notesRouter;
