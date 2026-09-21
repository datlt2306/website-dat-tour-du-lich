import '../style.css';
import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { TOURS_DATA } from '../data/tours.js';

renderNavbar('tours');
renderFooter();

// Filtering and Sorting logic
const toursContainer = document.getElementById('tours-list-container');
const filterKeywordInput = document.getElementById('filter-keyword');
const filterCategorySelect = document.getElementById('filter-category');
const filterSortSelect = document.getElementById('filter-sort');
const resetBtn = document.getElementById('reset-filter-btn');

// Read URL Params if coming from hero search
const urlParams = new URLSearchParams(window.location.search);
const destinationParam = urlParams.get('destination') || '';
const categoryParam = urlParams.get('category') || '';
const maxPriceParam = urlParams.get('maxPrice') ? Number(urlParams.get('maxPrice')) : 0;

if (destinationParam && filterKeywordInput) {
  filterKeywordInput.value = destinationParam;
}
if (categoryParam && filterCategorySelect) {
  filterCategorySelect.value = categoryParam;
}

function renderToursList() {
  if (!toursContainer) return;

  const keyword = filterKeywordInput ? filterKeywordInput.value.toLowerCase().trim() : '';
  const category = filterCategorySelect ? filterCategorySelect.value : 'all';
  const sort = filterSortSelect ? filterSortSelect.value : 'default';

  let filtered = TOURS_DATA.filter(tour => {
    // Search keyword
    const matchKeyword = !keyword || 
      tour.title.toLowerCase().includes(keyword) || 
      tour.location.toLowerCase().includes(keyword) || 
      tour.description.toLowerCase().includes(keyword);

    // Category
    const matchCategory = category === 'all' || tour.category === category;

    // Max Price param filter
    const matchPrice = !maxPriceParam || tour.price <= maxPriceParam;

    return matchKeyword && matchCategory && matchPrice;
  });

  // Sort
  if (sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (filtered.length === 0) {
    toursContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: white; border-radius: 1rem; box-shadow: var(--shadow-sm);">
        <p style="font-size: 3rem; margin-bottom: 0.5rem;">🔍</p>
        <h3 style="font-size: 1.25rem; color: var(--dark); margin-bottom: 0.5rem;">Không tìm thấy tour phù hợp</h3>
        <p style="color: var(--gray-500);">Vui lòng thử tìm kiếm lại với từ khóa hoặc bộ lọc khác.</p>
      </div>
    `;
    return;
  }

  toursContainer.innerHTML = filtered.map(tour => `
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
          <button class="btn btn-primary btn-sm" onclick="alert('Đã chọn đặt tour: ${tour.title}. Đội ngũ tư vấn sẽ hỗ trợ bạn!')">Đặt Tour</button>
        </div>
      </div>
    </article>
  `).join('');
}

// Event Listeners
if (filterKeywordInput) filterKeywordInput.addEventListener('input', renderToursList);
if (filterCategorySelect) filterCategorySelect.addEventListener('change', renderToursList);
if (filterSortSelect) filterSortSelect.addEventListener('change', renderToursList);

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    if (filterKeywordInput) filterKeywordInput.value = '';
    if (filterCategorySelect) filterCategorySelect.value = 'all';
    if (filterSortSelect) filterSortSelect.value = 'default';
    renderToursList();
  });
}

// Initial render
renderToursList();
