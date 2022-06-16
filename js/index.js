let postsArray = [];
let photosArray = [];
let commentsArray = [];
let cardsContainer = document.getElementById('cards-container');


async function getData() {
    const photos = await fetch('https://jsonplaceholder.typicode.com/photos');

    photosArray = await photos.json();

    const comments = await fetch('https://jsonplaceholder.typicode.com/comments');

    commentsArray = await comments.json();

    const posts = await fetch('https://jsonplaceholder.typicode.com/posts');

    postsArray = await posts.json();

    if (posts) {
        console.log("Fetch Data OK");
    }
    displayCards();
}


function displayCards() {
    console.log(postsArray.length);
    for(let x = 0; x < 25; x++) {
        let card = `<div class="col-12 col-md-6 col-xl-4 p-2 mb-4">
                        <div class="card-wrap rounded shadow-sm p-0 m-0">
                            <div class="img-container ratio ratio-16x9 position-relative">
                                <img src="${photosArray[x].url}" alt="" class="postImg img-fluid">
                                <span class="postId badge bg-primary text-white fs-5 fw-bold rounded position-absolute">${postsArray[x].id}</span>
                            </div>
                            <div class="card-body bg-white px-3 py-4 d-grid">
                                <p class="postTag fs-80 badge bg-green me-auto">${photosArray[x].title.split(' ')[0]}</p>
                                <h6 class="postTitle ff-serif fs-3 fw-bold my-1">${postsArray[x].title.slice(0, 15)}</h6>
                                <p class="postBody text-secondary fs-6 my-2">${postsArray[x].body.slice(0, 40)}...</p>
                                <div class="d-flex justify-content-between mt-5">
                                    <a href="fullpost.html?id=${postsArray[x].id}" class="text-decoration-none m-0 p-0"><button class="btn bg-lightblue fs-6 px-2 lh-1 py-2 text-white">View</button></a>
                                    <a href="update-post.html?id=${postsArray[x].id}" class="text-decoration-none m-0 p-0"><button class="btn bg-green fs-6 px-2 lh-1 py-2 text-white">Update</button></a>
                                    <button class="btn text-danger fs-6 p-0"><span class="iconify" data-icon="ion:trash" style="color: red;" data-width="30" data-height="30"></span></button>
                                </div>
                            </div>
                        </div>
                    </div>`;
    
        cardsContainer.innerHTML += card;
    }
}

getData();
