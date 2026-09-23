import './admin.css';
import { initAdminLayout } from './sidebar.js';
import { getTours, addTour, updateTour, deleteTour } from './data-service.js';

initAdminLayout('tours', 'Quản Lý Danh Sách Tour');

const toursTbody = document.getElementById('tours-tbody');
const tourSearchInput = document.getElementById('tour-search');
const tourCategoryFilter = document.getElementById('tour-category-filter');
const modalOverlay = document.getElementById('tour-modal');
const btnOpenAddModal = document.getElementById('btn-open-add-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCancelModal = document.getElementById('btn-cancel-modal');
const tourForm = document.getElementById('tour-form');
const modalTitle = document.getElementById('modal-title');
const tourIdInput = document.getElementById('tour-id');

let currentEditingId = null;

function renderTours() {
  const allTours = getTours();
  const keyword = tourSearchInput ? tourSearchInput.value.toLowerCase().trim() : '';
  const category = tourCategoryFilter ? tourCategoryFilter.value : 'all';

  const filtered = allTours.filter(tour => {
    const matchKey = !keyword || 
      tour.title.toLowerCase().includes(keyword) || 
      tour.location.toLowerCase().includes(keyword);
    const matchCat = category === 'all' || tour.category === category;
    return matchKey && matchCat;
  });

  if (!toursTbody) return;

  if (filtered.length === 0) {
    toursTbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 3rem; color: #64748b;">Không tìm thấy tour nào phù hợp.</td></tr>`;
    return;
  }

  toursTbody.innerHTML = filtered.map(tour => {
    const categoryLabels = {
      'bien-dao': 'Biển đảo',
      'nui-rung': 'Núi rừng',
      'van-hoa': 'Văn hóa',
      'sinh-thai': 'Sinh thái'
    };

    return `
      <tr>
        <td style="width: 60px;">
          <img src="${tour.image}" alt="" style="width: 50px; height: 38px; object-fit: cover; border-radius: 4px;" />
        </td>
        <td>
          <div style="font-weight: 600; color: #0f172a;">${tour.title}</div>
          <div style="font-size: 0.75rem; color: #64748b;">ID: ${tour.id}</div>
        </td>
        <td>📍 ${tour.location}</td>
        <td><span class="badge badge-info">${categoryLabels[tour.category] || tour.category}</span></td>
        <td>⏱️ ${tour.duration}</td>
        <td><strong style="color: #2563eb;">${tour.priceFormatted}</strong></td>
        <td>
          ${tour.isHot ? '<span class="badge badge-hot">🔥 Hot</span>' : '<span style="color:#94a3b8; font-size: 0.8rem;">Thường</span>'}
        </td>
        <td>
          <div style="display: flex; gap: 0.4rem;">
            <button class="btn-admin btn-admin-outline btn-admin-sm btn-edit" data-id="${tour.id}">✏️ Sửa</button>
            <button class="btn-admin btn-admin-danger btn-admin-sm btn-delete" data-id="${tour.id}">🗑️ Xóa</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Attach Edit Events
  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      openEditModal(id);
    });
  });

  // Attach Delete Events
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Bạn có chắc chắn muốn xóa tour này khỏi danh sách?')) {
        deleteTour(id);
        renderTours();
      }
    });
  });
}

function openAddModal() {
  currentEditingId = null;
  modalTitle.textContent = 'Thêm Tour Mới';
  tourForm.reset();
  tourIdInput.value = '';
  modalOverlay.classList.add('show');
}

function openEditModal(id) {
  const tours = getTours();
  const tour = tours.find(t => t.id === Number(id));
  if (!tour) return;

  currentEditingId = id;
  modalTitle.textContent = 'Chỉnh Sửa Thông Tin Tour';
  tourIdInput.value = tour.id;
  document.getElementById('tour-title').value = tour.title;
  document.getElementById('tour-location').value = tour.location;
  document.getElementById('tour-category').value = tour.category;
  document.getElementById('tour-duration').value = tour.duration;
  document.getElementById('tour-price').value = tour.price;
  document.getElementById('tour-image').value = tour.image;
  document.getElementById('tour-description').value = tour.description || '';
  document.getElementById('tour-hot').checked = !!tour.isHot;

  modalOverlay.classList.add('show');
}

function closeModal() {
  modalOverlay.classList.remove('show');
  currentEditingId = null;
}

// Event Listeners
if (btnOpenAddModal) btnOpenAddModal.addEventListener('click', openAddModal);
if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
if (btnCancelModal) btnCancelModal.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

if (tourForm) {
  tourForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('tour-title').value;
    const location = document.getElementById('tour-location').value;
    const category = document.getElementById('tour-category').value;
    const duration = document.getElementById('tour-duration').value;
    const price = Number(document.getElementById('tour-price').value);
    const image = document.getElementById('tour-image').value || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
    const description = document.getElementById('tour-description').value;
    const isHot = document.getElementById('tour-hot').checked;

    const tourPayload = {
      title,
      location,
      category,
      duration,
      price,
      image,
      description,
      isHot
    };

    if (currentEditingId) {
      updateTour(currentEditingId, tourPayload);
    } else {
      addTour(tourPayload);
    }

    closeModal();
    renderTours();
  });
}

if (tourSearchInput) tourSearchInput.addEventListener('input', renderTours);
if (tourCategoryFilter) tourCategoryFilter.addEventListener('change', renderTours);

// Initial Load
renderTours();
