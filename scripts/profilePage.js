'use strict';

const url = 'https://10.114.32.27/app';
// get user data for admin check
const user = JSON.parse(sessionStorage.getItem('user'));
const name = document.querySelector('#name');
const profileImg = document.querySelector('.dropbtn');
let users;
let usersLog;
// Function to fetch data for users
const getUserInfo = async () => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const res = await fetch(url + '/user/' + sessionStorage.getItem('poster_id'), fetchOptions);
        const resLog = await fetch(url + '/user/' + user.user_id, fetchOptions);
        users = await res.json();
        usersLog = await resLog.json();
        console.log('user', users);
        loggedUser(usersLog);
        createBio(users);
    } catch (e) {
        console.log(e.message);
    }
};
getUserInfo();

// Function to fetch data for posts
const getPostInfo = async () => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const res = await fetch(url + '/post/user/' + sessionStorage.getItem('poster_id'), fetchOptions);
        const posts = await res.json();
        createPosts(posts);
    } catch (e) {
        console.log(e.message);
    }
};

getPostInfo();

// Selection of existing html elements
const bio = document.querySelector('.bio');
const postList = document.querySelector('.postList');

// Function for creating users bio  in header

// Function for users info in login window (dropdown)
const loggedUser = (usersLog) => {
    bio.innerHTML = '';
    // if the image is null place default image
    if (!usersLog.profile_picture) {
        profileImg.src = 'placeholder/no-pfp.jpg';
        console.log(1);
    } else {
        //sets the image to profile
        console.log(url + '/' + usersLog.profile_picture);
        profileImg.src = url + '/' + usersLog.profile_picture;
    }
    name.innerHTML = usersLog.username;
};
// Function for creating users bio in header
const createBio = (users) => {
    bio.innerHTML = '';
    console.log('jojo', users);
    //creates place for username
    const userNickname = document.createElement('h1');
    userNickname.innerHTML = `${users.username}`;

    //create image for profile
    const userAvatar = document.createElement('img');

    // if poster null but default image
    if (!users.profile_picture) {
        userAvatar.src = 'placeholder/no-pfp.jpg';
        console.log(1);
    } else {
        //if the image is existence set the image
        console.log(url + '/' + users.profile_picture);
        userAvatar.src = url + '/' + users.profile_picture;
    }

    //make description
    const userDescription = document.createElement('p');
    if (users.description) {
        userDescription.innerHTML = `${users.description}`;
    }

    // Placing the hierarchy in the bio header
    bio.appendChild(userAvatar);
    bio.appendChild(userNickname);
    bio.appendChild(userDescription);

    // Setting attributes for repeating elements
    userAvatar.setAttribute('id', 'avatar');
    userDescription.setAttribute('id', 'textBio');

    let currentUser = usersLog;
    let visitingUser = sessionStorage.getItem('poster_id');

    //if the current user
    if (!(currentUser.user_id == visitingUser) && currentUser.role == 1) {
        console.log('cur', currentUser.user_id);
        console.log('vis', visitingUser);
        console.log(currentUser.user_id == visitingUser);
        //remove if the user is not admin or not the right user
        document.getElementById('add-edit-btn').remove();
        settingbtn.remove();
    }
};

