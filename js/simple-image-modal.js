// simple-image-modal.js

// Elementos del DOM
const simpleImageModal = document.getElementById('simpleImageModal');
const simpleModalImage = document.getElementById('simpleModalImage');
const closeSimpleModalBtn = document.getElementById('closeSimpleModal');
const prevImageBtn = document.getElementById('prevImage');
const nextImageBtn = document.getElementById('nextImage');
const currentIndexSpan = document.getElementById('currentIndex');
const totalImagesSpan = document.getElementById('totalImages');
const imageCounter = document.getElementById('imageCounter');

// Variables para navegación
let currentImageIndex = 0;
let currentImageSet = 'gallery'; // 'main' o 'gallery'
const mainImages = [
    'https://www.ds3comunicaciones.com/ubiquiti/images//U7-LITE_front_face.png',
    'https://www.ds3comunicaciones.com/ubiquiti/images//U7-LITE_front.png',
    'https://www.ds3comunicaciones.com/ubiquiti/images/U7-LITE_side.png',
    'https://www.ds3comunicaciones.com/ubiquiti/images/U7-LITE_back_2.jpg', 
    'https://www.ds3comunicaciones.com/ubiquiti/images/U7-LITE_back_2a.png'
];

const galleryImages = [
    'https://www.ds3comunicaciones.com/ubiquiti/images//U7-LITE_front_face.png',
    'img/u7-lite-01.png', 
    'https://www.ds3comunicaciones.com/ubiquiti/images/U7-LITE_back.png',
    'img/box.png',
    'https://www.ds3comunicaciones.com/ubiquiti/images/U7-LITE_back_2b.jpg',
    'img/box-u7-lite.png'
];

let currentImages = galleryImages; // Por defecto

// Inicializar contador
totalImagesSpan.textContent = currentImages.length;

// Función para abrir el modal desde las imágenes principales (3 imágenes)
function openMainImageModal(src, altText = '') {
    currentImageSet = 'main';
    currentImages = mainImages;
    
    // Encontrar el índice de la imagen clickeada
    currentImageIndex = currentImages.indexOf(src);
    if (currentImageIndex === -1) {
        // Si no encuentra la imagen exacta, buscar por nombre de archivo
        const filename = src.split('/').pop();
        currentImageIndex = currentImages.findIndex(img => img.includes(filename));
        if (currentImageIndex === -1) {
            currentImageIndex = 0;
        }
    }
    
    // Cargar la imagen
    loadImageIntoModal(currentImageIndex);
    
    // Establecer texto alternativo
    if (altText) {
        simpleModalImage.alt = altText;
    }
    
    // Mostrar el modal
    showModal();
    
    // Actualizar contador
    updateImageCounter();
}

// Función para abrir el modal desde la galería (5 imágenes)
function openGalleryImageModal(src, altText = '') {
    currentImageSet = 'gallery';
    currentImages = galleryImages;
    
    // Encontrar el índice de la imagen clickeada
    currentImageIndex = currentImages.indexOf(src);
    if (currentImageIndex === -1) {
        // Si no encuentra la imagen exacta, buscar por nombre de archivo
        const filename = src.split('/').pop();
        currentImageIndex = currentImages.findIndex(img => img.includes(filename));
        if (currentImageIndex === -1) {
            currentImageIndex = 0;
        }
    }
    
    // Cargar la imagen
    loadImageIntoModal(currentImageIndex);
    
    // Establecer texto alternativo
    if (altText) {
        simpleModalImage.alt = altText;
    }
    
    // Mostrar el modal
    showModal();
    
    // Actualizar contador
    updateImageCounter();
}

// Función para mostrar el modal con animación
function showModal() {
    simpleImageModal.classList.remove('hidden');
    setTimeout(() => {
        simpleImageModal.style.opacity = '1';
    }, 10);
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
    
    // Actualizar estado de botones de navegación
    updateNavigationButtons();
}

// Función para cargar imagen en el modal
function loadImageIntoModal(index) {
    // Validar índice
    if (index < 0) index = 0;
    if (index >= currentImages.length) index = currentImages.length - 1;
    
    // Mostrar indicador de carga
    simpleModalImage.classList.add('opacity-0');
    
    // Cargar la imagen
    simpleModalImage.src = currentImages[index];
    currentImageIndex = index;
    
    // Cuando la imagen cargue, mostrar con animación
    simpleModalImage.onload = function() {
        setTimeout(() => {
            simpleModalImage.classList.remove('opacity-0');
        }, 50);
    };
    
    // Actualizar estado de botones
    updateNavigationButtons();
    updateImageCounter();
}

// Función para actualizar el contador de imágenes
function updateImageCounter() {
    currentIndexSpan.textContent = currentImageIndex + 1;
    totalImagesSpan.textContent = currentImages.length;
    
    // Mostrar/ocultar contador según cantidad de imágenes
    if (currentImages.length > 1) {
        imageCounter.classList.remove('hidden');
    } else {
        imageCounter.classList.add('hidden');
    }
}

// Función para actualizar botones de navegación
function updateNavigationButtons() {
    // Botón anterior
    if (currentImageIndex <= 0) {
        prevImageBtn.disabled = true;
        prevImageBtn.setAttribute('disabled', 'true');
        prevImageBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        prevImageBtn.disabled = false;
        prevImageBtn.removeAttribute('disabled');
        prevImageBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    
    // Botón siguiente
    if (currentImageIndex >= currentImages.length - 1) {
        nextImageBtn.disabled = true;
        nextImageBtn.setAttribute('disabled', 'true');
        nextImageBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        nextImageBtn.disabled = false;
        nextImageBtn.removeAttribute('disabled');
        nextImageBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// Función para cerrar el modal
function closeSimpleImageModal() {
    // Animación de salida
    simpleImageModal.style.opacity = '0';
    
    setTimeout(() => {
        simpleImageModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Resetear al conjunto de galería para la próxima vez
        currentImageSet = 'gallery';
        currentImages = galleryImages;
    }, 300);
}

// Navegación entre imágenes
function showPrevImage() {
    if (currentImageIndex > 0) {
        loadImageIntoModal(currentImageIndex - 1);
    }
}

function showNextImage() {
    if (currentImageIndex < currentImages.length - 1) {
        loadImageIntoModal(currentImageIndex + 1);
    }
}

// Función para mantener compatibilidad (usa galería por defecto)
function openSimpleImageModal(src, altText = '') {
    // Por defecto, abrir desde galería
    openGalleryImageModal(src, altText);
}

// Event Listeners
closeSimpleModalBtn.addEventListener('click', closeSimpleImageModal);
prevImageBtn.addEventListener('click', showPrevImage);
nextImageBtn.addEventListener('click', showNextImage);

// Cerrar modal al hacer click fuera de la imagen
simpleImageModal.addEventListener('click', (e) => {
    if (e.target === simpleImageModal) {
        closeSimpleImageModal();
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
    if (!simpleImageModal.classList.contains('hidden')) {
        if (e.key === 'Escape') {
            closeSimpleImageModal();
        }
        
        // Navegación con teclado
        if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
        
        if (e.key === 'ArrowRight') {
            showNextImage();
        }
    }
});

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    console.log('Modal de imágenes cargado');
    
    // Configurar transición inicial
    simpleImageModal.style.opacity = '0';
    simpleModalImage.classList.add('transition-opacity', 'duration-300');
    
    // Configurar botones de navegación inicialmente
    updateNavigationButtons();
});