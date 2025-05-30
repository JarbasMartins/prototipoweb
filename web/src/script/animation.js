export function initAnimations() {
    const animationsItens = document.querySelectorAll(".animation");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("ativo");
                }
            });
        },
        {
            threshold: 0.011, // Exibe quando pelo menos 1% aparece
        }
    );

    animationsItens.forEach((el) => observer.observe(el));
}
