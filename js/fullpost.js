let fullPostId = new URLSearchParams(window.location.search).get("id");
console.log(fullPostId);

let fullPostPhoto;
let fullPostComments;
let fullPost;

async function getData() {
    const photos = await fetch(`https://jsonplaceholder.typicode.com/photos?id=${fullPostId}`);

    fullPostPhoto = await photos.json();

    const comments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${fullPostId}`);

    fullPostComments = await comments.json();

    const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${fullPostId}`);

    fullPost = await posts.json();

    if (posts) {
        console.log("Fetch Full Post OK");
    }
    showFullPost();
}

function showFullPost() {
    let fullPostContainer = document.getElementById('full-post');
    console.log("post container gotten");
    console.log(fullPost);
    console.log(fullPostPhoto);
    console.log(fullPostComments);
    let fullPostCard = `<div class="col-12 p-2">
                        <div class="card-wrap p-0 m-0">
                            <div class="img-container ratio ratio-16x9 position-relative">
                                <img src="${fullPostPhoto[0].url}" alt="" class="postImg img-fluid">
                                <span class="postId badge bg-primary text-white fs-1 fw-bold rounded position-absolute">${fullPost[0].id}</span>
                            </div>
                            <div class="card-body bg-white px-3 py-5 d-grid">
                                <p class="postTag fs-90 badge bg-green me-auto my-3">${fullPostPhoto[0].title.split(' ')[0]}</p>
                                <h6 class="postTitle ff-serif fs-3 fw-bold my-1 my-5">${fullPost[0].title.slice(0, 15)}</h6>
                                <p class="postBody text-secondary fs-6 my-2">${fullPost[0].body}. ${fullPost[0].body}. ${fullPost[0].body}. ${fullPost[0].body}.
                                
                                ${fullPost[0].body}. ${fullPost[0].body}. ${fullPost[0].body}. ${fullPost[0].body}.
                                
                                ${fullPost[0].body}. ${fullPost[0].body}. ${fullPost[0].body}. ${fullPost[0].body}.
                                
                                ${fullPost[0].body}. ${fullPost[0].body}. ${fullPost[0].body}. ${fullPost[0].body}.</p>
                                <div class="d-flex justify-content-between mt-5">
                                    <button class="btn bg-green fs-5 px-2 lh-1 py-1 text-white">Update</button>
                                    <button class="btn text-danger p-0"><span class="iconify" data-icon="ion:trash" style="color: red;" data-width="40" data-height="40"></span></button>
                                </div>
                            </div>
                        </div>
                    </div>`;
    console.log("full post assigned");

    fullPostContainer.innerHTML += fullPostCard;
}

getData();