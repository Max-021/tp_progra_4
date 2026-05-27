document.addEventListener('DOMContentLoaded', () => {

    // --- Menú Hamburguesa ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // --- Lógica del Carrusel (Home) ---
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (track && prevBtn && nextBtn) {
        const slides = document.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;
        let currentIndex = 0;
        let autoPlayInterval;

        function updateCarousel() {
            // Mueve el contenedor horizontalmente según el índice actual
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function nextSlide() {
            currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
            updateCarousel();
        }

        // Eventos de botones
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay(); // Reinicia el contador si el usuario hace click manualmente
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });

        // Configurar autoplay
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        // Iniciar el autoplay al cargar
        startAutoPlay();
    }

    // --- Lógica de "Me gusta" (Home) ---
    const likeButtons = document.querySelectorAll('.btn-like');
    
    if (likeButtons.length > 0) {
        likeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const currentBtn = e.target;
                
                if (currentBtn.textContent === '¡Te gustó!') {
                    currentBtn.textContent = 'Me gusta esta reseña';
                    currentBtn.style.backgroundColor = 'var(--accent-color)';
                } else {
                    currentBtn.textContent = '¡Te gustó!';
                    currentBtn.style.backgroundColor = '#4ade80'; 
                }
            });
        });
    }

    // --- Lógica para Contacto (Validación y envío) ---
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const nombre = document.getElementById('nombre').value;
            const pelicula = document.getElementById('pelicula').value;

            formFeedback.textContent = `¡Gracias ${nombre}! Agregamos "${pelicula}" a nuestra lista de pendientes para reseñar.`;
            formFeedback.style.display = 'block';

            contactForm.reset();

            setTimeout(() => {
                formFeedback.style.display = 'none';
            }, 5000);
        });
    }

    // --- Lógica del Acordeón (Nosotros) ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- Lógica de Filtros (Cartelera) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.filter-item');

    if (filterBtns.length > 0 && filterItems.length > 0) {
        
        function applyFilter(filterValue) {
            filterBtns.forEach(b => b.classList.remove('active'));
            const activeBtn = document.querySelector(`.filter-btn[data-filter="${filterValue}"]`);
            if (activeBtn) activeBtn.classList.add('active');
            
            filterItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        }

        // Revisar parámetros de la URL para el dropdown
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get('filter');
        
        if (filterParam) {
            applyFilter(filterParam);
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterValue = btn.getAttribute('data-filter');
                applyFilter(filterValue);
            });
        });
    }

    // --- Lógica del Modal del Tráiler (Cartelera) ---
    const trailerModal = document.getElementById('trailer-modal');
    const trailerBtns = document.querySelectorAll('.btn-trailer');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');

    if (trailerModal && trailerBtns.length > 0 && closeModalBtn) {
        trailerBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const movieCard = e.target.closest('.movie-card');
                const movieTitle = movieCard.querySelector('h3').textContent;
                
                if (modalTitle) {
                    modalTitle.textContent = `Tráiler: ${movieTitle}`;
                }
                trailerModal.style.display = 'block';
            });
        });

        closeModalBtn.addEventListener('click', () => {
            trailerModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === trailerModal) {
                trailerModal.style.display = 'none';
            }
        });
    }

    // --- Lógica del Lightbox (Galería) ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg && galleryImages.length > 0 && lightboxClose) {
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'block';
                lightboxImg.src = img.src;
                lightboxCaption.textContent = img.alt;
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
});