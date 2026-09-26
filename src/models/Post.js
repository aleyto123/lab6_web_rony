import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { 
        type: String, 
        minlength: [5, "Mínimo 5 caracteres"], 
        maxlength: [30, "Máximo 30 caracteres"], 
        required: true 
    },
    content: { type: String, minlength: [10, "Mínimo 10 caracteres"], required: true },
    hashtags: [{ type: String }],
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

export default mongoose.model("Post", postSchema);
