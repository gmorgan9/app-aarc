const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const workEmail = document.getElementById('work_email').value.toLowerCase();
    const password = document.getElementById('password').value;
    var errorMessageContainer = document.getElementById("error-message");

    let response;

    try {
        response = await fetch('https://app-aarc-api.morganserver.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ work_email: workEmail, password: password })
        });

        if (response.ok) {
            const data = await response.json();
            setCookie('access_token', data.access_token, 7);
            window.location.href = 'https://app-aarc.morganserver.com/dashboard/';
        } else {
            // Display the error message
            // const errordata = await response.json();
            errorMessageContainer.innerHTML = '<div class="alert alert-danger" role="alert">Authentication failed. Please check your email and password.</div>';
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});


async function getUserDetails() {
    try {
        const accessToken = getCookie('access_token');
        if (!accessToken) {
            console.error('Access token not found');
            return;
        }

        const response = await fetch('https://app-aarc-api.morganserver.com/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.ok) {
            // You can handle user details as needed here, but no need to display them
        } else {
            console.error('Fetching user details failed - login.js');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};SameSite=Strict; Secure`;
}

// Function to delete a cookie
function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// Function to retrieve a specific cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Check if an access token cookie exists and fetch user details on page load
const accessToken = getCookie('access_token');
if (accessToken) {
    // You can add code here to handle the user being logged in if needed
}
