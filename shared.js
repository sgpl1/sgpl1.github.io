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

    // Blog post data for dynamic loading
    const blogPostsData = [
        {
            date: '2026-06-05',
            tags: ['Python', '元编程'],
            title: '黑魔法：利用 AST 与元编程实现运行时代码注入',
            summary: '深入 Python 抽象语法树（AST），探索如何在不修改源码的前提下，在运行时动态重写函数逻辑与字节码注入...',
            link: 'blog.html#post1'
        },
        {
            date: '2026-06-05',
            tags: ['异步编程', '底层原理'],
            title: '手写事件循环：从零实现 Python 异步协程调度器',
            summary: '抛弃 asyncio！利用 Python 生成器、yield from 以及 select 模块，硬核复刻一个高性能的异步事件循环...',
            link: 'blog.html#post2'
        },
        {
            date: '2026-06-05',
            tags: ['内存管理', 'CPython'],
            title: '内存炼金术：Python 垃圾回收机制与引用计数深潜',
            summary: '很多人说 Python 有垃圾回收（GC），所以不需要关心内存。但在处理海量数据或高频长连接服务时，不合理的内存占用会导致 OOM（内存溢出）。本文带你深潜 CPython 源码，剖析 Python 内存管理的底层逻辑。',
            link: 'blog.html#post3'
        }
        // Add more blog posts here as needed
    ];

    // Function to load latest blog posts for index page
    function loadLatestBlogPosts() {
        const latestPostsGrid = document.getElementById('latest-posts-grid');
        if (!latestPostsGrid) return;

        // Display up to 2 latest posts on the index page
        const postsToShow = blogPostsData.slice(0, 2); 

        let postsHtml = '';
        postsToShow.forEach(post => {
            const tagsHtml = post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('');
            postsHtml += `
                <article class="post-card">
                    <div class="post-meta">
                        <span class="post-date">${post.date}</span>
                        ${tagsHtml}
                    </div>
                    <h3><a href="${post.link}">${post.title}</a></h3>
                    <p>${post.summary}</p>
                    <a href="${post.link}" class="read-more">阅读全文 &rarr;</a>
                </article>
            `;
        });
        latestPostsGrid.innerHTML = postsHtml;
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
    
    // Load latest blog posts only on the index page
    if (currentPage === 'index') {
        loadLatestBlogPosts();
    }
});
