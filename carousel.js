// --------------------------------------------------
// GENERAL CAROUSELS
// --------------------------------------------------

const generalCarousels = document.querySelectorAll(".general-carousel");


generalCarousels.forEach(carousel => {

  const img = carousel.querySelector("img");

  if(!img) return;


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
      1000
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

  img.src = images[0];

  carousel.dataset.current = 0;


  start();


});



// --------------------------------------------------
// GENERAL CAROUSEL LIGHTBOX
// --------------------------------------------------


const generalLightbox =
document.getElementById("project-lightbox");


const generalImg =
document.getElementById("project-lightbox-img");


const generalCaption =
document.getElementById("project-lightbox-caption");


const generalPrev =
document.querySelector(".project-prev");


const generalNext =
document.querySelector(".project-next");


const generalClose =
document.querySelector(".project-close");



let generalImages = [];
let generalDescriptions = [];
let generalIndex = 0;



// --------------------------------------------------
// ABRIR CAROUSEL
// --------------------------------------------------

function openProjectCarousel(item){


  generalImages = JSON.parse(
    item.dataset.images
  );


  generalDescriptions = JSON.parse(
    item.dataset.desc
  );


  generalIndex =
    Number(item.dataset.current) || 0;



  updateGeneralLightbox();


  generalLightbox.style.display = "flex";


}



// hacer disponible para HTML

window.openProjectCarousel =
openProjectCarousel;



// --------------------------------------------------
// ACTUALIZAR LIGHTBOX
// --------------------------------------------------

function updateGeneralLightbox(){


  generalImg.src =
    generalImages[generalIndex];


  generalCaption.textContent =
    generalDescriptions[generalIndex] || "";


  updateGeneralArrows();

}



// --------------------------------------------------
// NEXT
// --------------------------------------------------

generalNext.addEventListener(
"click",
()=>{


  generalIndex++;


  if(generalIndex >= generalImages.length){

    generalIndex = 0;

  }


  updateGeneralLightbox();


});



// --------------------------------------------------
// PREV
// --------------------------------------------------

generalPrev.addEventListener(
"click",
()=>{


  generalIndex--;


  if(generalIndex < 0){

    generalIndex =
      generalImages.length - 1;

  }


  updateGeneralLightbox();


});



// --------------------------------------------------
// CLOSE
// --------------------------------------------------

generalClose.addEventListener(
"click",
()=>{

  generalLightbox.style.display="none";

});



generalLightbox.addEventListener(
"click",
(e)=>{


  if(e.target === generalLightbox){

    generalLightbox.style.display="none";

  }


});



generalImg.addEventListener(
"click",
()=>{

  generalLightbox.style.display="none";

});



// --------------------------------------------------
// FLECHAS
// --------------------------------------------------

function updateGeneralArrows(){


  if(generalImages.length <= 1){

    generalPrev.style.display="none";
    generalNext.style.display="none";

  }else{

    generalPrev.style.display="block";
    generalNext.style.display="block";

  }


}



// --------------------------------------------------
// ESC
// --------------------------------------------------

document.addEventListener(
"keydown",
(e)=>{

  if(e.key==="Escape"){

    generalLightbox.style.display="none";

  }

});