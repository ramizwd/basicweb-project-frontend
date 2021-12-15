'use strict';

const url = 'https://localhost:8000';
const main = document.querySelector('.container');
// get user and post data for admin check
const user = JSON.parse(sessionStorage.getItem('user'));
let usersLog;

const profileImg = document.querySelector('.dropbtn');
const name = document.querySelector('#name');

const userInfo = document.querySelector('.dropdown');
const anonUserInfo = document.querySelector('.dropdown-anon');

if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
    userInfo.style.display = 'none';
    anonUserInfo.style.display = 'block';
} else {
    userInfo.style.display = 'block';
    anonUserInfo.style.display = 'none';
}

// Create comments list
const createComments = (comments) => {
    //Creating html elements for comments
    const commentContainer = document.createElement('div');
    commentContainer.setAttribute('id', 'commentContainer');
    commentContainer.setAttribute('class', 'item');
    const containerTitle = document.createElement('h3');
    commentContainer.innerHTML = 'Write a comment';
    // Form for comment input
    const commentField = document.createElement('input');
    commentField.required = true;
    const form = document.createElement('form');
    commentField.setAttribute('type', 'text');
    commentField.setAttribute('name', 'comment');
    commentField.setAttribute('placeholder', 'Comment..');
    const postEdit = document.createElement('button');
    const editComment = document.createElement('input');

    const btnPost = document.createElement('button');
    btnPost.setAttribute('type', 'submit');
    btnPost.setAttribute('id', 'btnPost');
    btnPost.innerHTML = 'Post';
    main.appendChild(commentContainer);
    commentContainer.appendChild(containerTitle);
    commentContainer.appendChild(form);
    commentContainer.appendChild(commentField);
    commentContainer.appendChild(btnPost);
    // Send a request for commenting

    // Click event listener for posting comments that sends the user id and comment to reqFunction
    // alone with a request method
    btnPost.addEventListener('click', async () => {
        const data = { user_id: user.user_id, comment: commentField.value };
        console.log('data to be send', data);
        if (commentField.value == '') return;
        reqFunction(data, 'POST');
        location.href = 'postPage.html';
    });

    comments.forEach((commentInfo) => {
        //Comments
        const commentList = document.createElement('ul');
        const comment = document.createElement('li');
        comment.setAttribute('id', 'comment');
        const commentNickname = document.createElement('h5');
        const commentText = document.createElement('p');
        commentText.innerHTML = commentInfo.comment;
        commentText.setAttribute('id', 'commentText');
        console.log('create comment', commentInfo);
        const commentDelete = document.createElement('button');
        const editBtn = document.createElement('button');

        // Placing the hierarchy in the post comment part
        commentContainer.appendChild(commentList);
        commentList.appendChild(comment);
        comment.appendChild(commentNickname);
        comment.appendChild(commentText);

        if (sessionStorage.getItem('token') || sessionStorage.getItem('user')) {
            // Show delete button only for comment's author or user with admin role
            if (user.role === 0) {
                commentDelete.innerHTML = 'Delete';
                comment.appendChild(commentDelete);

                editBtn.innerHTML = 'Edit';
                comment.appendChild(editBtn);
            } else if (user.user_id === commentInfo.user_id) {
                commentDelete.innerHTML = 'Delete';
                comment.appendChild(commentDelete);

                editBtn.innerHTML = 'Edit';
                comment.appendChild(editBtn);
            }
        }

        // Edit comment, on click editBtn new input field and button appears for editing the post.
        // then on post edited comment if the field is not empty then send a PUT request
        editBtn.addEventListener('click', async () => {
            // Form for comment input
            editComment.setAttribute('type', 'text');
            editComment.setAttribute('name', 'comment');
            editComment.setAttribute('placeholder', 'Comment..');
            commentContainer.appendChild(editComment);

            postEdit.setAttribute('type', 'submit');
            postEdit.setAttribute('id', 'btnPostEdit');
            postEdit.innerHTML = 'Edit';
            commentContainer.appendChild(postEdit);

            postEdit.addEventListener('click', async () => {
                if (editComment.value == '') return;

                console.log('hello posted');
                const data = {
                    user_id: user.user_id,
                    comments_id: commentInfo.comments_id,
                    comment: editComment.value,
                };
                console.log('data to be send', data);
                reqFunction(data, 'PUT');
                location.href = 'postPage.html';
            });
        });

        // Click event listener for deleting comments that sends the user id and comment id to reqFunction
        // alone with a request method
        commentDelete.addEventListener('click', async () => {
            const data = {
                user_id: user.user_id,
                comments_id: commentInfo.comments_id,
            };
            console.log('data to be send', data);
            reqFunction(data, 'DELETE');
            location.href = 'postPage.html';
        });

        // Get user info
        const getUser = async () => {
            try {
                const fetchOptions = {
                    headers: {
                        Authorization:
                            'Bearer ' + sessionStorage.getItem('token'),
                    },
                };
                if (
                    sessionStorage.getItem('token') ||
                    sessionStorage.getItem('user')
                ) {
                    const res = await fetch(
                        url + '/user/' + commentInfo.user_id,
                        fetchOptions
                    );
                    const users = await res.json();
                    commentNickname.innerHTML = users.username;
                } else {
                    const res = await fetch(
                        url + '/user/anon/' + commentInfo.user_id,
                        fetchOptions
                    );
                    const users = await res.json();
                    commentNickname.innerHTML = users.username;
                }
            } catch (e) {
                console.log(e.message);
            }
        };
        getUser();
    });
};

