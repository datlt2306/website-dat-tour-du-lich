/**
 * Render Footer Component
 */
export function renderFooter() {
  const footerElem = document.getElementById('site-footer');
  if (!footerElem) return;

  footerElem.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="brand-logo" style="color: white; margin-bottom: 1rem;">
            <div class="logo-icon">✈️</div>
            <span>Viet<mark>Tour</mark></span>
          </div>
          <p style="font-size: 0.9rem; margin-bottom: 1.5rem; line-height: 1.7;">
            VietTour - Công ty lữ hành hàng đầu Việt Nam. Chúng tôi cam kết mang đến những hành trình trải nghiệm đẳng cấp, an toàn và lưu giữ ký ức tuyệt vời.
          </p>
        </div>

        <div class="footer-col">
          <h4>Trang Chính</h4>
          <ul class="footer-links">
            <li><a href="/index.html">Trang chủ</a></li>
            <li><a href="/gioi-thieu.html">Giới thiệu về chúng tôi</a></li>
            <li><a href="/tours.html">Danh sách Tour du lịch</a></li>
            <li><a href="/lien-he.html">Liên hệ tư vấn</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Điểm Đến Hot</h4>
          <ul class="footer-links">
            <li><a href="/tours.html?destination=ha-long">Vịnh Hạ Long</a></li>
            <li><a href="/tours.html?destination=phu-quoc">Đảo Ngọc Phú Quốc</a></li>
            <li><a href="/tours.html?destination=da-nang">Đà Nẵng - Hội An</a></li>
            <li><a href="/tours.html?destination=sapa">Sa Pa - Lào Cai</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Đăng Ký Nhận Tin</h4>
          <p style="font-size: 0.85rem; margin-bottom: 1rem;">
            Nhận mã giảm giá 15% cho chuyến đi đầu tiên và ưu đãi hot hàng tuần.
          </p>
          <form id="newsletter-form" style="display: flex; gap: 0.5rem;" onsubmit="event.preventDefault(); alert('Cảm ơn bạn đã đăng ký nhận thông tin!');">
            <input type="email" placeholder="Email của bạn..." required class="form-control" style="font-size: 0.85rem; padding: 0.6rem;" />
            <button type="submit" class="btn btn-accent btn-sm">Gửi</button>
          </form>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© ${new Date().getFullYear()} VietTour. Tất cả quyền được bảo lưu.</p>
        <p>Thiết kế với ❤️ cho trải nghiệm du lịch Việt Nam</p>
      </div>
    </div>
  `;
}
