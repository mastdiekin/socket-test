var socket = io();
var postsTable = document.querySelector("#here");

var Posts = {
  getPosts: async function () {
    try {
      var response = await fetch("/posts", {
        method: "post",
      });
      return await response.json();
    } catch (error) {
      console.error("Ошибка:", error);
    }
  },

  renderSinglePost: function (post, error) {
    if (error) return `<tr><td><div class="error">${error}</div></td></tr>`;
    return `
      <tr>
        <th scope="row">${post.id}</th>
        <td>${post.title}</td>
        <td>${post.content}</td>
      </tr>
    `;
  },

  newPost: async function () {
    var form = document.getElementById("form");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      var title = document.getElementById("title").value;
      var content = document.getElementById("content").value;

      if (!title || !content) {
        alert("title and content requeries");
        return false;
      }

      var data = { title, content };
      try {
        var newPost = await fetch("/", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (newPost.status === 200) {
          form.reset();
          alert("Добавлено!");
        } else {
          alert(newPost.statusText);
        }
      } catch (error) {
        console.error(error.message);
      }
      return;
    });
  },

  renderPosts: async function () {
    var posts = await this.getPosts();
    var th = this;

    if (posts) {
      posts.map(function (post) {
        postsTable.innerHTML += th.renderSinglePost(post);
      });
    } else {
      postsTable.innerHTML = th.renderSinglePost(
        false,
        `Ошибка, посты не найдены.`
      );
    }
  },

  initSockets: function () {
    socket.on("newpost", (post) => {
      postsTable.innerHTML += this.renderSinglePost(post);
    });
  },

  init: function () {
    this.newPost();
    this.renderPosts();
    this.initSockets();
  },
};
