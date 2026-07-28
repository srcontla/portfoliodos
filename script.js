// --------------------------------------------------
// RESPONSIVE HAMBURGER MENU
// --------------------------------------------------

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("overlay");

if (menuToggle && sidebar && overlay) {

  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
  });

}

// --------------------------------------------------
// UP BAR LOGO APPEAR
// --------------------------------------------------

const mobileTopbar = document.querySelector(".mobile-topbar");
const hero = document.querySelector(".hero");

if (mobileTopbar && hero) {

  const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) {
        mobileTopbar.classList.add("show");
      } else {
        mobileTopbar.classList.remove("show");
      }

    });

  });

  observer.observe(hero);

} else if (mobileTopbar) {

  // Estamos en una página de proyecto
  mobileTopbar.classList.add("show");

}

// --------------------------------------------------
// SIDEBAR LOGO (Home vs Project Pages)
// --------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

  const logo = document.querySelector(".logo-slot img");
  const hero = document.querySelector(".hero");

  if (!logo) return;

  // Project pages → logo always visible
  if (!hero) {
    logo.style.opacity = "1";
    logo.style.transform = "translateY(0)";
    return;
  }

  // Home → show logo after scrolling past hero
  logo.style.opacity = "0";
  logo.style.transform = "translateY(-10px)";
  logo.style.transition = "opacity .4s ease, transform .4s ease";

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {

      if (!entry.isIntersecting) {
        logo.style.opacity = "1";
        logo.style.transform = "translateY(0)";
      } else {
        logo.style.opacity = "0";
        logo.style.transform = "translateY(-10px)";
      }

    });
  });

  observer.observe(hero);

});

// --------------------------------------------------
// HOME PROJECT COVERS ANIMATION
// --------------------------------------------------

const projectImages = document.querySelectorAll(".projects img");

const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

projectImages.forEach(img => projectObserver.observe(img));

// --------------------------------------------------
// PROJECT HERO IMAGE ANIMATION
// --------------------------------------------------

const heroImages = document.querySelectorAll(".project-hero img");

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

heroImages.forEach(img => heroObserver.observe(img));

// --------------------------------------------------
// LIGHTBOX
// --------------------------------------------------

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const caption = document.getElementById("lightbox-caption");

let isDragging = false;
let startX = 0;
let startY = 0;

let translateX = 0;
let translateY = 0;

function updateTransform(){

  if(lightboxImg.classList.contains("zoomed")){
    lightboxImg.style.transform =
      `translate(${translateX}px, ${translateY}px) scale(2)`;
  }else{
    lightboxImg.style.transform = "translate(0px,0px) scale(1)";
  }

}

function openLightbox(img){

  lightbox.style.display = "flex";

  lightboxImg.src = img.src;
  caption.textContent = img.dataset.desc || "";

  translateX = 0;
  translateY = 0;

  lightboxImg.classList.remove(
    "zoomed",
    "can-zoom",
    "dragging"
  );

  // reset cursor
  lightboxImg.style.cursor = "";

  updateTransform();


  if(img.closest(".zoomable")){
    lightboxImg.classList.add("can-zoom");
  }

}

function closeLightbox(){

  lightbox.style.display = "none";

  translateX = 0;
  translateY = 0;

  lightboxImg.classList.remove(
    "zoomed",
    "dragging"
  );

  // reset cursor
  lightboxImg.style.cursor = "";

  updateTransform();

}

// Click imagen

lightboxImg.addEventListener("click", () => {

  // Si NO tiene zoom disponible, cerrar el lightbox
  if (!lightboxImg.classList.contains("can-zoom")) {
    closeLightbox();
    return;
  }

  // Si sí tiene zoom, alternar zoom
  if (lightboxImg.classList.contains("zoomed")) {

    lightboxImg.classList.remove("zoomed");

    translateX = 0;
    translateY = 0;

  } else {

    lightboxImg.classList.add("zoomed");

  }

  updateTransform();

});

lightboxImg.addEventListener("mousedown",(e)=>{ // lo que se quedara talvez

  if(!lightboxImg.classList.contains("can-zoom")) return;

  // activar zoom al mantener click
  lightboxImg.classList.add("zoomed");

  isDragging = true;

  startX = e.clientX - translateX;
  startY = e.clientY - translateY;

  lightboxImg.classList.add("dragging");

  e.preventDefault();

});

lightboxImg.addEventListener("mouseleave", () => {

  if(isDragging){

    // seguimos arrastrando aunque salga de la imagen
    lightboxImg.style.cursor = "grabbing";

  }

});

document.addEventListener("mousemove", (e) => {

  if (!isDragging) return;

  const scale = 2;

  const imgWidth = lightboxImg.offsetWidth * scale;
  const imgHeight = lightboxImg.offsetHeight * scale;

  const maxX = Math.max(0, (imgWidth - window.innerWidth) / 2);
  const maxY = Math.max(0, (imgHeight - window.innerHeight) / 2);

  translateX = e.clientX - startX;
  translateY = e.clientY - startY;

  // Limitar movimiento
  translateX = Math.max(-maxX, Math.min(maxX, translateX));
  translateY = Math.max(-maxY, Math.min(maxY, translateY));

  updateTransform();

});

document.addEventListener("mouseup",()=>{ //lo que talvez se quedara

  if(!isDragging) return;

  isDragging = false;

  lightboxImg.classList.remove(
    "zoomed",
    "dragging"
  );

  translateX = 0;
  translateY = 0;

  updateTransform();

});

// Cerrar click fuera

lightbox.addEventListener("click",(e)=>{

  if(e.target===lightbox){
    closeLightbox();
  }

});

// ESC

document.addEventListener("keydown",(e)=>{

  if(e.key==="Escape"){
    closeLightbox();
  }

});

// No click derecho

document.addEventListener("contextmenu",(e)=>{
  e.preventDefault();
});


//----------------------------------------------------
// FETCH DEL MENU Y FOOTER
//----------------------------------------------------
async function loadComponent(id, file) {

  const response = await fetch(file);
  const html = await response.text();

  document.getElementById(id).innerHTML = html;

}

document.addEventListener("DOMContentLoaded", async () => {

  await loadComponent("header", "components/header.html");
  await loadComponent("footer", "components/footer.html");

  // Aquí sigue el resto de tu código
});
