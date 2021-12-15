'use strict';
const url = 'https://localhost:8000'; // change url when uploading to server

(async () => {
    try {
        const response = await fetch(url + '/auth/logout');
        const json = await response.json();
        console.log(json);
        // remove token
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        alert('You have logged out');
        location.href = 'loginPage.html';
    } catch (e) {
        console.log(e.message);
    }
})();
