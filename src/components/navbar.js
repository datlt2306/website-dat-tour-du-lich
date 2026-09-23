/**
 * Render Navbar Component and set active tab
 * @param {string} activePage - Name of the active page ('home', 'about', 'tours', 'contact')
 */
export function renderNavbar(activePage = 'home') {
  const headerElem = document.getElementById('site-header');
  if (!headerElem) return;

  headerElem.innerHTML = `
    <div class="container">
      <nav class="navbar">
        <a href="/index.html" class="brand-logo">
          <div class="logo-icon">✈️</div>
          <span>Viet<mark>Tour</mark></span>
        </a>
        
        <ul class="nav-menu" id="nav-menu">
          <li>
            <a href="/index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Trang chủ</a>
          </li>
          <li>
            <a href="/gioi-thieu.html" class="nav-link ${activePage === 'about' ? 'active' : ''}">Giới thiệu</a>
          </li>
          <li>
            <a href="/tours.html" class="nav-link ${activePage === 'tours' ? 'active' : ''}">Danh sách Tour</a>
          </li>
          <li>
            <a href="/lien-he.html" class="nav-link ${activePage === 'contact' ? 'active' : ''}">Liên hệ</a>
          </li>
        </ul>

        <div class="nav-actions">
          <a href="/admin/index.html" class="btn btn-outline btn-sm" style="margin-right: 0.25rem;">⚙️ Quản trị</a>
          <a href="/tours.html" class="btn btn-primary btn-sm">Đặt Tour Ngay</a>
          <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle Menu">
            ☰
          </button>
        </div>
      </nav>
    </div>
  `;

  // Mobile Menu Toggle logic
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Scroll header effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      headerElem.classList.add('scrolled');
    } else {
      headerElem.classList.remove('scrolled');
    }
  });
}
