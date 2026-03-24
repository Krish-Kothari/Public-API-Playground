// js/components.js

export function showLoader(element) {
    element.innerHTML = '<div class="loader"></div>';
}

export function showError(element, message) {
    element.innerHTML = `<div class="error-message">❌ ${message}</div>`;
}

export function createCopyButton(textToCopy) {
    const btn = document.createElement('button');
    btn.className = 'secondary-btn mt-4';
    btn.innerHTML = '📋 Copy Image URL';
    btn.onclick = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            btn.innerHTML = '✅ Copied!';
            setTimeout(() => {
                btn.innerHTML = '📋 Copy Image URL';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };
    return btn;
}
