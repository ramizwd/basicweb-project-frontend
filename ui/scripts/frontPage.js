'use strict';
console.log('front page');
const url = 'http://10.114.32.27';


const getUserInfo = async (id) => {
  const response = await fetch(url + '/user/' + id);
  const user = await response.json();
  return user;
};

const feed = document.querySelector('#postFeed');
const nickname = document.querySelector('#nickname');
// if statement to check if logged in to replace nickname for button "login"
nickname.innerHTML = getUserInfo().user.name;
const profileImg = document.querySelector('.profileImg');
profileImg.innerHTML = getUserInfo().user.image;                                // image not implemented yet


// Here will be function createPosts() with fetching data and for/forEach loop

// Creating HTML elements
const userPost = document.createElement('li');
const userImg = document.createElement('img');
const postNickname = document.createElement('h5');
const postImg = document.createElement('img');
const postTitle = document.createElement('h3');
const buildList = document.createElement('ul');
const buildPart = document.createElement('li');
const buildText = document.createElement('p');

// Added attributes for easier use in CSS
buildList.setAttribute('class', 'buildList');
buildPart.setAttribute('class', 'buildPart');

// Placing the hierarchy in the post object
feed.appendChild(userPost);
userPost.appendChild(userImg);
userPost.appendChild(postNickname);
userPost.appendChild(postImg);
userPost.appendChild(postTitle);
userPost.appendChild(buildList);
buildList.appendChild(buildPart);
userPost.appendChild(buildText);


/*
const createPost = (user_post) => {
  feed.innerHTML = '';
};
*/