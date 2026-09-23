import './admin.css';
import { initAdminLayout } from './sidebar.js';
import { getStats, getBookings, getTours, updateBookingStatus } from './data-service.js';

initAdminLayout('dashboard', 'Tổng Quan Hoạt Động');

function renderDashboard() {
  const stats = getStats();
  
  // Render Stat Cards
  const statsContainer = document.getElementById('dashboard-stats');
  if (statsContainer) {
    statsContainer.innerHTML = `
      <div class="stat-card">
        <div class="stat-icon blue">🗺️</div>
        <div class="stat-details">
          <label>Tổng Số Tour</label>
          <strong>${stats.totalTours}</strong>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon amber">⏳</div>
        <div class="stat-details">
          <label>Đơn Chờ Duyệt</label>
          <strong>${stats.pendingBookings}</strong>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">📝</div>
        <div class="stat-details">
          <label>Tổng Lượt Đặt</label>
          <strong>${stats.totalBookings}</strong>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple">💰</div>
        <div class="stat-details">
          <label>Doanh Thu Đã Duyệt</label>
          <strong>${stats.totalRevenue.toLocaleString('vi-VN')} đ</strong>
        </div>
      </div>
    `;
  }

  // Render Recent Bookings Table
  const recentBookings = getBookings().slice(0, 5);
  const bookingsTableBody = document.getElementById('recent-bookings-tbody');
  if (bookingsTableBody) {
    if (recentBookings.length === 0) {
      bookingsTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem; color: #64748b;">Chưa có đơn đặt tour nào</td></tr>`;
    } else {
      bookingsTableBody.innerHTML = recentBookings.map(b => {
        const statusBadge = b.status === 'confirmed' 
          ? '<span class="badge badge-success">Đã duyệt</span>' 
          : b.status === 'pending' 
          ? '<span class="badge badge-warning">Chờ duyệt</span>' 
          : '<span class="badge badge-danger">Đã hủy</span>';

        return `
          <tr>
            <td><strong>#${b.id}</strong></td>
            <td>
              <div><strong>${b.customerName}</strong></div>
              <div style="font-size: 0.75rem; color: #64748b;">${b.phone}</div>
            </td>
            <td>${b.tourTitle}</td>
            <td>${b.departDate}</td>
            <td><strong>${(b.totalPrice || 0).toLocaleString('vi-VN')} đ</strong></td>
            <td>${statusBadge}</td>
          </tr>
        `;
      }).join('');
    }
  }

  // Render Top Tours Summary
  const topTours = getTours().slice(0, 4);
  const topToursTbody = document.getElementById('top-tours-tbody');
  if (topToursTbody) {
    topToursTbody.innerHTML = topTours.map(t => `
      <tr>
        <td style="width: 50px;">
          <img src="${t.image}" alt="" style="width: 44px; height: 36px; object-fit: cover; border-radius: 4px;" />
        </td>
        <td>
          <strong>${t.title}</strong>
          <div style="font-size: 0.75rem; color: #64748b;">📍 ${t.location} | ⏱️ ${t.duration}</div>
        </td>
        <td><strong style="color: #2563eb;">${t.priceFormatted}</strong></td>
        <td><span style="color: #f59e0b; font-weight: bold;">★ ${t.rating}</span></td>
      </tr>
    `).join('');
  }
}

renderDashboard();
