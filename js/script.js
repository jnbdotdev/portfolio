const sectionSkills = document.querySelector("#skills")
const navblock = document.querySelector("#navblock")
const aBrand = document.querySelector("#a-brand")
const btnCall = document.querySelector("#nav-btn")
const btnCallHover = document.querySelector("#nav-btn:hover")
const btnCallClick = document.querySelector("#nav-btn:active")

function isVisible() {

    const position = sectionSkills.getBoundingClientRect();
    const beg = position.top;
    const end = position.bottom;

    let isVisible = false;

    if ((end <= window.innerHeight+200)) {
        isVisible = true;
        navblock.style.borderColor = "rgb(100, 46, 1)";
        navblock.style.background = "linear-gradient(to bottom, #130500, #0e0500, #331000, #0e0500, #130500)";
        aBrand.style.color = "rgb(150, 60, 0)";
        
        btnCall.style.borderColor = "rgb(202, 96, 35)";
        btnCall.style.color = "rgb(202, 96, 35)";
        btnCall.addEventListener('mouseover', () => {
            btnCall.style.color = "rgb(255, 227, 200)";
            btnCall.style.backgroundColor = "rgb(177, 71, 0)";
        
        });
        btnCall.addEventListener('mouseout', () => {
            btnCall.style.borderColor = "rgb(202, 96, 35)";
            btnCall.style.color = "rgb(202, 96, 35)";
            btnCall.style.backgroundColor = "transparent";
        });
        btnCall.addEventListener('click', () => {
            btnCall.style.backgroundColor = "rgba(90, 36, 0, 0.185)";
            btnCall.style.color = "rgb(107, 39, 0)";
        });
        
    }else {
        navblock.style.borderColor = "rgb(100, 1, 1)";
        navblock.style.background = "linear-gradient(to bottom, #0c0100, #030000, #330700, #140100, #0c0100)";
        aBrand.style.color = "rgb(150, 1, 1)";
        
        btnCall.style.borderColor = "rgb(202, 35, 35)";
        btnCall.style.color = "rgb(202, 35, 35)";
        btnCall.addEventListener('mouseover', () => {
            btnCall.style.color = "rgb(255, 200, 200)";
            btnCall.style.backgroundColor = "rgb(126, 3, 3)";
        });
        btnCall.addEventListener('mouseout', () => {
            btnCall.style.borderColor = "rgb(202, 35, 35)";
            btnCall.style.color = "rgb(202, 35, 35)";
            btnCall.style.backgroundColor = "transparent";
        });
        btnCall.addEventListener('click', () => {
            btnCall.style.backgroundColor = "rgba(90, 0, 0, 0.185)";
            btnCall.style.color = "rgb(107, 0, 0)";
        });
    }
    console.log(isVisible);
    return isVisible;
}

window.addEventListener("scroll", isVisible);
window.addEventListener("resize", isVisible);