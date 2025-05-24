function loadMarkdownPost(filename, containerId) {
    fetch(filename)
      .then(res => {
        if (!res.ok) throw new Error("Post not found");
        return res.text();
      })
      .then(md => {
        const html = marked.parse(md);
        document.getElementById(containerId).innerHTML = html;
      })
      .catch(err => {
        document.getElementById(containerId).innerHTML = "<p>Post not found.</p>";
        console.error(err);
      });
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const postFile = urlParams.get("post");
  
  if (postFile) {
    loadMarkdownPost(`posts/${postFile}.md`, "post-content");
  } else {
    document.getElementById("post-content").innerHTML = "<p>No post selected.</p>";
  }
  