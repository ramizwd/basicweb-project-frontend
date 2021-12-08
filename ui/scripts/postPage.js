'use strict';

const url = 'http://localhost:3000';
const main = document.querySelector('main');

//Creating html elements for post
const postContainer = document.createElement('div');
postContainer.setAttribute('id', 'postContainer');
const userAvatar = document.createElement('img');
userAvatar.setAttribute('id', 'avatar');
const userNickname = document.createElement('h2');
const postImg = document.createElement('img');
postImg.setAttribute('id', 'postImg');
const postTitle = document.createElement('h1');
const postText = document.createElement('p');
postText.setAttribute('id', 'description');
const postBuild = document.createElement('p');
postText.setAttribute('id', 'builtList');
const builtListTitle = document.createElement('h3');
builtListTitle.innerHTML = 'PC hardware list';

// Placing the hierarchy in the post container part
main.appendChild(postContainer);
postContainer.appendChild(userAvatar);
postContainer.appendChild(userNickname);
postContainer.appendChild(postImg);
postContainer.appendChild(postTitle);
postContainer.appendChild(postText);
postContainer.appendChild(postBuild);
postContainer.appendChild(builtListTitle);



//Creating html elements for comments
const commentContainer = document.createElement('div');
commentContainer.setAttribute('id', 'commentContainer');
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
btnPost.setAttribute('placeholder', 'POST');

//Comments
const commentList = document.createElement('ul');
const comment = document.createElement('li');
const commentNickname = document.createElement('h5');
const commentText = document.createElement('p')
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


