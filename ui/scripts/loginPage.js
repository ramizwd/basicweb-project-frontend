'use strict';
console.log('login page');

const url = 'http://10.114.32.27/';
const login = document.querySelector('#login');

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
  const response = await fetch(url + '/auth/login', fetchOptions);
  const json = await response.json();
  console.log('login response', json);
  if (!json.user) {
    alert(json.message);
  } else {
    // token
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('user', JSON.stringify(json.user));
    location.href = 'frontPage.html';
  }
});