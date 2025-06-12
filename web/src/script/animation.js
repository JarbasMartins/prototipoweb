export function initAnimations() {
    const animationsItens = document.querySelectorAll(".animation");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active-animation");
                }
            });
        },
        {
            threshold: 0.2,
        }
    );

    animationsItens.forEach((el) => observer.observe(el));
}
