// js/api/postsApi.js
import { showLoader, showError } from '../components.js';

export async function fetchPosts() {
    const contentDiv = document.getElementById('posts-content');
    showLoader(contentDiv);

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        if (!response.ok) throw new Error('Failed to fetch posts');
        
        const data = await response.json();
        
        if (data.length === 0) {
            contentDiv.innerHTML = '<p class="text-muted">No posts found.</p>';
            return;
        }

        const postsHtml = data.map(post => `
            <div class="post-item fade-in">
                <div class="post-title">${post.id}. ${post.title}</div>
                <div class="post-body">${post.body}</div>
            </div>
        `).join('');

        contentDiv.innerHTML = postsHtml;

    } catch (error) {
        showError(contentDiv, error.message);
    }
}
