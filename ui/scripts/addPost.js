'use strict';

const urlPost = 'http://localhost:3000';

// Get html elements
const modal = document.querySelector('#modal');
const postBtn = document.querySelector('#add-post-btn');
const span = document.getElementsByClassName('close-modal')[0];

// display modal when the add new post button clicked
postBtn.onclick = () => {
 modal.style.display = 'block';
};
// Hide modal when the span is clicked
span.onclick = () => {
 modal.style.display = 'none';
};
// Hide modal when the user click outside of it
window.onclick = (evt) => {
 if (evt.target == modal) {
  modal.style.display = 'none';
 }
};

// Get html elements
const addPost = document.querySelector('#addPost');

// Add new post
addPost.addEventListener('submit', async (evt) => {
 evt.preventDefault(); // stop default action if event is not handled
 const postBody = new FormData(addPost); // format the values for post method content
 const fetchOptions = {
  method: 'POST',
  headers: {
   Authorization: 'Bearer ' + sessionStorage.getItem('token'),
  },
  body: postBody,
 };
 // send post method and the values to the post route.
 // get a json response and display it as successfully added post message as an alert
 const res = await fetch(url + '/post', fetchOptions);
 const json = await res.json();
 alert(json.message);
 location.href = 'frontPage.html';
});

// BUG - snackbar shows when post is not added
// Snackbar
// const snack = document.querySelector('#snackbar');
// const submitBtn = document.querySelector('#submit-post-btn');

// submitBtn.onclick = () => {
//     console.log('snack');
//     snack.className = 'show';
//     setTimeout(function () {
//         snack.className.replace('show', '');
//     }, 10000);
// };
