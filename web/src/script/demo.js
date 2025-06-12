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
                title: "Seção Informativa",
                description:
                    "Informações úteis e dicas de segurança ao seu alcance.",
            },
            {
                image: "src/assets/images/interface4.webp",
                title: "Seção de Contatos",
                description:
                    "Gestão simplificada dos seus contatos de emergência.",
            },
        ];

        this.currentSlide = 0;
        this.init();
    }

    init() {
        this.imageEl = document.querySelector(".carousel-image");
        this.titleEl = document.querySelector(".carousel-title");
        this.descEl = document.querySelector(".carousel-description");
        this.indicators = document.querySelectorAll(".carousel-indicator");
        this.prevBtn = document.querySelector(".carousel-prev");
        this.nextBtn = document.querySelector(".carousel-next");

        if (
            !this.imageEl ||
            !this.titleEl ||
            !this.descEl ||
            !this.indicators.length
        ) {
            console.error("Elementos do carrossel não encontrados.");
            return;
        }

        this.updateSlide(this.currentSlide);

        this.indicators.forEach((el, idx) => {
            el.addEventListener("click", () => this.updateSlide(idx));
        });

        this.prevBtn?.addEventListener("click", () => this.changeSlide(-1));
        this.nextBtn?.addEventListener("click", () => this.changeSlide(1));
    }

    changeSlide(direction) {
        const newIndex =
            (this.currentSlide + direction + this.slides.length) %
            this.slides.length;
        this.updateSlide(newIndex);
    }

    updateSlide(index) {
        const slide = this.slides[index];

        this.imageEl.src = slide.image;
        this.titleEl.textContent = slide.title;
        this.descEl.textContent = slide.description;

        this.indicators[this.currentSlide]?.classList.remove("active");
        this.indicators[index]?.classList.add("active");

        this.currentSlide = index;
    }
}

export function initDemo() {
    new DemoCarousel();

    const style = document.createElement("style");
    style.textContent = `
        .carousel-image {
            transition: opacity 0.3s ease-in-out;
            will-change: opacity, transform;
        }

        .carousel-title, .carousel-description {
            transition: opacity 0.3s ease-in-out;
            will-change: opacity;
        }

        .carousel-indicator {
            transition: all 0.3s ease-in-out;
        }

        .carousel-indicator.active {
            background-color: #333;
        }
    `;
    document.head.appendChild(style);
}
