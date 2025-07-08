import { initDemo } from "./demo.js";
import { setupDropdownMenus } from "./dropmenu.js";
import { initFaqToggle } from "./faq.js";
import { initAnimations } from "./animation.js";
import { hidePreloader } from "./preloader.js";
import { initAuth, modalController } from "./firebase/auth.js";

document.addEventListener("DOMContentLoaded", () => {
    initDemo();
    setupDropdownMenus();
    initFaqToggle();
    initAnimations();
    initAuth();
    modalController();
});

window.addEventListener("load", hidePreloader);