// async function for deleting or posting comments
const reqFunction = async (data, reqMethod) => {
    const fetchOptions = {
        method: reqMethod,
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    try {
        const res = await fetch(
            url + '/comment/' + sessionStorage.getItem('id'),
            fetchOptions
        );
        const vote = await res.json();
        console.log(vote);
    } catch (e) {
        console.error('error', e.message);
    }
};

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
    if (!posts.userpfp) {
        userAvatar.src =
        'placeholder/male-default-placeholder-avatar-profile-260nw-582509551.jpg';
        userAvatar.width = '45';
        userAvatar.height = '45';
    } else {
        //getting the default profile pic if not yet set
        userAvatar.src = url + '/' + posts.userpfp;
        userAvatar.width = '45';
        userAvatar.height = '45';
    }

    // Username of poster
    const userNickname = document.createElement('h2');
    userNickname.innerHTML = `${posts.postername}`;

    //Title
    const postTitle = document.createElement('h1');
    postTitle.innerHTML = `${posts.title}`;
    console.log('post page title', posts.title);

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
            postImg.src = url + '/' + posts.filename;
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

console.log('session id ', sessionStorage.getItem('id'));
// Function to fetch data for post
const getPost = async () => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        if (sessionStorage.getItem('token') || sessionStorage.getItem('user')) {
            console.log(sessionStorage.getItem('id'));
            // Getting post id from session storage and placing it into route
            const res = await fetch(
                url + '/post/' + sessionStorage.getItem('id'),
                fetchOptions
            );
            const posts = await res.json();
            createPost(posts);
        } else {
            console.log(sessionStorage.getItem('id'));
            // Getting post id from session storage and placing it into route
            const res = await fetch(
                url + '/post/anon/' + sessionStorage.getItem('id'),
                fetchOptions
            );
            const posts = await res.json();
            createPost(posts);
        }
    } catch (e) {
        console.log(e.message);
    }
};
getPost();

// Get comments from DB
const getComments = async () => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        console.log(sessionStorage.getItem('id'));
        // Getting post id from session storage and placing it into route
        const res = await fetch(
            url + '/comment/' + sessionStorage.getItem('id'),
            fetchOptions
        );
        const comments = await res.json();
        console.log(comments);
        createComments(comments);
    } catch (e) {
        console.log(e.message);
    }
};
getComments();

// Function to fetch data for users
const getUserInfo = async () => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const res = await fetch(url + '/user/' + user.user_id, fetchOptions);
        usersLog = await res.json();
        console.log('user', usersLog);
        if (!usersLog.profile_picture) {
            profileImg.src =
            'placeholder/male-default-placeholder-avatar-profile-260nw-582509551.jpg';
            console.log(1);
        } else {
            //getting the default profile pic if not yet set
            console.log(url + '/' + usersLog.profile_picture);
            profileImg.src = url + '/' + usersLog.profile_picture;
        }
        name.innerHTML = usersLog.username;
    } catch (e) {
        console.log(e.message);
    }
};
getUserInfo();