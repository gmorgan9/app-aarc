// Function to retrieve a specific cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Check if an access token cookie exists and fetch user details on page load
const current_token = getCookie('access_token');
if (!current_token) {
    window.location.href = 'https://app-aarc.morganserver.com/';
}