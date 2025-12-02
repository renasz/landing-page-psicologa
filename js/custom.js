// ===================================
// HOME CAROUSEL
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let isTransitioning = false;

    // Inicializar - primeiro slide ativo, outros escondidos
    slides.forEach((slide, index) => {
        if (index === 0) {
            slide.classList.add('active');
        } else {
            slide.style.transform = 'translateX(100%)';
        }
    });

    // Função para mostrar slide específico
    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        const currentSlideElement = slides[currentSlide];
        
        if (index >= slides.length) {
            index = 0;
        } else if (index < 0) {
            index = slides.length - 1;
        }
        
        const nextSlideElement = slides[index];
        
        // Posiciona o próximo slide fora da tela à direita
        nextSlideElement.style.transform = 'translateX(100%)';
        
        // Força o reflow
        nextSlideElement.offsetHeight;
        
        // Adiciona transição
        nextSlideElement.style.transition = 'transform 1s ease-in-out';
        currentSlideElement.style.transition = 'transform 1s ease-in-out';
        
        // Move o slide atual para a esquerda
        currentSlideElement.classList.remove('active');
        currentSlideElement.classList.add('exiting');
        currentSlideElement.style.transform = 'translateX(-100%)';
        
        // Move o próximo slide para o centro
        nextSlideElement.classList.add('active');
        nextSlideElement.style.transform = 'translateX(0)';
        
        // Limpa após a transição
        setTimeout(() => {
            currentSlideElement.classList.remove('exiting');
            currentSlideElement.style.transform = 'translateX(100%)';
            isTransitioning = false;
        }, 1000);
        
        currentSlide = index;
    }

    // Função para próximo slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Função para slide anterior
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

// Auto play
function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
}

    // Parar auto play
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Event listeners para os botões
    nextBtn.addEventListener('click', function() {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });

    prevBtn.addEventListener('click', function() {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });

    // Iniciar auto play
    startAutoPlay();
});

// Inicializar WOW.js
new WOW().init();

// ===================================
// MENU MOBILE TOGGLE
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navigation = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navigation.classList.toggle('active');
        document.body.style.overflow = navigation.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navigation.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navigation.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navigation.classList.contains('active')) {
            navToggle.classList.remove('active');
            navigation.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ===================================
// FAQ ACCORDION
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach((question, index) => {
        question.addEventListener('click', function() {
            const currentItem = faqItems[index];
            const isActive = currentItem.classList.contains('active');

            // Fecha todos os itens
            faqItems.forEach(item => {
                item.classList.remove('active');
            });

            // Se o item clicado não estava ativo, abre ele
            if (!isActive) {
                currentItem.classList.add('active');
            }
        });
    });
});

function updateCarousel(smooth = true) {
    const viewportCenter = window.innerWidth / 2;
    const cardCenter = cardWidth / 2;
    const slideOffset = currentIndex * (cardWidth + gap);
    const adjustment = -20; // Ajuste fino para centralizar perfeitamente
    const finalOffset = viewportCenter - cardCenter - slideOffset + adjustment;
    
    if (smooth) {
        track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    } else {
        track.style.transition = 'none';
    }
    
    track.style.transform = `translateX(${finalOffset}px)`;
    
    // Atualiza classes dos cards
    allCards.forEach((card, index) => {
        card.classList.toggle('center', index === currentIndex);
    });
    
    // Atualiza dots
    const realIndex = currentIndex === 0 ? totalOriginalCards - 1 : 
                     currentIndex === totalOriginalCards + 1 ? 0 : 
                     currentIndex - 1;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === realIndex);
    });
}

// ===================================
// DEPOIMENTOS CAROUSEL - COM LOOPING COMPLETO
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.depoimentos-track');
    const originalCards = Array.from(document.querySelectorAll('.depoimento-card'));
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const dots = document.querySelectorAll('.dot');
    
    const cardWidth = 320;
    const gap = 25;
    const totalOriginalCards = originalCards.length;
    
    // Clona todos os cards 3 vezes para garantir looping perfeito
    const clonesBefore = originalCards.map(card => card.cloneNode(true));
    const clonesAfter = originalCards.map(card => card.cloneNode(true));
    
    // Adiciona clones antes
    clonesBefore.reverse().forEach(clone => {
        track.insertBefore(clone, track.firstChild);
    });
    
    // Adiciona clones depois
    clonesAfter.forEach(clone => {
        track.appendChild(clone);
    });
    
    // Atualiza a lista de cards
    const allCards = document.querySelectorAll('.depoimento-card');
    let currentIndex = totalOriginalCards; // Começa no primeiro card real
    let isTransitioning = false;

    function updateCarousel(smooth = true) {
        const viewportCenter = window.innerWidth / 2;
        const cardCenter = cardWidth / 2;
        const slideOffset = currentIndex * (cardWidth + gap);
        const finalOffset = viewportCenter - cardCenter - slideOffset;
        
        if (smooth) {
            track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        } else {
            track.style.transition = 'none';
        }
        
        track.style.transform = `translateX(${finalOffset}px)`;
        
        // Atualiza classes dos cards
        allCards.forEach((card, index) => {
            card.classList.toggle('center', index === currentIndex);
        });
        
        // Atualiza dots
        const realIndex = (currentIndex - totalOriginalCards) % totalOriginalCards;
        const dotIndex = realIndex < 0 ? totalOriginalCards + realIndex : realIndex;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === dotIndex);
        });
    }

    function next() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        updateCarousel(true);
        
        // Se chegou no final dos clones, volta pro início dos cards reais
        if (currentIndex >= totalOriginalCards * 2) {
            setTimeout(() => {
                currentIndex = totalOriginalCards;
                updateCarousel(false);
                isTransitioning = false;
            }, 600);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        }
    }

    function prev() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        updateCarousel(true);
        
        // Se chegou no início dos clones, vai pro final dos cards reais
        if (currentIndex < totalOriginalCards) {
            setTimeout(() => {
                currentIndex = totalOriginalCards * 2 - 1;
                updateCarousel(false);
                isTransitioning = false;
            }, 600);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        }
    }

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isTransitioning) return;
            currentIndex = totalOriginalCards + index;
            updateCarousel(true);
        });
    });

    updateCarousel(false);
    setInterval(next, 7000);
    window.addEventListener('resize', () => updateCarousel(false));
});