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

if(!postsArray.length) {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
        for(let i = 0; i < posts.length; i++) {
            postsArray.push(posts[i]);
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

for(let j = 0; j < postsArray.length; j++) {
    completeArray.push(postsArray[j]);
}

console.log(completeArray);

// for(let x = 0; )