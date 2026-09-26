import postService from "../services/postService.js";
import userRepository from "../repositories/userRepository.js";

class PostController {
    async create(req, res) {
        try {
            const userId = req.body.userId || req.params.userId;
            const { title, content, hashtags, imageUrl } = req.body;
            const hashtagsArray = hashtags ? hashtags.split(",").map(hashtag => hashtag.trim()).filter(Boolean) : [];
            const post = await postService.createPost(userId, {
                title,
                content,
                hashtags: hashtagsArray,
                imageUrl
            });
            res.redirect("/posts");
        } catch (error) {
            res.status(400).send(`Error al crear post: ${error.message}`);
        }
    }

    async getAll(req, res) {
        try {
            const posts = await postService.getPosts();
            res.render("posts", { posts });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async showCreateForm(req, res) {
        try {
            const users = await userRepository.findAll();
            res.render("create-post", { users });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async showEditForm(req, res) {
        try {
            const post = await postService.getPostById(req.params.id);
            if (!post) return res.status(404).send("Post no encontrado");
            res.render("edit-post", { post });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async update(req, res) {
        try {
            const { title, content, hashtags, imageUrl } = req.body;
            const hashtagsArray = hashtags ? hashtags.split(",").map(h => h.trim()) : [];
            const post = await postService.updatePost(req.params.id, {
                title,
                content,
                hashtags: hashtagsArray,
                imageUrl
            });
            if (!post) return res.status(404).send("Post no encontrado");
            res.redirect("/posts");
        } catch (error) {
            res.status(400).send(`Error al actualizar post: ${error.message}`);
        }
    }

    async delete(req, res) {
        try {
            const post = await postService.deletePost(req.params.id);
            if (!post) return res.status(404).send("Post no encontrado");
            res.redirect("/posts");
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

export default new PostController();
