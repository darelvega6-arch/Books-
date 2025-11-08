// FIX LOGIN - Solución simple al problema de login
console.log('🔧 Fix login cargado');

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('📝 Configurando fix de login...');
    
    // Encontrar el formulario
    const authForm = document.getElementById('authForm');
    if (!authForm) {
        console.error('❌ No se encontró el formulario de autenticación');
        return;
    }
    
    // REMOVER TODOS los event listeners existentes clonando el elemento
    const newAuthForm = authForm.cloneNode(true);
    authForm.parentNode.replaceChild(newAuthForm, authForm);
    
    console.log('✅ Event listeners antiguos removidos');
    
    // Agregar UN SOLO event listener
    newAuthForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🔐 Intentando iniciar sesión...');
        
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;
        const submitBtn = document.getElementById('submitButton');
        const errorDiv = document.getElementById('authError');
        
        if (!email || !password) {
            if (errorDiv) {
                errorDiv.textContent = 'Por favor ingresa email y contraseña';
                errorDiv.classList.remove('hidden');
            }
            return;
        }
        
        // Deshabilitar botón
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Iniciando...';
        }
        
        if (errorDiv) {
            errorDiv.classList.add('hidden');
        }
        
        try {
            // Intentar login
            await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log('✅ Login exitoso');
            
        } catch (error) {
            console.log('⚠️ Error en login:', error.code);
            
            // Si el usuario no existe, crear cuenta
            if (error.code === 'auth/user-not-found') {
                try {
                    console.log('📝 Creando nueva cuenta...');
                    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
                    const user = userCredential.user;
                    
                    // Crear perfil básico
                    await firebase.database().ref('users/' + user.uid).set({
                        email: email,
                        username: email.split('@')[0],
                        createdAt: Date.now(),
                        bio: '',
                        profileImage: '',
                        followersCount: 0,
                        followingCount: 0
                    });
                    
                    console.log('✅ Cuenta creada exitosamente');
                    
                } catch (signupError) {
                    console.error('❌ Error creando cuenta:', signupError);
                    if (errorDiv) {
                        errorDiv.textContent = signupError.message;
                        errorDiv.classList.remove('hidden');
                    }
                }
            } else {
                // Otro tipo de error
                console.error('❌ Error de autenticación:', error);
                if (errorDiv) {
                    errorDiv.textContent = error.message;
                    errorDiv.classList.remove('hidden');
                }
            }
        } finally {
            // Rehabilitar botón
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Sign In';
            }
        }
    });
    
    console.log('✅ Nuevo event listener configurado');
});
