import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.js";
import notesRouter from "./routes/notes.js";
import usersRouter from "./routes/dashboard.js";

//db connection
import "./config/db.js";

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);

app.use("/api/notes", notesRouter);

app.use("/api/dashboard", usersRouter);

//running server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
