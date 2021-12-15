'use strict';
//get the html
const deletebtn = document.getElementById('delete-btn');
const deleteFun = () => {
    //when button click
    deletebtn.addEventListener('click', async () => {
        const fetchOptions = {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        // send delete method
        // get a json response and then redirect to login-page
        try {
            const response = await fetch(
            url + '/user/' + current.user_id,
            fetchOptions,
            );
            const json = await response.json();
            console.log('delete response', json);
            location.href = locationpl;
        } catch (e) {
            console.log(e.message);
        }
    });
};