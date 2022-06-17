let fullPostId = new URLSearchParams(window.location.search).get("id");
console.log(fullPostId);

let fullPostPhoto;
let fullPostComments;
let fullPostUsers;
let fullPost;

async function getSinglePost() {
    const photos = await fetch(`https://jsonplaceholder.typicode.com/photos?id=${fullPostId}`);

    fullPostPhoto = await photos.json();

    const comments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${fullPostId}`);

    fullPostComments = await comments.json();

    const users = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=5`);

    fullPostUsers = await users.json();

    const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${fullPostId}`);

    fullPost = await posts.json();

    if (posts) {
        console.log("Fetch Full Post OK");
    }
    setPageTitle();
    console.log("Page title successfully changed");
    showFullPost();
    showComments(fullPostComments);
}

function setPageTitle() {
    document.title = `${fullPost[0].title.slice(0, 15)} | Giyu's API Blog`;
}

function showFullPost() {
    let fullPostContainer = document.getElementById('full-post');
    console.log("post container gotten");
    console.log(fullPost);
    console.log(fullPostPhoto);
    let fullPostCard = `<div class="col-12 p-0">
                        <div class="card-wrap p-0 m-0">
                            <div class="img-container ratio ratio-16x9 rounded position-relative">
                                <img src="${fullPostPhoto[0].url}" alt="" class="postImg img-fluid rounded">
                                <span class="postId badge bg-primary text-white fs-1 fw-bold rounded px-3 px-md-3 px-lg-4 position-absolute">${fullPost[0].id}</span>
                            </div>
                            <div class="card-body bg-white px-3 py-4 d-grid">
                                <p class="postTag fs-90 badge bg-green me-auto my-2">${fullPost[0].title.split(' ')[0]}</p>
                                <h6 class="postTitle ff-serif fs-1 fw-bold my-1 my-4">${fullPost[0].title.slice(0, 15)}</h6>
                                <p class="postBody text-secondary text-justify fs-5 my-2">${fullPost[0].body}. ${fullPost[0].body}. ${fullPost[0].body}.</p>
                                <p class="postBody text-secondary text-justify fs-5 my-2">${fullPost[0].body}. ${fullPost[0].body}. ${fullPost[0].body}.</p>
                                <p class="postBody text-secondary text-justify fs-5 my-2">${fullPost[0].body}. ${fullPost[0].body}. ${fullPost[0].body}.</p>
                                <div class="d-flex justify-content-between mt-5">
                                <p class="fs-6">Written by <span class="fst-italic text-secondary fs-5">CodeGiyu</span></p>
                            </div>
                        </div>
                    </div>`;
    console.log("full post assigned");

    fullPostContainer.innerHTML += fullPostCard;
}

function showComments(arr) {
    let commentsContainer = document.getElementById('comments-box');
    for(let i = 0; i < arr.length; i++) {
        let comments = `<div class="comments-single row">
                            <div class="col-6 col-lg-4 pt-4">
                                <h5 class="fs-5 fw-bold">${fullPostUsers[i].name}</h5>
                                <p class="fs-90 fst-italic">${18 - i}th June, 2022</p>
                            </div>
                            <div class="col-12 col-lg-8">
                                <textarea name="" id="" class="w-100 bg-light rounded border border-verylightblue fs-6 p-4" rows="7">${arr[i].body}</textarea>
                            </div>
                        </div>
                        <hr>`;
        console.log("full post assigned");

        commentsContainer.innerHTML += comments;
    }
    
}

getSinglePost();