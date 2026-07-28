// -----------------------------------------
// GARDEN CAROUSELS
// -----------------------------------------
const carousels = document.querySelectorAll(".carousel");
carousels.forEach(carousel => {
  const img = carousel.querySelector("img");
  const images = JSON.parse(
    carousel.dataset.images
  );
  let index = 0;
  let interval;
  function nextImage(){
    index++;
    if(index >= images.length){
      index = 0;
    }
    img.src = images[index];
    // guardar posición actual
    carousel.dataset.current = index;
  }

  function start(){
    interval = setInterval(
      nextImage,
      2000
    );
  }

  function stop(){
    clearInterval(interval);
  }

  carousel.addEventListener(
    "mouseenter",
    stop
  );

  carousel.addEventListener(
    "mouseleave",
    start
  );

  // posición inicial
  carousel.dataset.current = 0;
  start();
});

// --------------------------------------------------
// GARDEN LIGHTBOX
// --------------------------------------------------

const gardenLightbox = document.getElementById("garden-lightbox");
const gardenImg = document.getElementById("garden-lightbox-img");
const gardenCaption = document.getElementById("garden-lightbox-caption");

const gardenPrev = document.querySelector(".garden-prev");
const gardenNext = document.querySelector(".garden-next");
const gardenClose = document.querySelector(".garden-close");

let gardenImages = [];
let gardenDescriptions = [];

let gardenIndex = 0;

function openGardenLightbox(img){
  gardenImages = [img.src];
  gardenDescriptions = [
    img.dataset.desc || ""
  ];
  gardenIndex = 0;
  updateGardenLightbox();
  gardenLightbox.style.display="flex";
}


function openGardenCarousel(item){
  gardenImages = JSON.parse(item.dataset.images);
  gardenDescriptions = JSON.parse(item.dataset.desc);
  gardenIndex = Number(item.dataset.current) || 0;
  updateGardenLightbox();
  gardenLightbox.style.display="flex";
}

function updateGardenLightbox(){
  gardenImg.src = gardenImages[gardenIndex];
  gardenCaption.textContent =
  gardenDescriptions[gardenIndex];

  updateGardenArrows();
}

gardenNext.addEventListener("click",()=>{
  gardenIndex++;
  if(gardenIndex >= gardenImages.length){
    gardenIndex=0;
  }
  updateGardenLightbox();
});

gardenPrev.addEventListener("click",()=>{
  gardenIndex--;
  if(gardenIndex < 0){
    gardenIndex=gardenImages.length-1;
  }
  updateGardenLightbox();
});

gardenClose.addEventListener("click",()=>{
  gardenLightbox.style.display="none";
});

gardenLightbox.addEventListener("click",(e)=>{
  if(e.target === gardenLightbox){
    gardenLightbox.style.display="none";
  }

});

gardenImg.addEventListener("click",()=>{
  gardenLightbox.style.display="none";
});

function updateGardenArrows(){
  if(gardenImages.length <= 1){
    gardenPrev.style.display="none";
    gardenNext.style.display="none";
  }else{
    gardenPrev.style.display="block";
    gardenNext.style.display="block";
  }
}

window.addEventListener("load", ()=>{

  const hash = window.location.hash;

  if(hash){

    const item = document.querySelector(hash);

    if(item){

      const img = item.querySelector("img");

      if(img){
        openGardenLightbox(img);
      }

    }

  }

});