// Function for creating post containers
const createPosts = (posts) => {
    // Clear ul
    postList.innerHTML = '';
    // Creating HTML elements
    posts.forEach((post) => {
        // Get logged in user and send a get request for vote info
        const user = JSON.parse(sessionStorage.getItem('user'));
        const userPost = document.createElement('li');

        // Poster nickname
        const poster = document.createElement('p');
        poster.innerHTML = `${post.postername}`;
        poster.addEventListener('click', () => {
            // Saving id of the post into session storage
            sessionStorage.setItem('id', post.poster);
            location.href = 'profilePage.html';
        });

        // Poster profile picture
        const posterPfp = document.createElement('img');
        // if poster null but default
        if (!post.userpfp) {
            posterPfp.src = 'placeholder/no-pfp.jpg';
            posterPfp.width = '45';
            posterPfp.height = '45';
        } else {
            //getting the default profile pic if not yet set
            posterPfp.src = url + '/' + post.userpfp;
            posterPfp.width = '45';
            posterPfp.height = '45';
        }

        //for the upper piece of the postcard
        const posterDiv = document.createElement('div');
        posterDiv.className = 'posterDiv';

        //setting the division
        const dropdown = document.createElement('div');

        //setting div class name
        dropdown.className = 'dropdownImg';

        //creating element img
        const verticalMenu = document.createElement('img');
        //setting up size,img and class name
        verticalMenu.src = 'placeholder/icons8-menu-vertical-48.png';
        verticalMenu.width = '20';
        verticalMenu.height = '25';
        verticalMenu.className = 'dropImgBtn';
        //when the vertical button press it will show the dropdown content
        verticalMenu.addEventListener('click', () => {
            dropdownContent.classList.toggle('show');
        });
        //for the content inside of dropdown

        //setting up div
        const dropdownContent = document.createElement('div');

        //setting div class name
        dropdownContent.className = 'dropdown-content-verticalmenu';

        // Clear old poster id from session
        const profileBtn = document.querySelector('#profileBtn');
        profileBtn.addEventListener('click', () => {
            // Resetting user id in session storage to get logged user profile
            sessionStorage.setItem('poster_id', user.user_id);
            // Hyperlink to profilePage
            profileBtn.setAttribute('href', 'profilePage.html');
            console.log('get posterId', post.poster);
        });

        //setting the word delete and report
        const deleteButton = document.createElement('p');
        const reportButton = document.createElement('p');

        reportButton.innerHTML = 'Report';
        const informer = () => {
            //question if the user wants to be redirected
            let answer = confirm('You are being redirected to a mail application for sending a report.');
            //if the answer is yes
            if (answer) {
                document.location = reportButton.href =
                    `mailto:Admin@gmail.com?body=User report from user ID ${user.user_id}%0d%0a` +
                    'Reported post information:%0d%0a' +
                    `Post ID: ${post.post_id}%0d%0a` +
                    `Post title: ${post.title}%0d%0a` +
                    `Poster ID: ${post.poster}%0d%0a` +
                    `Poster username: ${post.postername}`;
            }
        };
        reportButton.onclick = informer;

        dropdownContent.appendChild(reportButton);

        // Check if user is a moderator if not append delete button to drop list only for
        // logged in user's post
        if (user.role === 0) {
            deleteButton.innerHTML = 'Delete';
            dropdownContent.appendChild(deleteButton);
        } else if (user.user_id === post.poster) {
            deleteButton.innerHTML = 'Delete';
            dropdownContent.appendChild(deleteButton);
        }
        //delete the post when you click the delete button
        deleteButton.addEventListener('click', async () => {
            //confirm if ok
            let answer = confirm('Delete post?');
            //if the answer is yes
            if (answer) {
                console.log('delete');
                const fetchOptions = {
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    },
                };
                try {
                    const response = await fetch(url + '/post/' + post.post_id, fetchOptions);
                    const json = await response.json();
                    console.log('delete response', json);
                    getPostInfo();
                } catch (e) {
                    console.log(e.message);
                }
            }
        });

        //this appends to dropdown div
        dropdown.appendChild(verticalMenu);
        dropdown.appendChild(dropdownContent);
        //this appends to userpost list
        userPost.appendChild(posterDiv);
        //this appends to posterdiv div
        posterDiv.appendChild(posterPfp);
        posterDiv.appendChild(poster);
        posterDiv.appendChild(dropdown);

        //set the description
        const buildText = document.createElement('p');
        buildText.innerHTML = `${post.description}`;

        //if not null do the layout like this
        if (post.filename != null) {
            let postImg;
            //if image on se pistää create element
            if (
                post.file_type === 'image/png' ||
                post.file_type === 'image/jpg' ||
                post.file_type === 'image/webp' ||
                post.file_type === 'image/jpeg'
            ) {
                //create img elements
                postImg = document.createElement('img');
                //source where to get it
                postImg.src = url + '/thumbnails/' + post.filename; // will be changes to filename
                postImg.style.width = '100%';
                //if no img alternative
                postImg.alt = '404 image not found';
                //append postIMG
                userPost.appendChild(postImg);
            } else if (post.file_type === 'video/mp4') {
                //create video element
                postImg = document.createElement('video');
                //set so can control
                postImg.controls = true;
                //source where to get video
                postImg.src = url + '/' + post.filename;
                //postImg.src = url + '/thumbnails/' + post.filename+'/'+post.filename+'-thumbnail-200x200-0010.png';  // will be changes to filename
                postImg.style.width = '100%';
                //if no img alternative
                postImg.alt = '404 image not found';
                //append postIMG
                userPost.appendChild(postImg);
            }
        }
        //const postNickname = document.createElement('h5');
        const postTitle = document.createElement('h3');
        postTitle.innerHTML = `${post.title}`;
        postTitle.addEventListener('click', () => {
            // Saving id of the post into session storage
            sessionStorage.setItem('id', post.post_id);
            location.href = 'postPage.html';
        });

        // Upvote button
        const upVote = document.createElement('img');
        upVote.src = './placeholder/up-arrow.png';
        upVote.innerHTML = 'Upvote';
        upVote.setAttribute('id', 'upVote');

        // Downvote button
        const downVote = document.createElement('img');
        downVote.src = './placeholder/down-arrow.png';
        downVote.innerHTML = 'Dowvote';
        downVote.setAttribute('id', 'downVote');
        // Total votes button
        const votes = document.createElement('p');
        votes.setAttribute('id', 'voteCount');
        votes.innerHTML = `${post.votes}`;

        // Get date from db and format it
        const date = new Date(post.date);
        // Format date
        const formattedDate =
            date.getDate() +
            '-' +
            (date.getMonth() + 1) +
            '-' +
            date.getFullYear() +
            ' ' +
            date.getHours() +
            ':' +
            date.getMinutes();
        // Create element for the date
        const dateText = document.createElement('p');
        dateText.innerHTML = 'Uploaded: ' + formattedDate;
        const postTextContent = document.createElement('div');
        postTextContent.className = 'postTextContent';
        userPost.appendChild(postTextContent);
        // Placing the hierarchy in the post object
        postList.appendChild(userPost);
        postTextContent.appendChild(postTitle);
        postTextContent.appendChild(buildText);
        postTextContent.appendChild(downVote);
        postTextContent.appendChild(votes);
        postTextContent.appendChild(upVote);
        postTextContent.appendChild(dateText);

        // Default request method is POST
        let reqMethod = 'POST';
        let voteInfo = 0;

        // Get vote info
        const getVote = async () => {
            const fetchOptions = {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
            };

            const res = await fetch(url + '/vote/' + user.user_id + '/' + post.post_id, fetchOptions);
            const vote = await res.json();
            console.log('vote:', vote.vote_count);

            if (vote.vote_count == 1 || vote.vote_count == 0) {
                reqMethod = 'PUT';
                console.log('Change req method', reqMethod);
            }

            voteInfo = vote;
            console.log('variable test:', vote.vote_count);
        };
        getVote();

        // Send a request for upvoting
        upVote.addEventListener('click', async () => {
            const data = { user_id: user.user_id, vote_count: 1 };
            console.log('upvoted post with id', post.post_id);
            console.log('variable test upvote:', voteInfo.vote_count);

            // If vote already exist, delete it
            if (voteInfo.vote_count == 1) reqMethod = 'DELETE';
            // Send the req body to reqFunction
            reqFunction(data);
        });

        // Send a request for downvoting
        downVote.addEventListener('click', async () => {
            const data = { user_id: user.user_id, vote_count: 0 };
            console.log('downvoted post with id', post.post_id);

            // If vote already exist, delete it
            if (voteInfo.vote_count == 0) reqMethod = 'DELETE';
            reqFunction(data);
        });
        // Request function
        const reqFunction = async (data) => {
            const fetchOptions = {
                method: reqMethod,
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };
            console.log('req method:', reqMethod);

            try {
                const res = await fetch(url + '/vote/' + post.post_id, fetchOptions);
                const vote = await res.json();
                console.log(vote);
            } catch (e) {
                console.error('error', e.message);
            }
            getPostInfo();
        };
    });
};

// Close the dropdown if the user clicks outside of it
postList.onclick = function (ev) {
    if (!ev.target.matches('.dropImgBtn')) {
        const dropdowns = document.getElementsByClassName('dropdown-content-verticalmenu');
        for (let i = 0; i < dropdowns.length; i++) {
            let openDrown = dropdowns[i];
            if (openDrown.classList.contains('show')) {
                openDrown.classList.remove('show');
            }
        }
    }
};
