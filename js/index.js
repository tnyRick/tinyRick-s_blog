let allPosts = [];
let activeTag = '';

document.addEventListener('DOMContentLoaded', () => {
  const filterInput = document.getElementById('filterInput');
  const blogList = document.getElementById('blog-list');
  const tagContainer = document.getElementById('tag-filter');

  fetch('posts/posts.json')
    .then(res => res.json())
    .then(data => {
      allPosts = data;
      renderTagOptions(allPosts);
      renderPosts(allPosts);
    });

  // Search filter
  filterInput.addEventListener('input', () => {
    const keyword = filterInput.value.toLowerCase();
    const filtered = allPosts.filter(post =>
      post.title.toLowerCase().includes(keyword) ||
      post.preview.toLowerCase().includes(keyword)
    ).filter(tagFilter);
    renderPosts(filtered);
  });

  function tagFilter(post) {
    return !activeTag || post.tags.includes(activeTag);
  }

  function renderPosts(posts) {
    blogList.innerHTML = '';
    posts.forEach(post => {
      const div = document.createElement('div');
      div.className = 'blog-preview';
      div.innerHTML = `
        <h2><a href="posts/${post.file}">${post.title}</a></h2>
        <p>${post.preview}</p>
        <div class="tags">${post.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}</div>
      `;
      blogList.appendChild(div);
    });

    // Re-bind tag click listeners
    document.querySelectorAll('.tag').forEach(tagElem => {
      tagElem.addEventListener('click', (e) => {
        activeTag = e.target.textContent;
        filterInput.dispatchEvent(new Event('input')); // Re-filter
        highlightActiveTag();
      });
    });
  }

  function renderTagOptions(posts) {
    const allTags = [...new Set(posts.flatMap(p => p.tags))].sort();
    tagContainer.innerHTML = allTags.map(tag =>
      `<button class="tag-filter-btn" data-tag="${tag}">${tag}</button>`
    ).join(' ');

    document.querySelectorAll('.tag-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const clickedTag = btn.dataset.tag;
            activeTag = (activeTag === clickedTag) ? '' : clickedTag;
            filterInput.dispatchEvent(new Event('input'));
            highlightActiveTag();
          });
          
    });
  }

  function highlightActiveTag() {
    document.querySelectorAll('.tag-filter-btn').forEach(btn => {
      btn.classList.toggle('active-tag', btn.dataset.tag === activeTag);
    });
  }
});
