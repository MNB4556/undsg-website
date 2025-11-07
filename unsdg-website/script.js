// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      navLinks.classList.remove('active');
    }
  });
});

// News Data
const newsArticles = [
  {
    id: 1,
    title: "Solar Energy Breaks New Records in 2024",
    content: "Renewable energy installations have reached unprecedented levels, with solar power leading the charge. This marks a significant milestone in our journey toward sustainable energy.",
    category: "energy",
    date: "2024-01-15"
  },
  {
    id: 2,
    title: "Global Climate Summit Reaches Historic Agreement",
    content: "World leaders have committed to ambitious new targets for carbon reduction, setting the stage for a more sustainable future across all nations.",
    category: "climate",
    date: "2024-01-12"
  },
  {
    id: 3,
    title: "New Wind Farm Powers 50,000 Homes",
    content: "The largest offshore wind farm in the region is now operational, providing clean energy to thousands of households and reducing carbon emissions significantly.",
    category: "energy",
    date: "2024-01-10"
  },
  {
    id: 4,
    title: "Innovative Battery Technology Extends Renewable Energy Storage",
    content: "Breakthrough in battery technology allows for longer storage of renewable energy, solving one of the biggest challenges in sustainable energy adoption.",
    category: "technology",
    date: "2024-01-08"
  },
  {
    id: 5,
    title: "Cities Commit to Net Zero by 2030",
    content: "Over 100 major cities worldwide have pledged to achieve net-zero emissions by 2030, implementing comprehensive climate action plans.",
    category: "climate",
    date: "2024-01-05"
  },
  {
    id: 6,
    title: "Electric Vehicle Adoption Surges 40%",
    content: "Sales of electric vehicles have increased dramatically, with improved charging infrastructure and government incentives driving the change.",
    category: "technology",
    date: "2024-01-03"
  }
];

// Display news articles
function displayNews(filter = 'all') {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';

  const filteredNews = filter === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === filter);

  filteredNews.forEach(article => {
    const newsCard = document.createElement('div');
    newsCard.className = 'news-card active';
    newsCard.innerHTML = `
      <div class="news-card-image">🌱</div>
      <div class="news-card-content">
        <span class="category">${article.category}</span>
        <h3>${article.title}</h3>
        <p>${article.content}</p>
        <span class="date">${formatDate(article.date)}</span>
      </div>
    `;
    newsContainer.appendChild(newsCard);
  });
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    displayNews(btn.dataset.filter);
  });
});

// Contact form
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for your message! We will get back to you soon.');
  e.target.reset();
});

// Initialize
displayNews();

// Add scroll animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.stat-card, .action-card, .news-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s, transform 0.6s';
  observer.observe(card);
});

