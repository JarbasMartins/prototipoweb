export function initFaqToggle() {
    document.querySelectorAll(".faq-question").forEach((question) => {
        question.addEventListener("click", () => {
            const item = question.parentElement;
            item.classList.toggle("active");
            const toggle = question.querySelector(".faq-toggle");
            toggle.textContent = item.classList.contains("active") ? "-" : "+";
        });
    });
}
