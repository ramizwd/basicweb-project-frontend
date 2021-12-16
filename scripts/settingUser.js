'use strict';

// Get html elements
const modalSetting = document.querySelector('#modalSetting');
const setting = document.querySelector('#setting');
const spanSetting = document.getElementsByClassName('close-modal-setting')[0];
let current;

// display modal when the add new post button clicked
setting.onclick = () => {
    current = usersLog;
    settingFun();
    modalSetting.style.display = 'block';
};

// Hide modal when the span is clicked
spanSetting.onclick = () => {
    modalSetting.style.display = 'none';
};
const settingFun = () => {
    if (usersLog.role === 1) {
        if (!!document.getElementById('settingUser').getElementsByClassName('form-input')[3]) {
            document.getElementById('settingUser').getElementsByClassName('form-input')[3].remove();
        }
    } else {
        if (!!document.getElementById('settingUser').getElementsByClassName('form-input')[3] === false) {
            const role = document.getElementById('role');
            const roleBar = document.createElement('input');
            roleBar.className = 'form-input';
            roleBar.type = 'number';
            roleBar.min = '0';
            roleBar.max = '1';
            roleBar.required = true;
            role.append(roleBar);
        }
        document.getElementById('settingUser').getElementsByClassName('form-input')[3].value = current.role;
    }
    document.getElementById('settingUser').getElementsByClassName('form-input')[0].value = current.username;
    document.getElementById('settingUser').getElementsByClassName('form-input')[1].value = current.email;

    // Get html elements
    const setting = document.querySelector('#settingUser');

    setting.addEventListener('submit', async (evt) => {
        evt.preventDefault(); // stop default action if event is not handled
        const data = serializeJson(setting);
        console.log(current);
        data.id = current.user_id;
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
        //const user = JSON.parse(sessionStorage.getItem('user'));
        const response = await fetch(url + '/user', fetchOptions);
        const json = await response.json();
        if (json.error) {
            alert(json.error.message);
        } else {
            alert(json.message);
        }
        location.href = window.location.href;
    });
};
