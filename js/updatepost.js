let postId = new URLSearchParams(window.location.search).get("id");
console.log(postId);

let postPhoto;
let post;

async function getData() {
    const photos = await fetch(`https://jsonplaceholder.typicode.com/photos?id=${postId}`);

    postPhoto = await photos.json();

    const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${postId}`);

    post = await posts.json();

    if (posts) {
        console.log("Fetch Full Post OK");
    }
    setPageTitle();
    console.log("Page title successfully changed");
    showFullPost();
}

function setPageTitle() {
    document.title = `${post[0].title.slice(0, 15)} | Giyu's API Blog`;
}

function showFullPost() {
    let postContainer = document.getElementById('update-post');
    console.log("post container gotten");
    console.log(post);
    console.log(postPhoto);
    let updateForm = `<div class="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto p-2">
                        <div class="card-wrap p-0 m-0">
                            <form id="update-form">
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Post Tag:</label>
                                    <input type="text" class="form-control" id="update-post-tag" value="${postPhoto[0].title.split(' ')[0]}" required>
                                </div>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Post Title:</label>
                                    <input type="text" class="form-control" id="update-post-title" value="${post[0].title.slice(0, 15)}" required>
                                </div>
                                <div class="mb-3">
                                    <label for="message-text" class="col-form-label">Post Body:</label>
                                    <textarea class="form-control w-100 p-1" id="update-post-body" rows="6"  required>${post[0].body}</textarea>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-success" onclick="updatePost(${post[0].id})">Update Post</button>
                                </div>
                            </form>
                        </div>
                    </div>`;
    console.log("full post assigned");

    postContainer.innerHTML += updateForm;
}

getData();