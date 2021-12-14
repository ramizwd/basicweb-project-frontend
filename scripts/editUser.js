'use strict';

// Get html elements
const modalEdit = document.querySelector('#modalEdit');
const editBtn = document.querySelector('#add-edit-btn');
const spanEdit = document.getElementsByClassName('close-modal-edit')[0];

// display modal when the add new post button clicked
editBtn.onclick = () => {
    document.getElementById("editUser").getElementsByClassName("form-input")[0].value=users.username;
    document.getElementById("editUser").getElementsByClassName("form-input")[1].value=users.description;

    modalEdit.style.display = 'block';
};
// Hide modal when the span is clicked
spanEdit.onclick = () => {
    modalEdit.style.display = 'none';
};

// Get html elements
const editUser = document.querySelector('#editUser');

// Edit user info
editUser.addEventListener('submit', async (evt) => {
    evt.preventDefault(); // stop default action if event is not handled
    const data = new FormData(editUser);
    data.append('id', users.user_id);
    console.log(data.entries());

    console.log(data);
    const fetchOptions = {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: data, // body data type must match "Content-Type" header
    };
    // send put method and the values to the put route.
    // get a json response and display it as successfully added post message as an alert

    // get user data for admin check
    //const user = JSON.parse(sessionStorage.getItem('user'));
    const response = await fetch(
        url + '/user/profile/' + users.user_id,
        fetchOptions
    );
    const json = await response.json();
    if (json.error) {
        alert(json.error.message);
    } else {
        alert(json.message);

    }
    location.href = 'profilePage.html';
});
