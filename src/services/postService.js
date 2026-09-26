import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class PostService {
    async createPost(userId, postData) {
        let user = null;
        const users = await userRepository.findAll();

        if (!users || users.length === 0) {
            user = await userRepository.create({
                name: "Rony",
                lastName: "Bellido",
                email: "rony.bellido@tecsup.edu.pe",
                age: 20,
                phoneNumber: "987654321",
                password: "password123"
            });
        } else if (userId) {
            user = await userRepository.findById(userId);
            if (!user) user = users[0];
        } else {
            user = users[0];
        }

        if (!user) throw new Error("Usuario no encontrado");
        return await postRepository.create({ ...postData, user: user._id });
    }
    async getPosts() { return await postRepository.findAll(); }
    async getPostById(id) { return await postRepository.findById(id); }
    async updatePost(id, postData) { return await postRepository.update(id, postData); }
    async deletePost(id) { return await postRepository.delete(id); }
}
export default new PostService();
