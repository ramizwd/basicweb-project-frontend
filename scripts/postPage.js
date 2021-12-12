'use strict';

const url = 'https://10.114.32.27/app';
const main = document.querySelector('.container');
// get user and post data for admin check
//const user = JSON.parse(sessionStorage.getItem('user'));
//const post = JSON.parse(sessionStorage.getItem('post'));

const createPost = (posts) => {

    //Creating html elements for post
    const postContainer = document.createElement('div');
    postContainer.setAttribute('id', 'postContainer');
    postContainer.setAttribute('class', 'item');
    postContainer.innerHTML = '';

    //Users avatar
    const userAvatar = document.createElement('img');
    userAvatar.setAttribute('id', 'avatar');
    //getting the default profile pic if not yet set
    userAvatar.src =
    'placeholder/male-default-placeholder-avatar-profile-260nw-582509551.jpg';
    userAvatar.width = '45';
    userAvatar.height = '45';
    // Username of poster
    const userNickname = document.createElement('h2');
    userNickname.innerHTML = `${posts.postername}`;

    //Title
    const postTitle = document.createElement('h1');
    postTitle.innerHTML = `${posts.title}`;

    //Description of the build
    const postText = document.createElement('p');
    postText.setAttribute('id', 'description');
    postText.innerHTML = `${posts.description}`;

    // Text with a specific list of build equipment
    const postBuild = document.createElement('p');
    postText.setAttribute('id', 'builtList');

    const builtListTitle = document.createElement('h3');
    builtListTitle.innerHTML = 'PC hardware list';

    // Header with avatar and nickname
    const postHeader = document.createElement('div');
    postHeader.setAttribute('id', 'postHeader');

    // Upvote button
    const upVote = document.createElement('button');
    upVote.innerHTML = 'Upvote';
    // Downvote button
    const downVote = document.createElement('button');
    downVote.innerHTML = 'Downvote';
    // Total votes button
    const votes = document.createElement('p');
    votes.innerHTML = `${posts.votes}`;
    const votesContainer = document.createElement('div');
    votesContainer.setAttribute('id', 'votesContainer');

    const imgCont = document.createElement('figure');


// Placing the hierarchy in the post container part
    main.appendChild(postContainer);
    postContainer.appendChild(postHeader);
    postHeader.appendChild(userAvatar);
    postHeader.appendChild(userNickname);

    //if not null do the layout like this
    if (posts.filename != null) {
        let postImg;
        //if image on se pistää create element
        if (
        posts.file_type === 'image/png' ||
        posts.file_type === 'image/jpg' ||
        posts.file_type === 'image/webp' ||
        posts.file_type === 'image/jpeg'
        ) {
            //create img elements
            postImg = document.createElement('img');
            postImg.setAttribute('id', 'postImg');
            //source where to get it
            postImg.src = url + '/thumbnails/' + posts.filename; // will be changes to filename
            postImg.style.width = '100%';
            //if no img alternative
            postImg.alt = '404 image not found';
            //append postIMG
            imgCont.appendChild(postImg);
        } else if (posts.file_type === 'video/mp4') {
            //create video element
            postImg = document.createElement('video');
            //set so can control
            postImg.controls = true;
            //source where to get video
            postImg.src = url + '/' + posts.filename;
            //postImg.src = url + '/thumbnails/' + post.filename+'/'+post.filename+'-thumbnail-200x200-0010.png';  // will be changes to filename
            postImg.style.width = '100%';
            //if no img alternative
            postImg.alt = '404 image not found';
            //append postIMG
            imgCont.appendChild(postImg);
        }
    }

    postContainer.appendChild(imgCont);

    postContainer.appendChild(postTitle);
    postContainer.appendChild(postText);
    postContainer.appendChild(votesContainer);
    votesContainer.appendChild(upVote);
    votesContainer.appendChild(downVote);
    votesContainer.appendChild(votes);
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
comment.setAttribute('id', 'comment');
const commentNickname = document.createElement('h5');
commentNickname.innerHTML = 'Username';     // Will be added after backend
const commentText = document.createElement('p');
commentText.innerHTML = 'Great build! Love it even it´s weird..'     // Will be added after backend
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
        console.log(sessionStorage.getItem('id'));
        // Getting post id from session storage and placing it into route
        const res = await fetch(url + '/post/' + sessionStorage.getItem('id'),
        fetchOptions);
        const posts = await res.json();
        createPost(posts);
    } catch (e) {
        console.log(e.message);
    }
};
getPost();