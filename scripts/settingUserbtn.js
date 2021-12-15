'use strict';
const settingbtn = document.querySelector('#setting-btn');
settingbtn.onclick = () => {
    current = users;
    settingFun();
    modalSetting.style.display = 'block';
};