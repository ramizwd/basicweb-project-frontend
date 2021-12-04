'use strict';
console.log('login page');

const url = 'http://localhost:3000';
const login = document.querySelector('#login');

// Trigger for button to use POST method
login.addEventListener('submit', async (evt) => {
 evt.preventDefault();
 const data = serializeJson(login);
 const fetchOptions = {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
 };
// Getting token
 const response = await fetch(url + '/auth/login', fetchOptions);
 const json = await response.json();
 console.log('login response', json);
 if (!json.user) {
  alert(json.message);
 } else {
// Saving token and redirect to frontPage
  sessionStorage.setItem('token', json.token);
  sessionStorage.setItem('user', JSON.stringify(json.user));
  location.href = 'frontPage.html';
 }
});
