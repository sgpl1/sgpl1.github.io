document.addEventListener('DOMContentLoaded', () => {
    // Function to load the navigation bar
    function loadNavbar(currentPage) {
        const navbarHtml = `
            <nav class="navbar">
                <div class="container nav-container">
                    <div class="logo">TokiFloat<span class="logo-dot">.dev</span></div>
                    <ul class="nav-links">
                        <li><a href="index.html" class="${currentPage === 'index' ? 'active' : ''}">首页</a></li>
                        <li><a href="blog.html" class="${currentPage === 'blog' ? 'active' : ''}">博客</a></li>
                        <li><a href="projects.html" class="${currentPage === 'projects' ? 'active' : ''}">项目</a></li>
                    </ul>
                </div>
            </nav>
        `;
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (navbarPlaceholder) {
            navbarPlaceholder.innerHTML = navbarHtml;
        }
    }

    // Function to load the footer
    function loadFooter() {
        const footerHtml = `
            <footer>
                <div class="container footer-container">
                    <p>&copy; 2026 TokiFloat. Designed &amp; Built with ❤️</p>
                    <p class="footer-sub">用代码连接世界，保持热爱，奔赴山海。</p>
                </div>
            </footer>
        `;
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = footerHtml;
        }
    }

    // Function to load random anime image from nekos.best
    async function loadRandomAnimeImage() {
        const imgElements = document.querySelectorAll('.hero-anime-img');
        if (imgElements.length === 0) return;

        try {
            const response = await fetch('https://nekos.best/api/v2/neko');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.results && data.results.length > 0 && data.results[0].url) {
                const imageUrl = data.results[0].url;
                imgElements.forEach(img => {
                    img.src = imageUrl;
                });
            } else {
                console.warn('Nekos.best API did not return a valid image URL.');
                // Fallback to a default image if API returns invalid data
                imgElements.forEach(img => {
                    img.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                });
            }
        } catch (error) {
            console.error('Failed to fetch random anime image:', error);
            // Fallback to a default image if API call fails
            imgElements.forEach(img => {
                img.src = 'https://via.placeholder.com/300x200?text=Image+Error';
            });
        }
    }

    // Determine current page and load shared content
    const path = window.location.pathname;
    let currentPage = ''; // Initialize as empty
    if (path.includes('index.html') || path === '/') { // Handle root path for index.html
        currentPage = 'index';
    } else if (path.includes('blog.html')) {
        currentPage = 'blog';
    } else if (path.includes('projects.html')) {
        currentPage = 'projects';
    }

    loadNavbar(currentPage);
    loadFooter();
    loadRandomAnimeImage();
});
