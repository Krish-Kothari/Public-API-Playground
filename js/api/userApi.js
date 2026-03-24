// js/api/userApi.js
import { showLoader, showError } from '../components.js';

export async function fetchUser() {
    const contentDiv = document.getElementById('user-content');
    showLoader(contentDiv);

    try {
        const response = await fetch('https://randomuser.me/api/');
        if (!response.ok) throw new Error('Failed to fetch user');
        
        const data = await response.json();
        const user = data.results[0];
        
        const fullName = `${user.name.first} ${user.name.last}`;
        const email = user.email;
        const country = user.location.country;
        const phone = user.phone;
        const age = user.dob.age;
        const photo = user.picture.large;

        contentDiv.innerHTML = `
            <div class="user-profile fade-in">
                <img src="${photo}" alt="${fullName}" class="user-avatar">
                <h3>${fullName}</h3>
                <div class="user-details">
                    <div class="user-detail-row">
                        <i>📧</i> <span>${email}</span>
                    </div>
                    <div class="user-detail-row">
                        <i>🌍</i> <span>${country}</span>
                    </div>
                    <div class="user-detail-row">
                        <i>📱</i> <span>${phone}</span>
                    </div>
                    <div class="user-detail-row">
                        <i>🎂</i> <span>${age} years old</span>
                    </div>
                </div>
            </div>
        `;

    } catch (error) {
        showError(contentDiv, error.message);
    }
}
