let imageList = [];
let currentImageIndex = 0;

    // Modo oscuro con localStorage
    const darkToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    function applyTheme(theme) {
      if(theme === 'dark'){
        body.classList.add('dark');
        darkToggle.textContent = 'Modo claro';
      } else {
        body.classList.remove('dark');
        darkToggle.textContent = 'Modo oscuro';
      }
    }

    // Inicializamos tema con lo guardado o default light
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    darkToggle.addEventListener('click', () => {
      const isDark = body.classList.toggle('dark');
      applyTheme(isDark ? 'dark' : 'light');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Modal funcionalidad
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalCloseBtn = modalOverlay.querySelector('.modal-close');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDesc = document.getElementById('modal-desc');
    const modalBuyBtn = document.getElementById('modal-buy-btn');
    const modalReviews = document.getElementById('modal-reviews');

    // Abrir modal con info producto
    function openModal(card) {
      const name = card.dataset.name;
      const price = card.dataset.price;
      const desc = card.dataset.desc;
      const imgSrc = card.dataset.img;
      const reviews = JSON.parse(card.dataset.reviews);

      modalImg.src = imgSrc;
      modalImg.alt = name;
      modalTitle.textContent = name;
      modalPrice.textContent = `$${price} DO`;
      modalDesc.textContent = desc;

      // Reviews
      modalReviews.innerHTML = '<h4>Opiniones de clientes</h4>';
      reviews.forEach(r => {
        const reviewEl = document.createElement('div');
        reviewEl.classList.add('review');
        reviewEl.innerHTML = `
          <div class="stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div>
          <div class="comment">${r.comment}</div>
        `;
        modalReviews.appendChild(reviewEl);
      });

      modalBuyBtn.href = `https://wa.me/52XXXXXXXXXX?text=Hola,%20quiero%20comprar%20el%20producto:%20${encodeURIComponent(name)}`;

      modalOverlay.hidden = false;
      modalOverlay.classList.add('active');
      modalCloseBtn.focus();
    }

    // Cerrar modal
    function closeModal() {
      modalOverlay.classList.remove('active');
      setTimeout(() => {
        modalOverlay.hidden = true;
      }, 300);
    }

    // Eventos
    document.querySelectorAll('.card .btn-buy').forEach(btn => {
      btn.addEventListener('click', e => {
        const card = e.target.closest('.card');
        openModal(card);
      });
      
    });
    
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', e => {
      if(e.target === modalOverlay) closeModal();
    });
    // Cerrar con tecla Escape
    document.addEventListener('keydown', e => {
      if(e.key === 'Escape' && !modalOverlay.hidden){
        closeModal();
      }
    });
    const buttons = document.querySelectorAll('.filter-btn');
const sections = document.querySelectorAll('.product-category');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Desactivar todos los botones
    buttons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    // Ocultar todas las secciones
    sections.forEach(sec => sec.hidden = true);

    // Activar el botón clickeado
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    // Mostrar la sección asociada
    const id = btn.getAttribute('aria-controls');
    document.getElementById(id).hidden = false;
  });
});


function openModal(card) {
  const name = card.dataset.name;
  const price = card.dataset.price;
  const desc = card.dataset.desc;
  const reviews = JSON.parse(card.dataset.reviews);
  imageList = JSON.parse(card.dataset.img); // ⬅️ Lista de imágenes
  currentImageIndex = 0;

  // Mostrar la primera imagen
  modalImg.src = imageList[currentImageIndex];
  modalImg.alt = name;

  modalTitle.textContent = name;
  modalPrice.textContent = `$${price} DO`;
  modalDesc.textContent = desc;

  modalReviews.innerHTML = '<h4>Opiniones de clientes</h4>';
  reviews.forEach(r => {
    const reviewEl = document.createElement('div');
    reviewEl.classList.add('review');
    reviewEl.innerHTML = `
      <div class="stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
      <div class="comment">${r.comment}</div>
    `;
    modalReviews.appendChild(reviewEl);
  });

  modalBuyBtn.href = `https://wa.me/8292308873?text=Hola,%20quiero%20comprar%20el%20producto:%20${encodeURIComponent(name)}`;
  modalOverlay.hidden = false;
  modalOverlay.classList.add('active');
  modalCloseBtn.focus();
}

const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

prevBtn.addEventListener('click', () => {
  if (imageList.length > 0) {
    currentImageIndex = (currentImageIndex - 1 + imageList.length) % imageList.length;
    modalImg.src = imageList[currentImageIndex];
  }
});

nextBtn.addEventListener('click', () => {
  if (imageList.length > 0) {
    currentImageIndex = (currentImageIndex + 1) % imageList.length;
    modalImg.src = imageList[currentImageIndex];
  }
});

modalImg.addEventListener('click', () => {
  if (imageList.length > 0) {
    currentImageIndex = (currentImageIndex + 1) % imageList.length;
    modalImg.src = imageList[currentImageIndex];
  }
});
