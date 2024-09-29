fetch('posts.json')
    .then(response => response.json())
    .then(posts => {
        const postsContainer = document.getElementById('posts-area');

        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <img src="${post.featured_image}" alt="${post.title}">
                <p>${post.summary}</p>
                <div>
                    <p>Data: ${post.publication_date}</p>
                    <p>Tags: ${post.tags.join(', ')}</p>
                </div>
            `;

            postElement.addEventListener('click', () => {
                window.location.href = `details.html?index=${index}`;
            });

            postsContainer.appendChild(postElement);
        });
    });

