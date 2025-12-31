

const chageURL = (url) => {
  location.href = url;
}

// const modal_image = document.querySelector('.modal-image');
// const image_modal = document.querySelector('#image_modal');

// let initialLeft;
// let initialTop;

// const viewImage = (url) => {
//   modal_image.classList.remove('none');
//   image_modal.src = url;

//   modal_image.style.display = 'block';
//   zoom.style.display = 'fixed';

//   image_modal.onload = function() {
//       const imageWidth = image_modal.offsetWidth;
//       const imageHeight = image_modal.offsetHeight;
//       const zoomSize = 0;
//       const zoomLeft = (imageWidth - zoomSize) / 2;
//       const zoomTop = (imageHeight - zoomSize) / 2;
//       zoom.style.left = `${zoomLeft}px`;
//       zoom.style.top = `${zoomTop}px`;

//       image_modal.addEventListener('mousemove', function(event) {
//           const x = event.offsetX;
//           const y = event.offsetY;
//           const backgroundX = (x / imageWidth) * 100;
//           const backgroundY = (y / imageHeight) * 100;
//           zoom.style.backgroundImage = `url('${image_modal.src}')`;
//           zoom.style.backgroundPosition = `${backgroundX}% ${backgroundY}%`;

//           const zoomLeft = Math.max(50, Math.min(x - zoomSize / 2, imageWidth - zoomSize));
//           const zoomTop = Math.max(50, Math.min(y - zoomSize / 2, imageHeight - zoomSize));

//           zoom.style.left = `${zoomLeft}px`;
//           zoom.style.top = `${zoomTop}px`;
//       });
//   };
// }

// const closeViewImage = () => {
//     initialLeft = null;
//     initialTop = null;

//     modal_image.classList.add('none');
//     image_modal.src = '';

//     console.log(initialLeft, initialTop);
// }

// let active = false;

// image_modal.addEventListener('click', e => {
//   active = !active;
//   document.body.style.cursor = 'zoom-in';
// });

// Función para abrir imagen en modal (mantener compatibilidad)
// Función para mantener compatibilidad con el código existente
const viewImage = (src) => {
    openGalleryImageModal(src);
}

const btn_active_search = document.querySelector('#active_search');
const btn_desactive_search = document.querySelector('#desactive_search');

btn_active_search.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector("#sec_search").classList.remove('none');
});
btn_desactive_search.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector("#sec_search").classList.add('none');
});

const navMobile = document.querySelector(".container-nav-mobile");
const btn_open = document.querySelector(".fa-bars");

btn_open.addEventListener("click", (e) => {
    navMobile.classList.add("active-nav-mobile");
    document.querySelector('body').classList.add('body_y');
});

const btn_closed = () => {
    navMobile.classList.remove("active-nav-mobile");
    document.querySelector('body').classList.remove('body_y');
};