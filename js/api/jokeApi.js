// js/api/jokeApi.js
import { showLoader, showError } from '../components.js';

export async function fetchJoke() {
    const contentDiv = document.getElementById('joke-content');
    showLoader(contentDiv);

    try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        if (!response.ok) throw new Error('Failed to fetch joke');
        
        const data = await response.json();

        contentDiv.innerHTML = `
            <div class="joke-setup fade-in">🤔 ${data.setup}</div>
            <div class="joke-punchline">😂 ${data.punchline}</div>
        `;

    } catch (error) {
        showError(contentDiv, error.message);
    }
}
