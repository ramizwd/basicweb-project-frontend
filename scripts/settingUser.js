'use strict';

// Get html elements
const modalSetting = document.querySelector('#modalSetting');
const setting = document.querySelector('#setting');
const spanSetting = document.getElementsByClassName('close-modal-setting')[0];
let current;
let locationpl;
// display modal when the add new post button clicked
setting.onclick = () => {
    //set the current log in info
    current = usersLog;
    //where it will relocate after delete
    locationpl = 'loginPage.html';

    settingFun();
    deleteFun();
    modalSetting.style.display = 'block';
};

// Hide modal when the span is clicked
spanSetting.onclick = () => {
    modalSetting.style.display = 'none';
};
const settingFun = () => {
//if the role is 1 it removes the role form
    console.log(current);
    if (current.role === 0 || usersLog.role === 1) {
        if (!!document.getElementById('settingUser').
        getElementsByClassName('form-input')[3]) {
            document.getElementById('settingUser').
            getElementsByClassName('form-input')[3].remove();
        }

    } else {
        //if the form is not existed remove make a new one
        if (!!document.getElementById('settingUser').
        getElementsByClassName('form-input')[3] === false) {
            const role = document.getElementById('role');
            const roleBar = document.createElement('input');
            roleBar.className = 'form-input';
            roleBar.type = 'number';
            roleBar.min = '0';
            roleBar.max = '1';
            roleBar.required = true;
            role.append(roleBar);

        }
        //set the value
        document.getElementById('settingUser').
        getElementsByClassName('form-input')[3].value = current.role;
    }
    //set the value
    document.getElementById('settingUser').
    getElementsByClassName('form-input')[0].value = current.username;
    document.getElementById('settingUser').
    getElementsByClassName('form-input')[1].value = current.email;

// Get html elements
    const setting = document.querySelector('#settingUser');

    setting.addEventListener('submit', async (evt) => {
        evt.preventDefault(); // stop default action if event is not handled
        //make setting serializeJson
        const data = serializeJson(setting);
        console.log(current);
        //send the id
        data.id = current.user_id;
        //if the current role is 0 set the current role
        if (current.role === 0) {
            data.role = current.role;
        }

        console.log('user id', current.user_id);
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
        location.href = window.location.href;
    });
};