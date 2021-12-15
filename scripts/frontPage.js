'use strict';
const url = 'https://localhost:8000';
const feed = document.querySelector('#postFeed');
const nickname = document.querySelector('#nickname');
const profileImg = document.querySelector('.dropbtn');
const name = document.querySelector('#name');
const user = JSON.parse(sessionStorage.getItem('user'));
let usersLog;
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

const userInfo = document.querySelector('.dropdown');
const anonUserInfo = document.querySelector('.dropdown-anon');

if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
    userInfo.style.display = 'none';
    anonUserInfo.style.display = 'block';
} else {
    userInfo.style.display = 'block';
    anonUserInfo.style.display = 'none';
}
// Function for creating post containers
const createPosts = (posts) => {
    // clear ul
    feed.innerHTML = '';
    // Creating HTML elements
    posts.forEach((post) => {
        // Get logged in user and send a get request for vote info
        const user = JSON.parse(sessionStorage.getItem('user'));
        const userPost = document.createElement('li');

        // Poster nickname
        const poster = document.createElement('a');
        poster.innerHTML = `${post.postername}`;
        poster.addEventListener('click', () => {
            if (
            !sessionStorage.getItem('token') ||
            !sessionStorage.getItem('user')
            ) {
                alert('Login/register to view profiles');
                return;
            }
            // Saving id of the poster into session storage

            sessionStorage.setItem('poster_id', post.poster);
            // Hyperlink to profilePage
            poster.setAttribute('href', 'profilePage.html');
            poster.setAttribute('id', 'poster');
            console.log('get posterId', post.poster);
        });

        // Poster profile picture
        const posterPfp = document.createElement('img');
        // if poster null but default
        if (!post.userpfp) {
            posterPfp.src =
            'placeholder/male-default-placeholder-avatar-profile-260nw-582509551.jpg';
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

        //for the dropdown button setting it up

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
        const reportButton = document.createElement('a');
        //sets the link to send report
        if (sessionStorage.getItem('token') || sessionStorage.getItem('user')) {
            reportButton.href = `mailto:Admin@gmail.com?body=User report from user ID ${user.user_id}%0d%0a` +
            'Reported post information:%0d%0a' +
            `Post ID: ${post.post_id}%0d%0a` +
            `Post title: ${post.title}%0d%0a` +
            `Poster ID: ${post.poster}%0d%0a` +
            `Poster username: ${post.postername}`;
            reportButton.innerHTML = 'Report';

            dropdownContent.appendChild(reportButton);
        }

        // Check if user is a moderator if not append delete button to drop list only for
        // logged in user's post
        if (sessionStorage.getItem('token') || sessionStorage.getItem('user')) {
            if (user.role === 0) {
                deleteButton.innerHTML = 'Delete';
                dropdownContent.appendChild(deleteButton);
            } else if (user.user_id === post.poster) {
                deleteButton.innerHTML = 'Delete';
                dropdownContent.appendChild(deleteButton);
            }
        }
        //delete the post when you click the delete button
        deleteButton.addEventListener('click', async () => {
            console.log('delete');
            const fetchOptions = {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                },
            };
            try {
                const response = await fetch(
                url + '/post/' + post.post_id,
                fetchOptions,
                );
                const json = await response.json();
                console.log('delete response', json);
                getPost();
            } catch (e) {
                console.log(e.message);
            }
        });

        // Append elements
        dropdown.appendChild(verticalMenu);
        dropdown.appendChild(dropdownContent);
        userPost.appendChild(posterDiv);
        posterDiv.appendChild(posterPfp);
        posterDiv.appendChild(poster);
        posterDiv.appendChild(dropdown);

        //set the description
        const buildText = document.createElement('p');
        buildText.setAttribute('id', 'buildText');
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
        const postTitle = document.createElement('a');
        postTitle.innerHTML = `${post.title}`;
        postTitle.addEventListener('click', () => {
            // Saving id of the post into session storage
            sessionStorage.setItem('id', post.post_id);
            // Hyperlink to postPage
            postTitle.setAttribute('href', 'postPage.html');
            postTitle.setAttribute('id', 'postTitle');
            console.log('get postId', post.post_id);
        });

        // Downvote button
        const downVote = document.createElement('img');
        downVote.src = './placeholder/down-arrow.png';
        downVote.innerHTML = 'Dowvote';
        downVote.setAttribute('id', 'downVote');

        // Total votes button
        const votes = document.createElement('p');
        votes.setAttribute('id', 'voteCount');
        votes.innerHTML = `${post.votes}`;

        // Upvote button
        const upVote = document.createElement('img');
        upVote.src = './placeholder/up-arrow.png';
        upVote.innerHTML = 'Upvote';
        upVote.setAttribute('id', 'upVote');

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
        dateText.setAttribute('id', 'postDate');
        const postTextContent = document.createElement('div');
        postTextContent.className = 'postTextContent';
        userPost.appendChild(postTextContent);
        // Placing the hierarchy in the post object
        feed.appendChild(userPost);
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
            const res = await fetch(
            url + '/vote/' + user.user_id + '/' + post.post_id,
            fetchOptions,
            );
            const vote = await res.json();
            console.log('vote:', vote.vote_count);

            if (vote.vote_count == 1 || vote.vote_count == 0) {
                reqMethod = 'PUT';
                console.log('Change req method', reqMethod);
                if (vote.vote_count == 1) {
                    upVote.style.backgroundColor = 'rgb(255, 145, 0)';
                    upVote.style.borderRadius = '50%';
                } else {
                    downVote.style.backgroundColor = 'rgb(67, 70, 201)';
                    downVote.style.borderRadius = '50%';
                }
            }

            voteInfo = vote;
            console.log('variable test:', vote.vote_count);
        };
        getVote();

        // Send a request for upvoting
        upVote.addEventListener('click', async () => {
            if (
            !sessionStorage.getItem('token') ||
            !sessionStorage.getItem('user')
            ) {
                alert('Login/register to give feedback');
                return;
            }
            const data = {user_id: user.user_id, vote_count: 1};
            console.log('upvoted post with id', post.post_id);
            console.log('variable test upvote:', voteInfo.vote_count);

            // If vote already exist, delete it
            if (voteInfo.vote_count == 1) reqMethod = 'DELETE';
            // Send the req body to reqFunction
            reqFunction(data);
        });

        // Send a request for downvoting
        downVote.addEventListener('click', async () => {
            if (
            !sessionStorage.getItem('token') ||
            !sessionStorage.getItem('user')
            ) {
                alert('Login/register to give feedback');
                return;
            }
            const data = {user_id: user.user_id, vote_count: 0};
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
                const res = await fetch(
                url + '/vote/' + post.post_id,
                fetchOptions,
                );
                const vote = await res.json();
                console.log(vote);
            } catch (e) {
                console.error('error', e.message);
            }
            getPost();
        };
    });
};

