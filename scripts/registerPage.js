'use strict';

const url = 'https://10.114.32.27/app';
const registration = document.querySelector('#register');

// registration
// Trigger for button to use POST method
registration.addEventListener('submit', async (evt) => {
    //get the value what inputed
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('passwordAgain').value;
    //check if password matches if not alert comes says password not match
    if (password === password2) {
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
        await response.json();
        location.href = 'loginPage.html';
    } else {
        evt.preventDefault();
        alert('Password does not match');
    }
});
