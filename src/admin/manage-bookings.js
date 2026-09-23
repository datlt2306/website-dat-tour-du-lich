import './admin.css';
import { initAdminLayout } from './sidebar.js';
import { getBookings, updateBookingStatus, deleteBooking } from './data-service.js';

initAdminLayout('bookings', 'Quản Lý Đơn Đặt Tour');

const bookingsTbody = document.getElementById('bookings-tbody');
const bookingSearchInput = document.getElementById('booking-search');
const bookingStatusFilter = document.getElementById('booking-status-filter');

function renderBookings() {
  const allBookings = getBookings();
  const keyword = bookingSearchInput ? bookingSearchInput.value.toLowerCase().trim() : '';
  const statusFilter = bookingStatusFilter ? bookingStatusFilter.value : 'all';

  const filtered = allBookings.filter(b => {
    const matchKeyword = !keyword ||
      b.id.toLowerCase().includes(keyword) ||
      b.customerName.toLowerCase().includes(keyword) ||
      b.phone.toLowerCase().includes(keyword) ||
      b.tourTitle.toLowerCase().includes(keyword);

    const matchStatus = statusFilter === 'all' || b.status === statusFilter;

    return matchKeyword && matchStatus;
  });

  if (!bookingsTbody) return;

  if (filtered.length === 0) {
    bookingsTbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 3rem; color: #64748b;">Không tìm thấy đơn đặt tour nào phù hợp.</td></tr>`;
    return;
  }

  bookingsTbody.innerHTML = filtered.map(b => {
    let statusBadge = '';
    if (b.status === 'confirmed') {
      statusBadge = '<span class="badge badge-success">Đã duyệt</span>';
    } else if (b.status === 'pending') {
      statusBadge = '<span class="badge badge-warning">Chờ duyệt</span>';
    } else {
      statusBadge = '<span class="badge badge-danger">Đã hủy</span>';
    }

    return `
      <tr>
        <td><strong>#${b.id}</strong></td>
        <td>
          <div style="font-weight: 600; color: #0f172a;">${b.customerName}</div>
          <div style="font-size: 0.78rem; color: #64748b;">📞 ${b.phone}</div>
          <div style="font-size: 0.75rem; color: #94a3b8;">✉️ ${b.email}</div>
        </td>
        <td>
          <div style="max-width: 260px; font-weight: 500;">${b.tourTitle}</div>
          <div style="font-size: 0.75rem; color: #64748b;">Khởi hành: 📅 ${b.departDate}</div>
        </td>
        <td style="text-align: center;"><strong>${b.guests}</strong> khách</td>
        <td><strong style="color: #2563eb;">${(b.totalPrice || 0).toLocaleString('vi-VN')} đ</strong></td>
        <td>${statusBadge}</td>
        <td>
          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
            ${b.status !== 'confirmed' ? `
              <button class="btn-admin btn-admin-success btn-admin-sm btn-approve" data-id="${b.id}" title="Xác nhận đơn">
                ✓ Duyệt
              </button>
            ` : ''}
            ${b.status !== 'cancelled' ? `
              <button class="btn-admin btn-admin-danger btn-admin-sm btn-cancel" data-id="${b.id}" title="Hủy đơn">
                ✕ Hủy
              </button>
            ` : ''}
            <button class="btn-admin btn-admin-outline btn-admin-sm btn-delete-booking" data-id="${b.id}" title="Xóa">
              🗑️
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Event handlers for approve, cancel, delete
  document.querySelectorAll('.btn-approve').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      updateBookingStatus(id, 'confirmed');
      renderBookings();
    });
  });

  document.querySelectorAll('.btn-cancel').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Bạn có chắc muốn hủy đơn đặt này?')) {
        updateBookingStatus(id, 'cancelled');
        renderBookings();
      }
    });
  });

  document.querySelectorAll('.btn-delete-booking').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Xóa hoàn toàn đơn này khỏi hệ thống?')) {
        deleteBooking(id);
        renderBookings();
      }
    });
  });
}

if (bookingSearchInput) bookingSearchInput.addEventListener('input', renderBookings);
if (bookingStatusFilter) bookingStatusFilter.addEventListener('change', renderBookings);

renderBookings();
