import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./src/db/database.js";
import homeRoutes from "./src/routes/home.routes.js";
import postRoutes from "./src/routes/post.routes.js";
import User from "./src/models/User.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "src", "public")));

app.use("/", homeRoutes);
app.use("/posts", postRoutes);

connectDB().then(async () => {
    const count = await User.countDocuments();
    if (count === 0) {
        await User.create({
            name: "Rony",
            lastName: "Bellido",
            email: "rony.bellido@tecsup.edu.pe",
            age: 20,
            phoneNumber: "987654321",
            password: "password123"
        });
        console.log("Usuario por defecto creado para pruebas.");
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
