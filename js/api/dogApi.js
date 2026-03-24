// js/api/dogApi.js
import { showLoader, showError, createCopyButton } from '../components.js';

export async function fetchDog() {
    const contentDiv = document.getElementById('dog-content');
    showLoader(contentDiv);

    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        if (!response.ok) throw new Error('Failed to fetch dog image');
        
        const data = await response.json();
        const imageUrl = data.message;
        
        // Extract breed from URL (format: https://images.dog.ceo/breeds/hound-afghan/n02089867_3227.jpg)
        const parts = imageUrl.split('/');
        const breedIndex = parts.indexOf('breeds') + 1;
        let breedName = parts[breedIndex] || 'Unknown Breed';
        
        // Format breed name (e.g., hound-afghan -> Afghan Hound)
        breedName = breedName.split('-').reverse().map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');

        contentDiv.innerHTML = `
            <img src="${imageUrl}" alt="A cute ${breedName}" class="dog-image fade-in">
            <div class="breed-badge fade-in">🐾 ${breedName}</div>
        `;

        const copyBtn = createCopyButton(imageUrl);
        contentDiv.appendChild(copyBtn);

    } catch (error) {
        showError(contentDiv, error.message);
    }
}
