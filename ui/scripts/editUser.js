'use strict';

// Get html elements
const modal = document.querySelector('#modal');
const editBtn = document.querySelector('#add-edit-btn');
const span = document.getElementsByClassName('close-modal')[0];

// display modal when the add new post button clicked
editBtn.onclick = () => {
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
const editUser = document.querySelector('#editUser');

// Edit user info
editUser.addEventListener('submit', async (evt) => {
    evt.preventDefault(); // stop default action if event is not handled
    const data = serializeJson(editUser);
    data.id = user.user_id;
    console.log('user id', user.user_id);

    console.log(data);
    // remove empty properties
    for (const [prop, value] of Object.entries(data)) {
        if (value === '') {
            delete data[prop];
        }
    }
    const fetchOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    };
    // send put method and the values to the put route.
    // get a json response and display it as successfully added post message as an alert

    // get user data for admin check
    //const user = JSON.parse(sessionStorage.getItem('user'));
    const response = await fetch(url + '/user', fetchOptions);
    const json = await response.json();
    if (json.error) {
        alert(json.error.message);
    } else {
        alert(json.message);
    }
    location.href = 'profilePage.html';
});
