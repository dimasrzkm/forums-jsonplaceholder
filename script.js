const chunkSize = 5;
const allPostsChunk = [];
let indexChunks = 0;

let buttonLoad = document.querySelector(".btn-load");
let loading = document.querySelector(".loading");

const urlPostsWithUsers = [
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/users",
];

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (err) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
};

// get data dari kedua endpoint
Promise.all(urlPostsWithUsers.map((item) => fetchData(item)))
  .then((res) => {
    const [posts, users] = res;
    const usersPosts = posts.map((post) => {
      let option = {
        name: users.find((user) => user.id === post.userId).name,
        username: users.find((user) => user.id === post.userId).username,
      };
      return {
        ...post,
        ...option,
      };
    });

    // allPosts = [...usersPosts];
    for (let i = 0; i < usersPosts.length; i += chunkSize) {
      const chunk = usersPosts.slice(i, i + chunkSize);
      allPostsChunk.push(chunk);
    }

    loading.classList.add("hidden");
    buttonLoad.classList.remove("hidden");

    allPostsChunk[indexChunks].forEach((chunk) => {
      document.querySelector(".container").innerHTML += templateHtml(chunk);
    });
    indexChunks += 1;
  })
  .catch((err) => console.error(err));

function templateHtml(data) {
  return (template = `
        <section class="posts">
          <h3 class="post-title">${data.title}</h3>
          <div class="post-author">
            <h4 class="author">${data.name}</h4>
            <p class="author-username">${data.username}</p>
          </div>
          <div class="post">
            <p class="post-detail">
              ${data.body}
            </p>
          </div>
          <div class="post-comments">
            <a href="#" class="comment">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                /></svg
              >See Answer</a
            >
          </div>
      </section>
    `);
}

buttonLoad.addEventListener("click", function () {
  if (indexChunks <= allPostsChunk.length - 1) {
    allPostsChunk[indexChunks].forEach((chunk) => {
      document.querySelector(".container").innerHTML += templateHtml(chunk);
    });
    indexChunks += 1;
  }
});
