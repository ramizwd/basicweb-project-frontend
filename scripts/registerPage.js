'use strict';
console.log('register page');

const url = 'https://10.114.32.27/app';
const registration = document.querySelector('#register');

// registration
registration.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(registration);
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    const response = await fetch(url + '/auth/register', fetchOptions);
    const json = await response.json();
    alert(json.message);
});
