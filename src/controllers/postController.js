import postService from "../services/postService.js";
import userRepository from "../repositories/userRepository.js";

class PostController {
    async getAll(req, res) {
        try {
            const posts = await postService.getPosts();
            res.render("posts", { posts });
        } catch (error) {
            res.status(500).send(error.message);
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

    async create(req, res) {
        try {
            const { title, content, hashtags, imageUrl, userId } = req.body;
            const hashtagsArray = hashtags ? hashtags.split(",").map(h => h.trim()) : [];
            await postService.createPost(userId, {
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

    async showEditForm(req, res) {
        try {
            const post = await postService.getPostById(req.params.id);
            res.render("edit-post", { post });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async update(req, res) {
        try {
            const { title, content, hashtags, imageUrl } = req.body;
            const hashtagsArray = hashtags ? hashtags.split(",").map(h => h.trim()) : [];
            await postService.updatePost(req.params.id, {
                title,
                content,
                hashtags: hashtagsArray,
                imageUrl
            });
            res.redirect("/posts");
        } catch (error) {
            res.status(400).send(`Error al actualizar post: ${error.message}`);
        }
    }

    async delete(req, res) {
        try {
            await postService.deletePost(req.params.id);
            res.redirect("/posts");
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
export default new PostController();
