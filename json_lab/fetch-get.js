const postList = document.getElementById("post-list");

fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => {
        return response.json();
    })
    .then(data => {

        data.forEach(post => {
            const postCard = document.createElement("div");

            const postId = document.createElement("p");
            postId.textContent = "Post ID: " + post.id;

            const postTitle = document.createElement("h2");
            postTitle.textContent = post.title;

            const postBody = document.createElement("p");
            postBody.textContent = post.body;

            postCard.appendChild(postId);
            postCard.appendChild(postTitle);
            postCard.appendChild(postBody);

            postList.appendChild(postCard);
            postList.appendChild(document.createElement("hr"));
        });
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });