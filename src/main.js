import './style.css';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { TOURS_DATA } from './data/tours.js';

// Initialize Navbar and Footer for Home Page
renderNavbar('home');
renderFooter();

// Render Featured Tours on Home Page
const featuredContainer = document.getElementById('home-featured-tours');
if (featuredContainer) {
  // Take top 3 or 4 tours
  const featuredTours = TOURS_DATA.slice(0, 3);
  
  featuredContainer.innerHTML = featuredTours.map(tour => `
    <article class="tour-card">
      <div class="tour-thumb">
        <img src="${tour.image}" alt="${tour.title}" loading="lazy" />
        <span class="tour-tag">📍 ${tour.location}</span>
        ${tour.isHot ? '<span class="tour-badge-hot">🔥 HOT</span>' : ''}
      </div>
      <div class="tour-body">
        <div class="tour-meta">
          <span class="tour-meta-item">⏱️ ${tour.duration}</span>
          <span class="tour-meta-item" style="color: var(--gold); font-weight: 700;">★ ${tour.rating} (${tour.reviews})</span>
        </div>
        <h3 class="tour-title">${tour.title}</h3>
        <p class="tour-desc">${tour.description}</p>
        <div class="tour-footer">
          <div class="tour-price">
            <label>Giá chỉ từ</label>
            <strong>${tour.priceFormatted}</strong>
          </div>
          <a href="/tours.html?id=${tour.id}" class="btn btn-primary btn-sm">Chi Tiết</a>
        </div>
      </div>
    </article>
  `).join('');
}
