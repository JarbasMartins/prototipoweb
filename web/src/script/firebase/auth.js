// firebase import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAFVeIDOZ54jYZktbuOETuFRQIY_yEJJxU",
    authDomain: "aplicativo-lumi.firebaseapp.com",
    projectId: "aplicativo-lumi",
    storageBucket: "aplicativo-lumi.firebasestorage.app",
    messagingSenderId: "128975134959",
    appId: "1:128975134959:web:de050a0575305f88397b1a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// funções de autenticação

const updateButtonState = (button, isLoading, loadingText, defaultText) => {
    button.disabled = isLoading;
    button.textContent = isLoading ? loadingText : defaultText;
};

const handleRegister = async (e, form) => {
    e.preventDefault();
    const registerBtn = form.querySelector(".button-register");
    const name = form.querySelector("#reg-nome").value.trim();
    const firstName = name.split(" ")[0];
    const email = form.querySelector("#reg-email").value;
    const password = form.querySelector("#reg-senha").value;

    updateButtonState(registerBtn, true, "Cadastrando...", "Cadastrar");

    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        await updateProfile(userCredential.user, { displayName: firstName });

        await userCredential.user.reload();
        const updatedUser = auth.currentUser;
        document.getElementById("authModal").style.display = "none";
        handleAuthStateChange(updatedUser);
        form.reset();
    } catch (err) {
        console.error("Erro ao cadastrar.");
    } finally {
        updateButtonState(registerBtn, false, "Cadastrando...", "Cadastrar");
    }
};

// Função de login
const handleLogin = async (e, form) => {
    e.preventDefault();
    const loginBtn = form.querySelector(".button-login");
    const email = form.querySelector("#login-email").value;
    const password = form.querySelector("#login-password").value;

    updateButtonState(loginBtn, true, "Entrando...", "Entrar");

    try {
        await signInWithEmailAndPassword(auth, email, password);
        form.reset();

        document.getElementById("authModal").style.display = "none";
    } catch (err) {
        console.error("Erro ao fazer login.");
    } finally {
        updateButtonState(loginBtn, false, "Entrando...", "Entrar");
    }
};

// Função de logout
const handleLogout = async () => {
    try {
        await signOut(auth);

        const showName = document.querySelector(".show-name");
        if (showName) showName.textContent = "";
    } catch (err) {
        console.error("Erro ao fazer logout.");
    }
};

const handleAuthStateChange = (user) => {
    const showName = document.querySelector(".show-name");
    const btnQuote = document.querySelector(".btn-quote");
    const userInfo = document.querySelector("#userInfo");

    if (user) {
        if (showName) showName.textContent = `Olá, ${user.displayName || ""}.`;
        btnQuote.style.display = "none";
        if (userInfo) userInfo.classList.add("active");
    } else {
        if (showName) showName.textContent = "";
        btnQuote.style.display = "block";
        if (userInfo) userInfo.classList.remove("active");
    }
};

// função para controlar os modais
export function modalController() {
    const authModal = document.getElementById("authModal");
    const openButtons = document.querySelectorAll(".btn-open-auth");
    const closeModal = document.getElementById("closeModal");

    const tabs = document.querySelectorAll(".auth-tab");
    const loginFormSection = document.getElementById("loginForm");
    const registerFormSection = document.getElementById("registerForm");

    openButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const user = auth.currentUser;
            if (user) {
                document.getElementById("downloadModal").style.display = "flex";
            } else {
                authModal.style.display = "flex";
                loginFormSection.classList.add("active");
                registerFormSection.classList.remove("active");
                tabs[0].classList.add("active");
                tabs[1].classList.remove("active");
            }
        });
    });

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");

            if (tab.dataset.tab === "login") {
                loginFormSection.classList.add("active");
                registerFormSection.classList.remove("active");
            } else {
                registerFormSection.classList.add("active");
                loginFormSection.classList.remove("active");
            }
        });
    });

    window.addEventListener("click", (e) => {
        if (e.target === authModal) {
            authModal.style.display = "none";
        }
    });

    window.addEventListener("click", (e) => {
        if (e.target === downloadModal) {
            downloadModal.style.display = "none";
        }
    });
}

// export { auth, handleRegister, handleLogin, handleLogout, handleAuthStateChange };

export function initAuth() {
    const registerForm = document.querySelector("#registerForm form");
    const loginForm = document.querySelector("#loginForm form");
    const logoutButton = document.querySelector("#logout-btn");

    if (registerForm) {
        registerForm.addEventListener("submit", (e) =>
            handleRegister(e, registerForm)
        );
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => handleLogin(e, loginForm));
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", handleLogout);
    }

    onAuthStateChanged(auth, handleAuthStateChange);
}
