const button = document.getElementById("createPost");

button.addEventListener("click", createPost);

function createPost() {
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: "My first post",
            body: "Hello from JS",
            userId: 1
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log("Created post:", data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}