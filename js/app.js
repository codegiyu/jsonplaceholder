var btt = $('#back-to-top');

$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        btt.addClass('show');
    } else {
        btt.removeClass('show');
    }
});

btt.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
});


let postsArray = [];
let photosArray = [];
let commentsArray = [];
let completeArray = [];
let cardsContainer = document.getElementById('cards-container');

if(!postsArray.length) {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
        for(let i = 0; i < posts.length; i++) {
            postsArray.push(posts[i]);
        }

        for(let j = 0; j < postsArray.length; j++) {
            completeArray.push(postsArray[j]);
        }
    });
}

console.log(postsArray);

if(!photosArray.length) {
    fetch('https://jsonplaceholder.typicode.com/photos')
    .then(response => response.json())
    .then(photos => {
        for(let i = 0; i < 100; i++) {
            photosArray.push(photos[i]);
        }

        for(let j = 0; j < photosArray.length; j++) {
            completeArray[j].tag = photosArray[j].title.split(' ')[0];
        }

        for(let j = 0; j < photosArray.length; j++) {
            completeArray[j].photoURL = photosArray[j].url;
        }

        for(let x = completeArray.length; x <= 0; x--) {
            let card = `<div class="col-12 col-md-6 col-xl-4 p-2">
                            <div class="card-wrap rounded shadow-sm p-0 m-0">
                                <div class="img-container ratio ratio-16x9 position-relative">
                                    <img src="${completeArray[x].photoURL}" alt="" class="postImg img-fluid">
                                    <span class="postId badge bg-primary text-white fs-3 fw-bold rounded position-absolute">${completeArray[x].id}</span>
                                </div>
                                <div class="card-body bg-white px-3 py-4 d-grid">
                                    <p class="postTag fs-80 badge bg-green me-auto">${completeArray[x].tag}</p>
                                    <h6 class="postTitle ff-serif fs-3 fw-bold my-1">${completeArray[x].title}</h6>
                                    <p class="postBody text-secondary fs-6 my-2">${completeArray[x].body}</p>
                                    <div class="d-flex justify-content-between mt-5">
                                        <button class="btn bg-lightblue fs-6 px-2 lh-1 py-0 text-white">View</button>
                                        <button class="btn bg-green fs-6 px-2 lh-1 py-0  text-white">Update</button>
                                        <button class="btn text-danger fs-6 p-0"><span class="iconify" data-icon="ion:trash" style="color: red;" data-width="30" data-height="30"></span></button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        
            cardsContainer.innerHTML += card;
            console.log(x);
        }
    });
}

console.log(photosArray);

if(!commentsArray.length) {
    fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json())
    .then(comments => {
        for(let i = 0; i < comments.length; i++) {
            commentsArray.push(comments[i]);
        }
    });
}

console.log(commentsArray);


console.log(completeArray);


