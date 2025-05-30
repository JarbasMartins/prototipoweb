export function setupDropdownMenus() {
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach((item) => {
        const dropdown = item.querySelector(".dropdown-content");
        if (!dropdown) return;

        let timeoutId;

        const showDropdown = () => {
            clearTimeout(timeoutId);
            item.classList.add("show");
        };

        const hideDropdown = () => {
            timeoutId = setTimeout(() => {
                item.classList.remove("show");
            }, 0);
        };

        item.addEventListener("mouseenter", showDropdown);
        item.addEventListener("mouseleave", hideDropdown);
        dropdown.addEventListener("mouseenter", showDropdown);
        dropdown.addEventListener("mouseleave", hideDropdown);
    });
}
