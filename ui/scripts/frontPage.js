'use strict';
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
const profileImg = document.querySelector('.profileImg');
//profileImg.innerHTML = getUserInfo().user.image;  // image not implemented yet
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
        console.log(post.date);
        // posterPfp.src = url + '/' + post.profile_picture;
        //getting the default profile pic if not yet set
        posterPfp.src = 'placeholder/male-default-placeholder-avatar-profile-260nw-582509551.jpg';
        posterPfp.width = '45';
        posterPfp.height = '45';
        //for the upper piece of the postcard
        const posterDiv = document.createElement('div');
        posterDiv.className = 'posterDiv';
        //for the dropdown button setting it up
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdownImg';
        const verticalMenu = document.createElement('img');
        verticalMenu.src = 'placeholder/icons8-menu-vertical-48.png';
        verticalMenu.width = '20';
        verticalMenu.height = '25';
        verticalMenu.className = 'dropImgBtn';

        const dropdownContent = document.createElement('div');

        dropdownContent.className = 'dropdown-content';
        dropdownContent.setAttribute('id', 'myDropdown');

        const deleteButton = document.createElement('a');
        const reportButton = document.createElement('a');
        deleteButton.setAttribute('id', 'deleteAction');

        deleteButton.innerHTML = 'Delete';
        dropdownContent.appendChild(deleteButton);
        verticalMenu.addEventListener('click', showContent => {
            console.log(this.id);
            document.getElementById('myDropdown').classList.toggle('show');
        });

        deleteButton.addEventListener('click', async () => {
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
                getPostInfo();
            } catch (e) {
                console.log(e.message);
            }
        });

        dropdown.appendChild(verticalMenu);

        dropdown.appendChild(dropdownContent);

        userPost.appendChild(posterDiv);
        posterDiv.appendChild(posterPfp);
        posterDiv.appendChild(poster);
        posterDiv.appendChild(dropdown);

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
        //const postNickname = document.createElement('h5');
        const postTitle = document.createElement('h3');
        postTitle.innerHTML = `${post.title}`;

        // Placing the hierarchy in the post object
        feed.appendChild(userPost);

        userPost.appendChild(userImg);
        userPost.appendChild(postTitle);
        userPost.appendChild(buildText);
    });
};

// Close the dropdown if the user clicks outside of it
window.onclick = function(ev) {
    if (!ev.target.matches('.dropImgBtn')) {
        let dropdowns = document.getElementsByClassName('dropdown-content');
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDrown = dropdowns[i];
            if (openDrown.classList.contains('show')) {
                openDrown.classList.remove('show');
            }
        }
    }
};

const showContent = () => {


};