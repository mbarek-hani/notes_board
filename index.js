import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRouter from "./routes/auth.js";
import NotesRoutes from './routes/notesRoutes.js'

//db connection
import "./config/db.js";

const app = express();
app.use(express.json())

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRouter);

app.use('/api/notes', NotesRoutes);

//running server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
