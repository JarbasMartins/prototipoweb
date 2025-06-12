import { initDemo } from "./demo.js";
import { setupDropdownMenus } from "./dropmenu.js";
import { initFaqToggle } from "./faq.js";
import { initAnimations } from "./animation.js";
import { hidePreloader } from "./preloader.js";

document.addEventListener("DOMContentLoaded", () => {
    initDemo();
    setupDropdownMenus();
    initFaqToggle();
    initAnimations();
});

window.addEventListener("load", hidePreloader);
