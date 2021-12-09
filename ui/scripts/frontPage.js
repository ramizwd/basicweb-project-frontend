'use strict';
const url = 'http://localhost:3000';
const feed = document.querySelector('#postFeed');
const nickname = document.querySelector('#nickname');
const profileImg = document.querySelector('.profileImg');
//profileImg.innerHTML = getUserInfo().user.image;  // image not implemented yet
const test = document.querySelector('.list');

// Function for creating post containers
const createPosts = (posts) => {
    // clear ul
    feed.innerHTML = '';
    // Creating HTML elements
    posts.forEach((post) => {
        const userPost = document.createElement('li');
        // Poster nickname
        const poster = document.createElement('h1');
        poster.innerHTML = `${post.postername}`;

        // Poster profile picture
        const posterPfp = document.createElement('img');
        // if poster null but default
        // posterPfp.src = url + '/' + post.profile_picture;
        //getting the default profile pic if not yet set
        posterPfp.src = 'placeholder/male-default-placeholder-avatar-profile-260nw-582509551.jpg';
        posterPfp.width = '45';
        posterPfp.height = '45';
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

        //for the content inside of dropdown

        //setting up div
        const dropdownContent = document.createElement('div');

        //setting div class name
        dropdownContent.className = 'dropdown-content-verticalmenu';

        //setting the word delete and report
        const deleteButton = document.createElement('p');
        const reportButton = document.createElement('p');

        //word delete
        deleteButton.innerHTML = 'Delete';
        //append to dropdowncontent
        dropdownContent.appendChild(deleteButton);

        //when the vertical button press it will show the dropdown content
        verticalMenu.addEventListener('click', showContent => {
            dropdownContent.classList.toggle('show');
        });

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
            if (post.file_type === 'image/png' || post.file_type ===
            'image/jpg' || post.file_type === 'image/webp') {
                //create img elements
                postImg = document.createElement('img');
                //source where to get it
                postImg.src = url + '/thumbnails/' + post.filename;  // will be changes to filename
            } else if (post.file_type === 'video/mp4') {
                //create video element
                postImg = document.createElement('video');
                //set so can control
                postImg.controls = true;
                //source where to get video
                postImg.src = url + '/' + post.filename;
                //postImg.src = url + '/thumbnails/' + post.filename+'/'+post.filename+'-thumbnail-200x200-0010.png';  // will be changes to filename
            }
            //if no img alternative
            postImg.alt = '404 image not found';
            //append postIMG
            userPost.appendChild(postImg);
        }
        //const postNickname = document.createElement('h5');
        const postTitle = document.createElement('a');
        postTitle.innerHTML = `${post.title}`;
        postTitle.addEventListener('click',() => {
            //userPost.location.href='postPage.html/post/' + post.post_id;
            //postTitle.setAttribute('href', 'postPage.html');
            const fetchOptions = {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                },
            };
            console.log('get postId', post.post_id);
        });

        // Placing the hierarchy in the post object
        feed.appendChild(userPost);
        userPost.appendChild(postTitle);
        userPost.appendChild(buildText);
    });
};


// Close the dropdown if the user clicks outside of it
window.onclick = function(ev) {
    if (!ev.target.matches('.dropImgBtn')) {
        const dropdowns = document.getElementsByClassName(
        'dropdown-content-verticalmenu');
        let i;
        for (i = 0; i < dropdowns.length; i++) {
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
        const res = await fetch(url + '/post', fetchOptions);
        const posts = await res.json();
        createPosts(posts);
    } catch (e) {
        console.log(e.message);
    }
};
getPost();
