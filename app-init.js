// app-init.js - Inicialización segura de la aplicación

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBWBr3sud1_lDPmtLJI42pCBZnco5_vyCc",
    authDomain: "noble-amp-458106-g0.firebaseapp.com",
    databaseURL: "https://noble-amp-458106-g0-default-rtdb.firebaseio.com",
    projectId: "noble-amp-458106-g0",
    storageBucket: "noble-amp-458106-g0.firebasestorage.app",
    messagingSenderId: "744574411059",
    appId: "1:744574411059:web:72a70955f1400df6645e46",
    measurementId: "G-XEQ1J354HM"
};

// Initialize Firebase solo una vez
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Variable global para rastrear el estado de inicialización
window.appInitialized = false;
window.currentUser = null;

// Función para inicializar la aplicación de manera segura
function initializeApp() {
    if (window.appInitialized) {
        console.log('App ya inicializada');
        return;
    }

    console.log('Inicializando aplicación...');

    // Escuchar cambios en el estado de autenticación
    firebase.auth().onAuthStateChanged(function(user) {
        const authForm = document.getElementById('auth-form');
        const mainApp = document.getElementById('main-app');
        const bottomNav = document.getElementById('bottom-nav');
        
        if (user) {
            console.log('Usuario autenticado:', user.email);
            window.currentUser = user;
            
            // Mostrar la aplicación principal
            if (authForm) authForm.classList.add('hidden');
            if (mainApp) mainApp.classList.remove('hidden');
            if (bottomNav) bottomNav.classList.remove('hidden');
            
            // Cargar datos del usuario
            loadUserProfile(user);
            
            // Marcar como inicializado
            if (!window.appInitialized) {
                window.appInitialized = true;
                console.log('App inicializada correctamente');
            }
        } else {
            console.log('Usuario no autenticado');
            window.currentUser = null;
            
            // Mostrar formulario de autenticación
            if (authForm) authForm.classList.remove('hidden');
            if (mainApp) mainApp.classList.add('hidden');
            if (bottomNav) bottomNav.classList.add('hidden');
        }
    });
}

// Función para cargar el perfil del usuario
function loadUserProfile(user) {
    if (!user) return;
    
    firebase.database().ref('users/' + user.uid).once('value')
        .then(snapshot => {
            const userData = snapshot.val();
            if (userData) {
                // Actualizar imagen de perfil en la navegación
                const navProfileImage = document.getElementById('nav-profile-image');
                if (navProfileImage && userData.profileImage) {
                    navProfileImage.src = userData.profileImage;
                }
                
                // Actualizar nombre de usuario
                const profileUsername = document.getElementById('profile-username');
                if (profileUsername && userData.username) {
                    profileUsername.textContent = '@' + userData.username;
                }
            }
        })
        .catch(error => {
            console.error('Error cargando perfil:', error);
        });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Prevenir múltiples inicializaciones
window.addEventListener('load', function() {
    if (!window.appInitialized) {
        console.log('Forzando inicialización en load event');
        initializeApp();
    }
});
