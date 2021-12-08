'use strict';

const url = 'http://localhost:3000';
const feed = document.querySelector('#postFeed');
const nickname = document.querySelector('#nickname');
const profileImg = document.querySelector('.profileImg');
//profileImg.innerHTML = getUserInfo().user.image;  // image not implemented yet

// Function for creating post containers
const createPosts = (posts) => {
    // clear ul
    feed.innerHTML = '';
    // Creating HTML elements
    posts.forEach((post) => {
        const userPost = document.createElement('li');

        const buildText = document.createElement('p');
        buildText.innerHTML = `${post.description}`;

        //if not null do the layout like this
        if (post.filename != null) {
            const postImg = document.createElement('img');
            postImg.src = url + '/' + post.filename; // will be changes to filename
            postImg.alt = '404 image not found';
            userPost.appendChild(postImg);
        }
        const userImg = document.createElement('img');
        //const postNickname = document.createElement('h5');
        const postTitle = document.createElement('h3');
        postTitle.innerHTML = `${post.title}`;
        // Poster nickname
        const poster = document.createElement('h1');
        poster.innerHTML = `Poster: ${post.postername}`;
        // Poster profile picture
        const posterPfp = document.createElement('img');
        posterPfp.src = url + '/' + post.profile_picture;
        console.log(post.profile_picture);

        // Upvote button
        const upVote = document.createElement('button');
        upVote.innerHTML = 'Upvote';
        // Downvote button
        const downVote = document.createElement('button');
        downVote.innerHTML = 'Dowvote';
        // Total votes button
        const votes = document.createElement('p');
        votes.innerHTML = `${post.Votes}`;

        // Get date from db and format it
        const date = new Date(post.date);
        // Create element for the date
        const dateText = document.createElement('p');
        dateText.innerHTML = date;

        // Placing the hierarchy in the post object
        feed.appendChild(userPost);
        userPost.appendChild(posterPfp);
        userPost.appendChild(poster);
        userPost.appendChild(userImg);
        userPost.appendChild(postTitle);
        userPost.appendChild(buildText);
        userPost.appendChild(upVote);
        userPost.appendChild(downVote);
        userPost.appendChild(votes);
        userPost.appendChild(dateText);

        // Get logged in user and send a get request for vote info
        const user = JSON.parse(sessionStorage.getItem('user'));
        let reqMethod = 'POST';

        let voteInfo = 0;
        const getVote = async () => {
            const fetchOptions = {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
            };

            const res = await fetch(
                url + '/vote/' + user.user_id + '/' + post.post_id,
                fetchOptions
            );
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

            if (voteInfo.vote_count == 1) {
                reqMethod = 'DELETE';
            }
            const fetchOptions = {
                method: reqMethod,
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };
            console.log('upvote req', reqMethod);
            try {
                const res = await fetch(
                    url + '/vote/' + post.post_id,
                    fetchOptions
                );
                const vote = await res.json();
                console.log(vote);
            } catch (e) {
                console.error('error', e.message);
            }
        });

        // Send a request for downvoting
        downVote.addEventListener('click', async () => {
            const data = { user_id: user.user_id, vote_count: 0 };
            console.log('downvoted post with id', post.post_id);
            if (voteInfo.vote_count == 0) {
                reqMethod = 'DELETE';
            }

            const fetchOptions = {
                method: reqMethod,
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };
            const res = await fetch(
                url + '/vote/' + post.post_id,
                fetchOptions
            );
            const vote = await res.json();
            console.log(vote);
        });
    });
};

const getPost = async () => {
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
getPost();
