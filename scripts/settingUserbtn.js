'use strict';
//get the
const settingbtn = document.querySelector('#setting-btn');
settingbtn.onclick = () => {
    //set the checked profile info
    current = users;

    //set the redirection
    if (user.role === 0) {
        if (user.user_id === users.user_id) {
            locationpl = 'logout.html';
        } else {
            locationpl = 'frontPage.html';
        }
    } else {
        locationpl = 'logout.html';
    }

    //for setting function
    settingFun();
    deleteFun();
    modalSetting.style.display = 'block';
};
