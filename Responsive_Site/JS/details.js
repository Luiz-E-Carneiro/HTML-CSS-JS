const urlParams = new URLSearchParams(window.location.search);
const postIndex = urlParams.get('index');

fetch('posts.json')
    .then(response => response.json())
    .then(posts => {
        const post = posts[postIndex];

        document.getElementById('post-title').innerText = post.title;
        document.getElementById('post-date').innerText = `Data de Publicação: ${post.publication_date}`;
        document.getElementById('post-tags').innerText = `Tags: ${post.tags.join(', ')}`;
        document.getElementById('featured-image').src = post.featured_image;
        document.getElementById('full-text').innerText = post.full_text;

        const complementaryImagesContainer = document.getElementById('complementary-images');
        post.complementary_images.forEach(image => {
            const img = document.createElement('img');
            img.src = image;
            complementaryImagesContainer.appendChild(img);
        });
    });