// Close the dropdown if the user clicks outside of it
feed.onclick = function(ev) {
    if (!ev.target.matches('.dropImgBtn')) {
        const dropdowns = document.getElementsByClassName(
        'dropdown-content-verticalmenu',
        );
        for (let i = 0; i < dropdowns.length; i++) {
            let openDrown = dropdowns[i];
            if (openDrown.classList.contains('show')) {
                openDrown.classList.remove('show');
            }
        }
    }
};

const getPost = async () => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        if (sessionStorage.getItem('token') || sessionStorage.getItem('user')) {
            const res = await fetch(url + '/post', fetchOptions);
            const posts = await res.json();
            createPosts(posts);
            console.log('USING LOGGED IN ROUTE FOR POSTS');
        } else {
            const res = await fetch(url + '/post/anon', fetchOptions);
            console.log('USING ANONYMOUS ROUTE FOR POSTS');
            const posts = await res.json();
            createPosts(posts);
        }
    } catch (e) {
        console.log(e.message);
    }
};
getPost();

// Get search button element
const search = document.getElementById('go');

// Event listener for search button, get input value, if the value is empty do nothing
// else end the word/letter to searchPosts function
search.addEventListener('click', (evt) => {
    evt.preventDefault();
    const word = document.getElementById('key-word').value;
    if (word == '') {
        return;
    }
    searchPosts(word);
});

// Send GET request with the word/letter as a parameter. catch any errors
const searchPosts = async (word) => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const res = await fetch(
        url + '/post/anon/search/' + word,
        fetchOptions,
        );
        const posts = await res.json();
        createPosts(posts);
    } catch (e) {
        console.log(e.message);
    }
};
