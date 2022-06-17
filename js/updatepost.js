let postId = new URLSearchParams(window.location.search).get("id");
console.log(postId);

let postPhoto;
let post;

// async function getData() {
//     const photos = await fetch(`https://jsonplaceholder.typicode.com/photos?id=${postId}`);

//     postPhoto = await photos.json();

//     const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${postId}`);

//     post = await posts.json();

//     if (posts) {
//         console.log("Fetch Full Post OK");
//     }
//     setPageTitle();
//     console.log("Page title successfully changed");
//     showFullPost();
// }

fetch(`https://jsonplaceholder.typicode.com/posts?id=${postId}`)
.then(response => response.json())
.then(data => {
    console.log(data)
    document.title = `${data[0].title.slice(0, 15)} | Giyu's API Blog`

    let tagField = document.getElementById("update-post-tag")
    let titleField = document.getElementById("update-post-title")
    let bodyField = document.getElementById("update-post-body")

    titleField.setAttribute('value', `${data[0].title.slice(0, 15)}`)
    bodyField.innerHTML = data[0].body

    
    // var titleUpdate = document.getElementById("update-post-title").value
    // var bodyUpdate = document.getElementById("update-post-body").value

    // updateBtn.addEventListener("click", updatePost(`${postId}`));
    
    
});

function updatePost(x) {
    

    var titleUpdate = document.getElementById("update-post-title").value;
    var bodyUpdate = document.getElementById("update-post-body").value;

    fetch(`https://jsonplaceholder.typicode.com/posts/${x}`, {
    method: 'PUT',
    body: JSON.stringify({
        id: x,
        title: titleUpdate,
        body: bodyUpdate,
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        alert("Update Successful");
    });

}

let updateBtn = document.getElementById("updateButton");
updateBtn.addEventListener("click", updatePost(postId));



// getData();