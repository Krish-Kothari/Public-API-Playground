// js/api/postsApi.js
import { showLoader, showError } from '../components.js';

export async function fetchPosts() {
    const contentDiv = document.getElementById('posts-content');
    showLoader(contentDiv);

    try {
        const response = await fetch('https://dummyjson.com/posts?limit=5&skip=0');
        if (!response.ok) throw new Error('Failed to fetch posts');
        
        const data = await response.json();
        const posts = data.posts || [];
        
        if (posts.length === 0) {
            contentDiv.innerHTML = '<p class="text-muted">No posts found.</p>';
            return;
        }

        const postsHtml = posts.map(post => {
            const reactionCount = typeof post.reactions === 'number'
                ? post.reactions
                : (post.reactions?.likes ?? 0) + (post.reactions?.dislikes ?? 0);

            return `
            <div class="post-item fade-in">
                <div class="post-title">${post.id}. ${post.title}</div>
                <div class="post-body">${post.body}</div>
                <div class="post-body mt-2">👍 Reactions: ${reactionCount}</div>
            </div>
        `;
        }).join('');

        contentDiv.innerHTML = postsHtml;

    } catch (error) {
        showError(contentDiv, error.message);
    }
}
