// js/app.js
import { fetchDog } from './api/dogApi.js';
import { fetchJoke } from './api/jokeApi.js';
import { fetchUser } from './api/userApi.js';
import { fetchPosts } from './api/postsApi.js';

document.addEventListener('DOMContentLoaded', () => {
    // Tab Navigation
    const tabs = document.querySelectorAll('.tab-btn');
    const panes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked
            tab.classList.add('active');
            const target = document.getElementById(tab.dataset.target);
            target.classList.add('active');

            // Auto fetch if empty based on targeted tab
            const tabId = tab.dataset.target;
            
            // We check if the content div only contains the comment or is empty
            const isContentEmpty = (contentId) => {
                const el = document.getElementById(contentId);
                return el.children.length === 0;
            };

            if (tabId === 'dog-tab' && isContentEmpty('dog-content')) {
                fetchDog();
            } else if (tabId === 'joke-tab' && isContentEmpty('joke-content')) {
                fetchJoke();
            } else if (tabId === 'user-tab' && isContentEmpty('user-content')) {
                fetchUser();
            } else if (tabId === 'posts-tab' && isContentEmpty('posts-content')) {
                fetchPosts();
            }
        });
    });

    // Event Listeners for Buttons
    document.getElementById('btn-get-dog').addEventListener('click', fetchDog);
    document.getElementById('btn-get-joke').addEventListener('click', fetchJoke);
    document.getElementById('btn-get-user').addEventListener('click', fetchUser);
    document.getElementById('btn-get-posts').addEventListener('click', fetchPosts);

    // Initial Load - Fetch Dog
    fetchDog();
});
