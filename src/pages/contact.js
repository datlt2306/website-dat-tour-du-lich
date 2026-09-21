import '../style.css';
import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';

renderNavbar('contact');
renderFooter();

const contactForm = document.getElementById('contact-form');
const toastContainer = document.getElementById('contact-toast-container');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;

    if (toastContainer) {
      toastContainer.innerHTML = `
        <div class="toast-success">
          <span style="font-size: 1.25rem;">✅</span>
          <div>
            <strong>Gửi tư vấn thành công!</strong>
            <p style="font-size: 0.85rem; margin-top: 0.2rem;">Cảm ơn ${name} (${email}). Chúng tôi sẽ liên hệ lại với bạn trong vòng 15 phút.</p>
          </div>
        </div>
      `;
    }

    contactForm.reset();
  });
}
