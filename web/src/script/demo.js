export class DemoCarousel {
    constructor() {
        this.slides = [
            {
                image: "src/assets/images/interface1.webp",
                title: "Interface Intuitiva",
                description:
                    "Acesso rápido a todas as funcionalidades com apenas alguns toques.",
            },
            {
                image: "src/assets/images/interface2.webp",

                title: "Botão de Pânico",
                description:
                    "Acionamento discreto para situações de emergência.",
            },
            {
                image: "src/assets/images/interface3.webp",
                title: "Chat Seguro",
                description: "Comunicação criptografada com profissionais.",
            },
            {
                image: "src/assets/images/interface4.webp",

                title: "Seção de Contatos",
                description:
                    "Gestão simplificada dos seus contatos de emergência.",
            },
        ];

        this.currentSlide = 0;
        this.autoPlayDelay = 3000; // 3 segundos entre cada slide
        this.autoPlayInterval = null;
        this.userInteracting = false;
        this.init();
    }

    init() {
        this.phoneImage = document.querySelector(".phone-mockup img");
        this.indicators = document.querySelectorAll(".demo-indicators span");
        this.features = document.querySelectorAll(
            ".demo-features .demo-feature"
        );
        this.demoContainer = document.querySelector(".demo-container");
        this.prevButton = document.querySelector(".arrow-btn.prev");
        this.nextButton = document.querySelector(".arrow-btn.next");

        if (
            !this.phoneImage ||
            !this.indicators.length ||
            !this.features.length
        ) {
            console.error("Elementos necessários não encontrados");
            return;
        }

        this.setupEventListeners();
        this.setupArrowControls();
        this.goToSlide(0);
        this.startAutoPlay();
    }

    setupEventListeners() {
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener("click", () => {
                this.userInteracting = true;
                this.goToSlide(index);
                this.resetUserInteraction();
            });
        });

        let touchStartX = 0;
        this.demoContainer.addEventListener(
            "touchstart",
            (e) => {
                touchStartX = e.touches[0].clientX;
                this.userInteracting = true;
                this.stopAutoPlay();
            },
            { passive: true }
        );

        this.demoContainer.addEventListener(
            "touchend",
            (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > 50) {
                    if (diff > 0) this.nextSlide();
                    else this.previousSlide();
                }
                this.resetUserInteraction();
            },
            { passive: true }
        );

        this.demoContainer.addEventListener("mouseenter", () => {
            this.userInteracting = true;
            this.stopAutoPlay();
        });

        this.demoContainer.addEventListener("mouseleave", () => {
            this.userInteracting = false;
            this.startAutoPlay();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") this.previousSlide();
            if (e.key === "ArrowRight") this.nextSlide();
            this.resetUserInteraction();
        });
    }

    setupArrowControls() {
        if (!this.prevButton || !this.nextButton) return;

        this.prevButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.userInteracting = true;
            this.previousSlide();
            this.resetUserInteraction();
        });

        this.nextButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.userInteracting = true;
            this.nextSlide();
            this.resetUserInteraction();
        });
    }

    resetUserInteraction() {
        if (this.userInteractionTimeout) {
            clearTimeout(this.userInteractionTimeout);
        }
        this.userInteractionTimeout = setTimeout(() => {
            this.userInteracting = false;
            this.startAutoPlay();
        }, 5000);
    }

    goToSlide(index) {
        if (index < 0 || index >= this.slides.length) return;

        this.indicators[this.currentSlide].classList.remove("active");
        this.features[this.currentSlide].classList.remove("active");

        this.currentSlide = index;

        this.indicators[this.currentSlide].classList.add("active");
        this.features[this.currentSlide].classList.add("active");

        this.phoneImage.style.opacity = "0";
        requestAnimationFrame(() => {
            this.phoneImage.src = this.slides[this.currentSlide].image;
            requestAnimationFrame(() => {
                this.phoneImage.style.opacity = "1";
            });
        });
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
        this.animateSlide("left");
    }

    previousSlide() {
        const prevIndex =
            (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
        this.animateSlide("right");
    }

    animateSlide(direction) {
        this.phoneImage.style.animation = `slide-${direction} 0.3s ease-out`;
        this.phoneImage.addEventListener(
            "animationend",
            () => {
                this.phoneImage.style.animation = "";
            },
            { once: true }
        );
    }

    startAutoPlay() {
        if (this.autoPlayInterval || this.userInteracting) return;

        this.autoPlayInterval = setInterval(() => {
            if (!this.userInteracting) {
                requestAnimationFrame(() => this.nextSlide());
            }
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (!this.autoPlayInterval) return;

        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
    }
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    const carousel = new DemoCarousel();

    const style = document.createElement("style");
    style.textContent = `
        .phone-mockup img {
            transition: opacity 0.3s ease-in-out;
            will-change: opacity, transform;
        }
        
        .demo-feature {
            transition: opacity 0.3s ease-in-out;
            will-change: opacity;
        }

        .demo-indicators span {
            transition: all 0.3s ease-in-out;
        }
    `;
    document.head.appendChild(style);
});

export function initDemo() {
    const carousel = new DemoCarousel();

    const style = document.createElement("style");
    style.textContent = `
        .phone-mockup img {
            transition: opacity 0.3s ease-in-out;
            will-change: opacity, transform;
        }
        
        .demo-feature {
            transition: opacity 0.3s ease-in-out;
            will-change: opacity;
        }

        .demo-indicators span {
            transition: all 0.3s ease-in-out;
        }
    `;
    document.head.appendChild(style);
}
