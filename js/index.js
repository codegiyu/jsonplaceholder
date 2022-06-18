document.addEventListener("DOMContentLoaded", function(){
  var myOffcanvas = document.getElementById('side-nav');
  var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
  document.getElementById("OpenMenu").addEventListener('click',function (e){
    e.preventDefault();
    e.stopPropagation();
    bsOffcanvas.toggle();
  });
});

let postsArray = [];
let photosArray = [];
let commentsArray = [];
let cardsContainer = document.getElementById('cards-container');
let createPostForm = document.querySelector('#create-post-form');
let newTitle = document.querySelector('#new-title');
let newBody = document.querySelector('#new-body');


function getData() {
    fetch('https://jsonplaceholder.typicode.com/posts/?_limit=12')
        .then((response) => response.json())
        .then((data) => {
            console.log(postsArray)
            //    console.log(data)
            postsArray = data
            displayPosts(postsArray)
        }) 
}

getData();


function displayPosts(arr) {
    console.log(arr.length);
    console.log(arr);
    let card = '';
    for(let x = 0; x < arr.length; x++) {
        card += `<div class="postcard col-12 col-md-6 col-xl-4 p-2 mb-4">
                        <div class="card-wrap rounded shadow-sm p-0 m-0">
                            <div class="img-container ratio ratio-16x9 position-relative">
                                <img src="img/home-banner.jpg" alt="" class="postImg img-fluid">
                                <span class="postId badge bg-primary text-white fs-5 fw-bold rounded position-absolute">${arr[x].id}</span>
                            </div>
                            <div class="card-body bg-white px-3 py-4 d-grid">
                                <p class="postTag fs-80 badge bg-green me-auto">${arr[x].title.split(' ')[0]}</p>
                                <h6 class="postTitle ff-serif fs-3 fw-bold my-1">${arr[x].title.slice(0, 15)}</h6>
                                <p class="postBody text-secondary fs-6 my-2">${arr[x].body.slice(0, 40)}...</p>
                                <div class="d-flex justify-content-between mt-5">
                                    <a href="fullpost.html?id=${arr[x].id}" class="text-decoration-none m-0 p-0"><button class="btn bg-lightblue fs-6 px-2 lh-1 py-2 text-white">View</button></a>
                                    <button class="btn bg-green fs-6 px-2 lh-1 py-2 text-white" data-bs-toggle="modal" data-bs-target="#updateModal${arr[x].id}">Update</button>
                                    <button class="btn text-danger fs-6 p-0" onclick="deletePost(${arr[x].id})"><span class="iconify" data-icon="ion:trash" style="color: red;" data-width="30" data-height="30"></span></button>
                                </div>
                                <div class="modal fade" id="updateModal${arr[x].id}" tabindex="-1" aria-labelledby="updateModalLabel${arr[x].id}" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="updateModalLabel${arr[x].id}">Update Post ${arr[x].id}</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <form>
                                                <div class="mb-3">
                                                    <label for="recipient-name" class="col-form-label">Post Title:</label>
                                                    <input type="text" class="form-control post-title" value="${arr[x].title.slice(0, 15)}">
                                                </div>
                                                <div class="mb-3">
                                                    <label for="message-text" class="col-form-label">Body:</label>
                                                    <textarea class="form-control post-body" rows="6">${arr[x].body}</textarea>
                                                </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary update-btn" onclick="updatePost(${arr[x].id})">Update Post</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
    
        cardsContainer.innerHTML = card;
    }
}



function updatePost(id) {
    console.log(id);
    let updatetitle = document.querySelectorAll('.post-title');
    let updatebody = document.querySelectorAll('.post-body');



    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: updatetitle[id-1].value,
            body: updatebody[id-1].value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {

            console.log(data)
            let postTags = document.querySelectorAll('.postTag')
            let postTitles = document.querySelectorAll('.postTitle')
            let postBodies = document.querySelectorAll('.postBody')
            // console.log(postTitles)
            postTags.forEach((postTag, index) => {
                if (index + 1 === id) {
                    if (data.title !== "") {
                        postTag.innerHTML = data.title.split(' ')[0]
                    }
                }

            })

            postTitles.forEach((postTitle, index) => {
                if (index + 1 === id) {
                    if (data.title !== "") {
                        postTitle.innerHTML = data.title
                    }
                }

            })

            postBodies.forEach((postBody, index) => {
                if (index + 1 === id) {
                    if (data.body !== "") {
                        postBody.innerHTML = data.body
                    }
                }

            })

            $(`#updateModal${id}`).modal('hide')

        });
}

function deletePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            postsArray = postsArray.filter(post => post.id !== id)
            displayPosts(postsArray)  
        })

}

createPostForm.addEventListener('submit', createPost);

function createPost(e) {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: newTitle.value,
            body: newBody.value,
            userId: 2
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            postsArray.unshift(data);
            displayPosts(postsArray)
            createPostForm.reset()
            cardsContainer.scrollIntoView()
        })
}
