// navbar-new.js actualizado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const desktopSearchBtn = document.getElementById('desktop-search-btn');
    const mobileSearchBtn = document.getElementById('mobile-search-btn');
    const closeSearchBtn = document.getElementById('close-search-btn');
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.querySelector('.search-input');
    const searchForm = document.querySelector('.search-form');

    // Verificar que los elementos existan
    if (!mobileMenuBtn || !mobileMenu) {
        console.warn('Algunos elementos del nuevo header no se encontraron');
        return;
    }

    // Abrir menú móvil
    mobileMenuBtn.addEventListener('click', openMobileMenu);

    // Cerrar menú móvil
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMobileMenu);
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Solo abrir modal de búsqueda en móvil
    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', openSearchModal);
    }

    // Cerrar modal de búsqueda
    if (closeSearchBtn) {
        closeSearchBtn.addEventListener('click', closeSearchModal);
    }
    
    if (searchModal) {
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                closeSearchModal();
            }
        });
    }

    // Cerrar con Escape key
    document.addEventListener('keydown', handleEscapeKey);

    // Prevenir que el formulario de búsqueda cierre el modal al hacer submit
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.stopPropagation();
        });
    }

    // Funciones
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openSearchModal() {
        // Solo abrir en móvil
        if (window.innerWidth < 1024) {
            searchModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Enfocar el input después de que se abra el modal
            setTimeout(() => {
                if (searchInput) {
                    searchInput.focus();
                }
            }, 300);
        }
    }

    function closeSearchModal() {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            if (searchModal.classList.contains('active')) {
                closeSearchModal();
            }
            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    }

    // Cerrar menús al hacer clic en enlaces dentro del menú móvil
    const menuLinks = document.querySelectorAll('.mobile-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    console.log('Nuevo header JS cargado correctamente');
});