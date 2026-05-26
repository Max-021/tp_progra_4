document.addEventListener('DOMContentLoaded', () => {
    
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
});