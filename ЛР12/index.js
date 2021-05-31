var isSwitched = false;
function switch_rotate(element) {
    if (isSwitched){
        element.style.animation = "spin2 0.3s 1";
        element.style.animationFillMode = "forwards";
        document.getElementById('stylesheet').href='css/style.css';
    }
    else{
        element.style.animation = "spin1 0.3s 1";
        element.style.animationFillMode = "forwards";
        document.getElementById('stylesheet').href='css/dark-theme.css';
    }    
    isSwitched = !isSwitched;
}
function add_card_form() {
    document.getElementById("form_id").style.display = "block";
}
function close_form() {
    document.getElementById("form_id").style.display = "none";
}
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.unselectable') && !event.target.matches('.container__dropbtn')
        && !event.target.matches('#dropdown_text__name') && !event.target.matches('#dropdown_text__arrow')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
function setDropDownText(text) {
    document.getElementById("dropdown_text__name").innerHTML = text;
}
