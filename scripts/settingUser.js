'use strict';

// Get html elements
const modalSetting = document.querySelector('#modalSetting');
const setting = document.querySelector('#setting');
const settingbtn = document.querySelector('#setting-btn');
const spanSetting = document.getElementsByClassName('close-modal-setting')[0];

let pro
// display modal when the add new post button clicked
setting.onclick = () => {
    pro=usersLog
    x()
    modalSetting.style.display = 'block';
};
settingbtn.onclick = () => {
    pro=users
    x()
    modalSetting.style.display = 'block';
};

// Hide modal when the span is clicked
spanSetting.onclick = () => {
    modalSetting.style.display = 'none';
};
const x = () => {
    const role=document.getElementById("#role")

if (pro.role === 1) {
    if(!!document.getElementById('settingUser').
    getElementsByClassName('form-input')[3]){
    document.getElementById('settingUser').
    getElementsByClassName('form-input')[3].remove();}

} else {
    console.log(role.contains())
    document.getElementById('settingUser').
    getElementsByClassName('form-input')[3].value = pro.role;
}
document.getElementById('settingUser').
getElementsByClassName('form-input')[0].value = pro.username;
document.getElementById('settingUser').
getElementsByClassName('form-input')[1].value = pro.email;


// Get html elements
const setting = document.querySelector('#settingUser');

setting.addEventListener('submit', async (evt) => {
    evt.preventDefault(); // stop default action if event is not handled
    const data = serializeJson(setting);
    console.log(pro);
    data.id = pro.user_id;
    console.log('user id', pro.user_id);
    console.log(data);

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
    const response = await fetch(
    url + '/user',
    fetchOptions,
    );
    const json = await response.json();
    if (json.error) {
        alert(json.error.message);
    } else {
        alert(json.message);
    }
    location.href = 'profilePage.html';
});}