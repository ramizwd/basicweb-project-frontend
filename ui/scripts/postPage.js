'use strict';

const url = 'http://localhost:3000';
const main = document.querySelector('main');
// get user and post data for admin check
//const user = JSON.parse(sessionStorage.getItem('user'));
//const post = JSON.parse(sessionStorage.getItem('post'));

/*
const getPost = async (id) => {
    const response = await fetch(url + '/post/' + id);
    const post = await response.json();
    console.log('post', post)
    return post;
};
*/

const createPost = (posts) => {

        //Creating html elements for post
        const postContainer = document.createElement('div');
        postContainer.setAttribute('id', 'postContainer');
        postContainer.setAttribute('class', 'item');
        postContainer.innerHTML = '';

        const userAvatar = document.createElement('img');
        userAvatar.setAttribute('id', 'avatar');
        const userNickname = document.createElement('h2');

        if (posts.filename === null) {
            const postImg = document.createElement('img');
            postImg.src = url + '/thumbnails/' + posts.filename; // will be changes to filename
            postImg.alt = '404 image not found';
            postImg.setAttribute('id', 'postImg');
        }

        const postTitle = document.createElement('h1');
        postTitle.innerHTML = `${posts.title}`;

        const postText = document.createElement('p');
        postText.setAttribute('id', 'description');
        postText.innerHTML = `${posts.description}`;

        const postBuild = document.createElement('p');
        postText.setAttribute('id', 'builtList');

        const builtListTitle = document.createElement('h3');
        builtListTitle.innerHTML = 'PC hardware list';

// Placing the hierarchy in the post container part
        main.appendChild(postContainer);
        postContainer.appendChild(userAvatar);
        postContainer.appendChild(userNickname);

        postContainer.appendChild(postTitle);
        postContainer.appendChild(postText);
        postContainer.appendChild(postBuild);
        postContainer.appendChild(builtListTitle);

};

//Creating html elements for comments
const commentContainer = document.createElement('div');
commentContainer.setAttribute('id', 'commentContainer');
commentContainer.setAttribute('class', 'item');
const containerTitle = document.createElement('h3');
commentContainer.innerHTML = 'Write a comment';

// Form for comment input
const form = document.createElement('form');
const commentField = document.createElement('input');
commentField.setAttribute('type', 'text');
commentField.setAttribute('name', 'comment');
commentField.setAttribute('placeholder', 'Comment..');
const btnPost = document.createElement('button');
btnPost.setAttribute('type', 'submit');
btnPost.setAttribute('id', 'btnPost');
btnPost.innerHTML = 'Post';
//Comments
const commentList = document.createElement('ul');
const comment = document.createElement('li');
const commentNickname = document.createElement('h5');
const commentText = document.createElement('p');
commentText.setAttribute('id', 'commentText');

// Placing the hierarchy in the post comment part
main.appendChild(commentContainer);
commentContainer.appendChild(containerTitle);
commentContainer.appendChild(form);
commentContainer.appendChild(commentField);
commentContainer.appendChild(btnPost);
commentContainer.appendChild(commentList);
commentList.appendChild(comment);
comment.appendChild(commentNickname);
comment.appendChild(commentText);

// Function to fetch data for post
const getPost = async () => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        console.log(sessionStorage.getItem("id"));
        // Getting post id from session storage and placing it into route
        const res = await fetch(url + '/post/' +sessionStorage.getItem("id") , fetchOptions);
        const posts = await res.json();
        createPost(posts);
    } catch (e) {
        console.log(e.message);
    }
};
getPost();