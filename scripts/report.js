'use strict';
const report = document.getElementById('report-btn');

report.onclick = () => {
    //question if the user wants to be redirected
    let answer = confirm('You are being redirected to a mail application for sending a report.');
    //if the answer is yes
    if (answer) {
        document.location = `mailto:Admin@gmail.com?body=User report from user ID ${user.user_id}%0d%0a` +
        'Reported post information:%0d%0a' +
        `User ID: ${users.user_id}%0d%0a` +
        `Username: ${users.username}%0d%0a`;
    }
};