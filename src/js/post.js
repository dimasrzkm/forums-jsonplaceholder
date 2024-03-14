const app = document.querySelector(".main-app");
let id = localStorage.getItem("id");
let loading = document.querySelector(".loading");


const urlPostWithComments = [
  `https://jsonplaceholder.typicode.com/posts/${id}`,
  `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
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
Promise.all(urlPostWithComments.map((item) => fetchData(item))).then((res) => {
  const [post, comments] = res;

  loading.classList.toggle("hidden");

  app.innerHTML += templateArticle(post, comments);
  let articleContainer = document.querySelector(".article-comments");
  comments.forEach((comment) => {
    articleContainer.innerHTML += templateComments(comment);
  });
});

function templateArticle(post) {
  return `
    <article class="article">
        <section class="article-header">
        <h2 class="article-title">
            ${post.title}
        </h2>
        <p class="article-body">
            ${post.body}
        </p>
        </section>
        <p>Commentar:</p>
        <section class="article-comments">
            <div class="login-to-comment">Login To Comment</div>
        </section>
    </article>`;
}

function templateComments(comment) {
  return `
    <div class="user-comment">
        <div class="user-comments-profile">
        <div class="user-commetns-group">
            <div class="user-comments-avatar"></div>
            <div>
                <p class="user-comments-name">
                    ${comment.name}
                </p>
                <p class="user-comments-email">${comment.email}</p>
            </div>
        </div>
        <p class="user-comments-body">
            ${comment.body}
        </p>
        <span class="comment-reply">Reply</span
        ><span class="comment-like">Like</span
        ><span class="comment-share">Share</span>
        </div>
    </div>`;
}
