'use strict';

// Get html elements
const modal = document.querySelector('#modal');
const settingBtn = document.querySelector('#setting-btn');
const editBtn = document.querySelector('#add-edit-btn');
const span = document.getElementsByClassName('close-modal')[0];

// display modal when the add new post button clicked
settingBtn.onclick = () => {

    modal.style.display = 'block';
};
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