class PostModel {
    constructor() {
        this.baseURL = 'http://localhost:3000';
        this.isCreating = false;
    }

    async getAllPosts() {
        try {
            const response = await fetch(`${this.baseURL}/posts`);
            const data = await response.json();
            return data.posts || [];
        } catch (error) {
            console.error('Error fetching posts:', error);
            return [];
        }
    }

    async createPost(title, description) {
        if (this.isCreating) {
            console.log('Already creating a post, skipping...');
            return { success: false, message: 'Already creating a post' };
        }

        try {
            this.isCreating = true;
            console.log('Creating post:', { title, description });
            
            const response = await fetch(`${this.baseURL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description })
            });
            const data = await response.json();
            console.log('Post creation response:', data);
            return data;
        } catch (error) {
            console.error('Error creating post:', error);
            return { success: false, message: 'Failed to create post' };
        } finally {
            this.isCreating = false;
        }
    }

    async getPostById(id) {
        try {
            const response = await fetch(`${this.baseURL}/post/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching post:', error);
            return null;
        }
    }

    async updatePost(id, title, description) {
        try {
            const response = await fetch(`${this.baseURL}/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating post:', error);
            return { success: false };
        }
    }

    async deletePost(id) {
        try {
            const response = await fetch(`${this.baseURL}/posts/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error deleting post:', error);
            return { success: false };
        }
    }
}

// Make PostModel available globally
window.PostModel = PostModel;
