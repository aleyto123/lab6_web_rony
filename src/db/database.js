import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let connectionPromise;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return;

    if (!connectionPromise) {
        connectionPromise = mongoose
            .connect(process.env.MONGO_URI || "mongodb://localhost:27017/socialmedia")
            .then(() => console.log("MongoDB conectado exitosamente"))
            .catch((error) => {
                connectionPromise = undefined;
                throw error;
            });
    }

    await connectionPromise;
};

export default connectDB;
