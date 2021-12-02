'use strict';
console.log('profile page');
const url = 'http://localhost:3000';

// Function to fetch data for users
const getUserInfo = async (id) => {
  const response = await fetch(url + '/user/' + id);
  const user = await response.json();
  createBio(user);
};
getUserInfo();

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

const bio = document.querySelector('.bio');
const postList = document.querySelector('.postList');

const createBio = (users) => {
  bio.innerHTML = '';

  const userNickname = document.createElement('h1');
  userNickname.innerHTML = `${users.username}`;
  /*
    const userAvatar = document.createElement('img');
    userAvatar.src = url + '/' + `${users.filename}`;  // will be changed to filename
    userAvatar.alt = url + '/' + `${users.username}`;      // or user_id?

    const userNickname = document.createElement('h1');
    userNickname.innerHTML = `${users.username}`;
    const userDescription = document.createElement('p');
    userDescription.innerHTML = `${users.description}`;
    const editButton = document.createElement('button');
    editButton.addEventListener('click')

    bio.appendChild(userAvatar);
    bio.appendChild(userDescription);
    bio.appendChild(editButton);
    */
    bio.appendChild(userNickname);

};

// Function for creating post containers
const createPosts = (posts) => {
  // clear ul
  postList.innerHTML = '';
  // Creating HTML elements
  posts.forEach((post) => {
    const userPost = document.createElement('li');

    const buildText = document.createElement('p');
    buildText.innerHTML = `${post.description}`;

    //if not null do the layout like this
    if (post.filename != null) {
      const postImg = document.createElement('img');
      postImg.src = url + '/' + post.filename;  // will be changes to filename
      postImg.alt = '404 image not found';
      userPost.appendChild(postImg);
    }
    const userImg = document.createElement('img');
    const postNickname = document.createElement('h5');

    const postTitle = document.createElement('h3');
    postTitle.innerHTML = `${post.title}`;
    // Poster nickname
    const poster = document.createElement('h2');
    poster.innerHTML = `Poster: ${post.postername}`;
    // Poster profile picture
    const posterPfp = document.createElement('img');
    posterPfp.src = url + '/' + post.profile_picture;
    console.log(post.profile_picture);

    // Placing the hierarchy in the post object
    postList.appendChild(userPost);
    userPost.appendChild(posterPfp);
    userPost.appendChild(poster);
    userPost.appendChild(userImg);
    userPost.appendChild(postTitle);
    userPost.appendChild(buildText);
  });
};


