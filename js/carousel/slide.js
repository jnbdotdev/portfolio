const slides = document.querySelector(".carousel-box")
var scrollSec;
var imgPadding = 20

showCourses()

var scrollAmount = 0;

function slideScrollLeft() {
    slides.scrollTo({
        top: 0,
        left: (scrollAmount -= scrollSec),
        behavior: 'smooth'
    });

    if (scrollAmount < 0) {
        scrollAmount = 0
    }
}

function slideScrollRight() {
    if (scrollAmount <= slides.scrollWidth - slides.clientWidth) {
        slides.scrollTo({
            top: 0,
            left: (scrollAmount += scrollSec),
            behavior: 'smooth'
        });
    }
}


async function showCourses(){
    for (let i = 0; i <= 30; i++) {
        slides.insertAdjacentHTML(
            "beforeend",
            '<img id="img-'+i+'-slide" class="img-slide" src="img/banners/courses/'+i+'.png" alt="course'+i+'" />'
        )   
    }

    scrollSec = (311*2.2) + imgPadding;
}