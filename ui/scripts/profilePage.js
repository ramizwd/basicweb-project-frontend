'use strict';
console.log('profile page');
const url = 'http://localhost:3000';
// get user data for admin check
const user = JSON.parse(sessionStorage.getItem('user'));

// Function to fetch data for users
const getUserInfo = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const res = await fetch(url + '/user/' + user.user_id, fetchOptions);
    const users = await res.json();
    console.log('user', users)
    createBio(users);
  } catch (e) {
    console.log(e.message);
  }
};
getUserInfo();
/*
const getUserInfo = async (id) => {
  const response = await fetch(url + '/user/' + '1');
  const users = await response.json();
  console.log('user', user);
  createBio(user[0]);
};
getUserInfo();
 */

// Function to fetch data for posts
const getPostInfo = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const res = await fetch(url + '/post', fetchOptions);
    const posts = await res.json();
    createPosts(posts);
  } catch (e) {
    console.log(e.message);
  }
};

getPostInfo();

/*
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
*/

// Selection of existing html elements
const bio = document.querySelector('.bio');
const postList = document.querySelector('.postList');

// Function for creating users bio  in header
const createBio = (users) => {
  bio.innerHTML = '';

  const userNickname = document.createElement('h1');
  userNickname.innerHTML = `${users.username}`;

  const userAvatar = document.createElement('img');
  userAvatar.src = url + '/' + `${users.profile_picture}`;  // will be changed to filename
  userAvatar.alt = url + '/' + `${users.username}`;         // or user_id?

  const userDescription = document.createElement('p');
  userDescription.innerHTML = `${users.description}`;

  const editButton = document.createElement('button');
  //editButton.addEventListener('click')

// Placing the hierarchy in the bio header
  bio.appendChild(userAvatar);
  bio.appendChild(userNickname);
  bio.appendChild(userDescription);
  bio.appendChild(editButton);

// Setting attributes for repeating elements
  userAvatar.setAttribute('id', 'avatar');
  editButton.setAttribute('id', 'buttonEdit');
  userDescription.setAttribute('id', 'textBio');
};

// Function for creating post containers
const createPosts = (posts) => {
  // Clear ul
  postList.innerHTML = '';
  // Creating HTML elements
      posts.forEach((post) => {
      const userPost = document.createElement('li');
      postList.appendChild(userPost);

      // Poster profile picture
      const posterPfp = document.createElement('img');
      posterPfp.src = url + '/' + post.profile_picture;
      console.log(post.profile_picture);

      // Poster nickname
      const poster = document.createElement('h5');
      poster.innerHTML = `Poster: ${post.postername}`;

      const postsHeader = document.createElement('div');
      userPost.appendChild(postsHeader)
      postsHeader.appendChild(posterPfp);
      postsHeader.appendChild(poster);

      //Posts image (if not null do the layout like this)
      if (post.filename != null) {
        const postImg = document.createElement('img');
        postImg.src = url + '/' + post.filename;  // will be changes to filename
        postImg.alt = '404 image not found';
        userPost.appendChild(postImg);
        postImg.setAttribute('id', 'postImage');
      }
      // Title
      const postTitle = document.createElement('h3');
      postTitle.innerHTML = `${post.title}`;
      userPost.appendChild(postTitle);

      // Build
      const buildText = document.createElement('p');
      buildText.innerHTML = `${post.description}`;
      userPost.appendChild(buildText);


      // Placing the hierarchy in the post object

      // Setting attributes for repeating elements
      posterPfp.setAttribute('id', 'posterAvatar');
      buildText.setAttribute('id', 'postText');
      postsHeader.setAttribute('id', 'postsHeader');
    });

};


