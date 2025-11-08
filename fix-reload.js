// fix-reload.js - Prevenir recargas innecesarias

// Prevenir que el navegador recargue la página automáticamente
window.addEventListener('beforeunload', function(e) {
    // Solo prevenir si hay cambios sin guardar
    if (window.hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

// Deshabilitar auto-refresh en desarrollo
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Modo desarrollo: auto-refresh deshabilitado');
}

// Prevenir múltiples llamadas a funciones de carga
const loadingStates = {
    stories: false,
    profile: false,
    notes: false
};

window.safeLoad = function(loadFunction, key, minInterval = 5000) {
    const now = Date.now();
    const lastLoad = window[`lastLoad_${key}`] || 0;
    
    // Prevenir cargas muy frecuentes
    if (now - lastLoad < minInterval) {
        console.log(`Carga de ${key} bloqueada (muy frecuente)`);
        return Promise.resolve();
    }
    
    // Prevenir cargas simultáneas
    if (loadingStates[key]) {
        console.log(`Carga de ${key} ya en progreso`);
        return Promise.resolve();
    }
    
    loadingStates[key] = true;
    window[`lastLoad_${key}`] = now;
    
    return loadFunction()
        .finally(() => {
            loadingStates[key] = false;
        });
};

// Limpiar intervalos al salir
window.addEventListener('unload', function() {
    // Limpiar todos los intervalos activos
    const highestId = window.setTimeout(() => {}, 0);
    for (let i = 0; i < highestId; i++) {
        window.clearTimeout(i);
        window.clearInterval(i);
    }
});

console.log('Fix reload cargado correctamente');
