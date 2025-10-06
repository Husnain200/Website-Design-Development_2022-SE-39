// Dummy JSON data with 9 blog posts, using local image paths
const blogData = [
    {
        title: "Exploring the Mountains",
        author: "Jane Doe",
        description: "A thrilling adventure through the rugged peaks of the Rockies.",
        publishedDate: "2025-10-01",
        thumbnail: "images/mountain.jpeg",
        category: "Travel",
        readMoreLink: "/blog/exploring-the-mountains"
    },
    {
        title: "The Art of Baking",
        author: "John Smith",
        description: "Master the perfect sourdough loaf with these expert tips.",
        publishedDate: "2025-09-28",
        thumbnail: "images/baking.webp",
        category: "Food",
        readMoreLink: "/blog/the-art-of-baking"
    },
    {
        title: "City Life: A Journey",
        author: "Emily Johnson",
        description: "Discover the vibrant culture of urban living in New York.",
        publishedDate: "2025-09-20",
        thumbnail: "images/city life.webp", // renamed from "city life.webp"
        category: "Lifestyle",
        readMoreLink: "/blog/city-life-a-journey"
    },
    {
        title: "Tech Innovations 2025",
        author: "Michael Lee",
        description: "A look at the latest gadgets shaping the future.",
        publishedDate: "2025-10-05",
        thumbnail: "images/tech.webp",
        category: "Technology",
        readMoreLink: "/blog/tech-innovations-2025"
    },
    {
        title: "Healthy Living Tips",
        author: "Sarah Brown",
        description: "Simple habits to improve your daily wellness routine.",
        publishedDate: "2025-09-15",
        thumbnail: "images/OIP.webp",
        category: "Health",
        readMoreLink: "/blog/healthy-living-tips"
    },
    {
        title: "Photography Basics",
        author: "David Wilson",
        description: "Learn the fundamentals of capturing stunning photos.",
        publishedDate: "2025-10-03",
        thumbnail: "images/download.webp",
        category: "Art",
        readMoreLink: "/blog/photography-basics"
    },
    {
        title: "Sustainable Fashion",
        author: "Olivia Martinez",
        description: "How to build an eco-friendly wardrobe.",
        publishedDate: "2025-09-25",
        thumbnail: "images/fashion.webp",
        category: "Fashion",
        readMoreLink: "/blog/sustainable-fashion"
    },
    {
        title: "Home Workout Guide",
        author: "James Garcia",
        description: "Effective exercises you can do without equipment.",
        publishedDate: "2025-10-02",
        thumbnail: "images/workout.webp",
        category: "Fitness",
        readMoreLink: "/blog/home-workout-guide"
    },
    {
        title: "Book Recommendations",
        author: "Sophia Rodriguez",
        description: "Top reads for the fall season across genres.",
        publishedDate: "2025-09-30",
        thumbnail: "images/books.webp",
        category: "Books",
        readMoreLink: "/blog/book-recommendations"
    }
];

// Function to render blog cards
const renderBlogCards = (data) => {
    const blogContainer = document.getElementById('blog-container');
    const noResults = document.getElementById('no-results');

    blogContainer.innerHTML = '';
    noResults.style.display = 'none';

    if (data.length === 0) {
        noResults.style.display = 'block';
        return;
    }

    data.forEach((blog, index) => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <img src="${blog.thumbnail}" alt="${blog.title}">
            <div class="blog-card-content">
                <span class="category">${blog.category}</span>
                <h2>${blog.title}</h2>
                <p class="author">By ${blog.author}</p>
                <p class="description">${blog.description}</p>
                <p class="date">Published: ${blog.publishedDate}</p>
                <a href="${blog.readMoreLink}" class="read-more">Read More</a>
            </div>
        `;

        blogContainer.appendChild(card);
    });

    blogContainer.style.opacity = '1';
};

// Filter blogs based on search term
const filterBlogs = (searchTerm) => {
    const lowerTerm = searchTerm.toLowerCase();
    return blogData.filter(blog => 
        blog.title.toLowerCase().includes(lowerTerm) ||
        blog.author.toLowerCase().includes(lowerTerm) ||
        blog.description.toLowerCase().includes(lowerTerm) ||
        blog.category.toLowerCase().includes(lowerTerm)
    );
};

// Main render function with simulated loading
const loadAndRender = () => {
    const spinner = document.getElementById('loading-spinner');
    const blogContainer = document.getElementById('blog-container');

    spinner.style.display = 'block';
    blogContainer.style.opacity = '0';

    setTimeout(() => {
        renderBlogCards(blogData);
        spinner.style.display = 'none';
    }, 1000);
};

// Theme toggle functionality
const toggleTheme = () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

// Event listeners
document.addEventListener('DOMContentLoaded', loadAndRender);
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
document.getElementById('search-input').addEventListener('input', (e) => {
    const filtered = filterBlogs(e.target.value);
    renderBlogCards(filtered);
});
