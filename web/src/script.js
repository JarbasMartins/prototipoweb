import { initDemo } from "./script/demo.js";
import { setupDropdownMenus } from "./script/dropmenu.js";
import { initFaqToggle } from "./script/faq.js";
import { initAnimations } from "./script/animation.js";
import { hidePreloader } from "./script/preloader.js";
import { initAuth, modalController } from "./script/firebase/auth.js";

document.addEventListener("DOMContentLoaded", () => {
    initDemo();
    setupDropdownMenus();
    initFaqToggle();
    initAnimations();
    initAuth();
    modalController();
});

window.addEventListener("load", hidePreloader);
