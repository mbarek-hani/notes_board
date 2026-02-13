import express from "express";

//Routes
import NotesRoutes from './routes/notesRoutes.js'

//db connection
import "./config/db.js";

const app = express();
app.use(express.json())

app.get("/api", (req, res) => {
  res.status(200).json({ data: "home page" });
});

app.use('/api/notes', NotesRoutes)

//running server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
