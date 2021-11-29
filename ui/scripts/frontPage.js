'use strict';
console.log('front page');
const url = 'http://localhost:3000';

// Function to fetch data for users
const getUserInfo = async (id) => {
  const response = await fetch(url + '/user/' + id);
  const user = await response.json();
  return user;
};

// Function to fetch data for posts
const getPostInfo = async () => {
  try {
    const response = await fetch(url + '/post');
    const post = await response.json();
    createPosts(post);
  } catch (e) {
    console.log(e.message);
  }
};
getPostInfo();

const feed = document.querySelector('#postFeed');
const nickname = document.querySelector('#nickname');
// if statement to check if logged in to replace nickname for button "login"
//nickname.innerHTML = getUserInfo().user.name;
const profileImg = document.querySelector('.profileImg');
//profileImg.innerHTML = getUserInfo().user.image;                                // image not implemented yet

// Function for creating post containers
const createPosts = (posts) => {
  // clear ul
  feed.innerHTML = '';
  // Creating HTML elements
  posts.forEach((post) => {
    const userPost = document.createElement('li');
    const postImg = document.createElement('img');
    postImg.src = url + '/' + post.picture;  // will be changes to filename
    postImg.alt = post.title;

    //const userImg = document.createElement('img');
    //const postNickname = document.createElement('h5');
    const postTitle = document.createElement('h3');
    postTitle.innerHTML = `${post.title}`;
    //const buildList = document.createElement('ul');
    //const buildPart = document.createElement('li');
    const buildText = document.createElement('p');
    buildText.innerHTML = `${post.text}`;
    const vote = document.createElement('h7');
    vote.innerHTML = `${post.vote}`;

// Added attributes for easier use in CSS
  // buildList.setAttribute('class', 'buildList');
  // buildPart.setAttribute('class', 'buildPart');

// Placing the hierarchy in the post object
    feed.appendChild(userPost);
    //userPost.appendChild(userImg);
    //userPost.appendChild(postNickname);
    userPost.appendChild(postImg);
    userPost.appendChild(postTitle);
    //userPost.appendChild(buildList);
    //buildList.appendChild(buildPart);
    userPost.appendChild(buildText);

  });
};