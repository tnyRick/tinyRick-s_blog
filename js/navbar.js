document.addEventListener('DOMContentLoaded', () => {
    fetch('navbar.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
        highlightActiveLink();
      })
      .catch(err => console.error('Failed to load navbar:', err));
  
    function highlightActiveLink() {
      const links = document.querySelectorAll('#navbar-placeholder ul li a');
      const currentPath = window.location.pathname.split('/').pop();
      links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
          link.classList.add('active');
        }
      });
    }
  });
  