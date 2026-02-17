import { Router } from "express";
import { getAllUsers } from "../controllers/usersController.js";
import { authenticateToken, authorizeRole } from "../middlewares/index.js";
import {
	getNotesCreatedLast7Days,
	getStats,
} from "../controllers/notesController.js";

const dashboardRouter = Router();

// usersRouter.use(authenticateToken); // protect all routes
// usersRouter.use(authorizeRole('admin'));

dashboardRouter.get("/users/", getAllUsers);

dashboardRouter.get("/notes/last-seven-days", getNotesCreatedLast7Days);
dashboardRouter.get("/notes/stats", getStats);

export default dashboardRouter;
