'use strict';

//get the html
const high = document.getElementById('highest');
const low = document.getElementById('lowest');
const newest = document.getElementById('new');
const oldest = document.getElementById('old');

//send the highest filter
high.onclick = () => {
    getfilter('votes DESC');
};
//send the lowest filter
low.onclick = () => {
    getfilter('votes ASC');
};
//send the oldest
newest.onclick = () => {
    getfilter('`pjr_post`.`date` DESC');
};
//send the newest
oldest.onclick = () => {
    getfilter('`pjr_post`.`date`  ASC');
};
//get the filter
const getfilter = async (filter) => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        if (sessionStorage.getItem('token') ||
        sessionStorage.getItem('user')) {
            const res = await fetch(url + '/filter/' + filter, fetchOptions);
            const posts = await res.json();
            createPosts(posts);
        }
    } catch (e) {
        console.log(e.message);
    }
};

