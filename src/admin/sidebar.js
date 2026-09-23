/**
 * Initializes Admin Sidebar and Topbar
 * @param {string} activePage - 'dashboard' | 'tours' | 'bookings'
 * @param {string} title - Title of current page
 */
export function initAdminLayout(activePage = 'dashboard', title = 'Bảng Điều Khiển') {
  const sidebarContainer = document.getElementById('admin-sidebar-container');
  const topbarContainer = document.getElementById('admin-topbar-container');

  if (sidebarContainer) {
    sidebarContainer.innerHTML = `
      <aside class="admin-sidebar" id="admin-sidebar">
        <a href="/admin/index.html" class="sidebar-brand">
          <span>✈️ Viet<mark>Tour</mark></span>
          <span style="font-size: 0.75rem; background: #3b82f6; padding: 2px 6px; border-radius: 4px; font-weight: normal;">Admin</span>
        </a>

        <ul class="sidebar-menu">
          <li class="sidebar-label">Quản trị hệ thống</li>
          <li>
            <a href="/admin/index.html" class="${activePage === 'dashboard' ? 'active' : ''}">
              <span class="menu-icon">📊</span>
              <span>Tổng quan</span>
            </a>
          </li>
          <li>
            <a href="/admin/tours.html" class="${activePage === 'tours' ? 'active' : ''}">
              <span class="menu-icon">🗺️</span>
              <span>Quản lý Tour</span>
            </a>
          </li>
          <li>
            <a href="/admin/bookings.html" class="${activePage === 'bookings' ? 'active' : ''}">
              <span class="menu-icon">📝</span>
              <span>Đơn đặt tour</span>
            </a>
          </li>
        </ul>

        <div class="sidebar-footer">
          <a href="/index.html">
            <span>🌐</span>
            <span>Quay về trang khách</span>
          </a>
        </div>
      </aside>
    `;
  }

  if (topbarContainer) {
    topbarContainer.innerHTML = `
      <header class="admin-topbar">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <button class="mobile-sidebar-toggle" id="mobile-sidebar-btn" aria-label="Toggle Sidebar">☰</button>
          <div class="topbar-title">${title}</div>
        </div>
        <div class="topbar-actions">
          <a href="/tours.html" target="_blank" class="btn-admin btn-admin-outline btn-admin-sm">
            <span>👁️ Xem web khách</span>
          </a>
          <div class="topbar-user">
            <div class="topbar-avatar">A</div>
            <span>Quản trị viên</span>
          </div>
        </div>
      </header>
    `;

    // Toggle sidebar on mobile
    const toggleBtn = document.getElementById('mobile-sidebar-btn');
    const sidebar = document.getElementById('admin-sidebar');
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }
  }
}
