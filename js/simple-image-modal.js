// simple-image-modal.js - Versión simplificada

// Hacer que las imágenes sean clickeables y redirijan a su URL
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todas las imágenes que queremos que sean clickeables
    const clickableImages = document.querySelectorAll('.main-image, .product-image, .gallery-image, .thumbnail');
    
    clickableImages.forEach(img => {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Navegar a la URL de la imagen en la misma ventana
            window.location.href = this.src;
        });
        
        // Si la imagen está dentro de un enlace, también interceptar el click del enlace
        const parentLink = img.closest('a');
        if (parentLink) {
            parentLink.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = img.src;
            });
        }
    });
    
    console.log('Imágenes configuradas para abrir en la misma página');
});

// Funciones de compatibilidad (si otras partes del código las llaman)
function openMainImageModal(src, altText = '') {
    window.location.href = src;
}

function openGalleryImageModal(src, altText = '') {
    window.location.href = src;
}

function openSimpleImageModal(src, altText = '') {
    window.location.href = src;
}