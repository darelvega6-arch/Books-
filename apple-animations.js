// Animaciones estilo Apple para tarjetas de libros
document.addEventListener('DOMContentLoaded', () => {
  
  // Función para crear tarjetas de libros con estilo Apple
  window.createAppleStoryCard = function(story) {
    const card = document.createElement('div');
    card.className = 'story-card group cursor-pointer relative overflow-hidden';
    card.style.animationDelay = `${Math.random() * 0.3}s`;
    
    card.innerHTML = `
      <div class="relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-500 group-hover:shadow-2xl">
        <div class="relative aspect-[2/3] overflow-hidden">
          <img src="${story.coverImage || '/api/placeholder/200/300'}" 
               class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
               alt="${story.title}">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg transform translate-x-20 group-hover:translate-x-0 transition-transform duration-500">
            <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="text-sm font-bold text-gray-900">${story.ratingValue || '4.5'}</span>
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-bold text-gray-900 text-base mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">${story.title}</h3>
          <p class="text-sm text-gray-500 mb-3">${story.username || 'Unknown'}</p>
          <div class="flex items-center justify-between text-xs text-gray-400">
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              <span>${story.views || 0}</span>
            </div>
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              <span>${story.chapters?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
    `;
    
    card.addEventListener('click', () => openStoryDetail(story));
    return card;
  };

  // Agregar animaciones a iconos del perfil de autor
  const authorProfileButtons = document.querySelectorAll('#author-profile-modal button');
  authorProfileButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      const icon = this.querySelector('svg');
      if (icon) {
        icon.style.animation = 'wiggle 0.5s ease-in-out';
        setTimeout(() => icon.style.animation = '', 500);
      }
    });
  });

  // Animación para botones de acción
  const actionButtons = document.querySelectorAll('#follow-button, #block-button, #report-button');
  actionButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => this.style.transform = 'scale(1)', 150);
    });
  });

});
