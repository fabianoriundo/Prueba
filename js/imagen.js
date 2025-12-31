const open_form1 = () => {
  document.querySelector(".form1").classList.add("closed");
};

const closed_form1 = () => {
  document.querySelector(".form1").classList.remove("closed");
};

const btn_product = document.querySelector("#product");
const btn_images = document.querySelector("#images");

btn_product.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".container-product").classList.remove("none");
  document.querySelector(".container-images").classList.add("none");
});

btn_images.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".container-product").classList.add("none");
  document.querySelector(".container-images").classList.remove("none");
});

const toExchangeImage = (imageSecondary) => {
  let ImageMain = document.querySelector("#img_main");
  let srcMain = ImageMain.src;
  let srcSecondary = imageSecondary.src;

  ImageMain.src = srcSecondary;
  imageSecondary.src = srcMain;
};


const viewProduct = (url) => {
  location.href = url;
};

function showExtendedInfo() {
  document.getElementById("extended-info").classList.remove("hidden");
  document.getElementById("extended-info").classList.add("block");
}

function hideExtendedInfo() {
  document.getElementById("extended-info").classList.remove("block");
  document.getElementById("extended-info").classList.add("hidden");
}