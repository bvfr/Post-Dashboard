
        class BlogPlatformView {
            constructor() {
                this.postModel = new PostModel();
                this.isSubmitting = false;
                this.setupEventListeners();
                this.loadPosts();
            }

            setupEventListeners() {
                document.getElementById('new-post-btn').addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showNewPostForm();
                });

                document.getElementById('add-post-btn').addEventListener('click', (e) => {
                    e.preventDefault();
                    if (!this.isSubmitting) {
                        this.addPost();
                    }
                });

                document.getElementById('cancel-btn').addEventListener('click', (e) => {
                    e.preventDefault();
                    this.hideNewPostForm();
                });
            }

            showNewPostForm() {
                document.getElementById('new-post-form').style.display = 'block';
                document.getElementById('post-title').value = '';
                document.getElementById('post-description').value = '';
            }

            hideNewPostForm() {
                document.getElementById('new-post-form').style.display = 'none';
            }

            async addPost() {
                if (this.isSubmitting) return;
                
                const title = document.getElementById('post-title').value.trim();
                const description = document.getElementById('post-description').value.trim();

                if (title && description) {
                    this.isSubmitting = true;
                    const result = await this.postModel.createPost(title, description);
                    this.isSubmitting = false;
                    
                    if (result.success) {
                        this.hideNewPostForm();
                        await this.loadPosts();
                    } else {
                        alert('Failed to create post: ' + result.message);
                    }
                } else {
                    alert('Please fill in both title and description');
                }
            }

            async loadPosts() {
                const posts = await this.postModel.getAllPosts();
                this.renderPosts(posts);
            }

            renderPosts(posts) {
                const container = document.getElementById('posts-container');
                container.innerHTML = '';

                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.className = 'post-item';
                    postElement.innerHTML = `
                        <h4>${post.title}</h4>
                        <p>${post.description}</p>
                        <small>Post ID: ${post._id}</small>
                        <button class="edit-post-btn" data-id="${post._id}">Edit</button>
                        <button class="delete-post-btn" data-id="${post._id}">Delete</button>
                    `;
                    container.appendChild(postElement);
                });

                this.setupPostActionListeners();
            }

            setupPostActionListeners() {
                const editButtons = document.querySelectorAll('.edit-post-btn');
                const deleteButtons = document.querySelectorAll('.delete-post-btn');

                editButtons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        const postId = e.target.getAttribute('data-id');
                        this.editPost(postId);
                    });
                });

                deleteButtons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        const postId = e.target.getAttribute('data-id');
                        this.deletePost(postId);
                    });
                });
            }

            async editPost(postId) {
                const post = await this.postModel.getPostById(postId);

                if (post) {
                    document.getElementById('post-title').value = post.title;
                    document.getElementById('post-description').value = post.description;
                    document.getElementById('new-post-form').style.display = 'block';

                    document.getElementById('add-post-btn').onclick = async (e) => {
                        e.preventDefault();
                        if (!this.isSubmitting) {
                            this.updatePost(postId);
                        }
                    };
                } else {
                    alert('Post not found');
                }
            }

            async updatePost(postId) {
                if (this.isSubmitting) return;
                
                const title = document.getElementById('post-title').value.trim();
                const description = document.getElementById('post-description').value.trim();

                if (title && description) {
                    this.isSubmitting = true;
                    const result = await this.postModel.updatePost(postId, title, description);
                    this.isSubmitting = false;
                    
                    if (result.success) {
                        this.hideNewPostForm();
                        await this.loadPosts();
                    } else {
                        alert('Failed to update post: ' + result.message);
                    }
                } else {
                    alert('Please fill in both title and description');
                }
            }

            async deletePost(postId) {
                const confirmDelete = confirm('Are you sure you want to delete this post?');
                if (confirmDelete) {
                    const result = await this.postModel.deletePost(postId);
                    
                    if (result.success) {
                        await this.loadPosts();
                    } else {
                        alert('Failed to delete post: ' + result.message);
                    }
                }
            }
        }

        // Initialize only once
        let blogPlatform;
        document.addEventListener('DOMContentLoaded', () => {
            if (!blogPlatform) {
                blogPlatform = new BlogPlatformView();
            }
        });