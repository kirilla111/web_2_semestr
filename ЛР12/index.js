var isSwitched = false;
function switch_rotate(element) {
    if (isSwitched) {
        element.style.animation = "spin2 0.3s 1";
        element.style.animationFillMode = "forwards";

        document.body.style.backgroundColor = "white";
        var elems = document.getElementsByTagName("p");
        elems[0].style.color = "black";
        elems[1].style.color = "black";
        for (i = 2; i < elems.length; i++) {
            elems[i].style.color = "#219afb";
        }
        var elems = document.getElementsByTagName("h3");
        for (i = 0; i < elems.length; i++) {
            elems[i].style.color = "#219afb";
        }
        var elems = document.getElementsByTagName("h2");
        for (i = 0; i < elems.length; i++) {
            elems[i].style.color = "black";
        }
        var elems = document.getElementsByTagName("input");
        for (i = 0; i < elems.length; i++) {
            elems[i].classList.remove('form__submit_black');
            elems[i].style.backgroundColor = "white";
        }
        var elems = document.getElementsByClassName("task_container__card");
        for (i = 0; i < elems.length; i++) {
            elems[i].style.backgroundColor = "#f1f9ff";
            elems[i].style.border = "0px";
        }
        document.getElementById("form_id").style.backgroundColor = "white"
        document.getElementById("form_id").style.border = "1px solid black"
        document.getElementById("switch_text_1").style.color = "white"
        document.getElementById("switch_text_2").style.color = "white"

        var elems = document.getElementsByClassName("form_item__container");
        for (i = 0; i < elems.length; i++) {
            elems[i].style.backgroundColor = "#f1f9ff";
        }

        var elems = document.getElementsByClassName("dropdown-content");
        for (i = 0; i < elems.length; i++) {
            elems[i].style.backgroundColor = "#f1f9ff";
            elems[i].style.color = "#219afb";
        }
        var elems = document.getElementsByTagName("input");
        for (i = 0; i < elems.length; i++) {
            elems[i].style.color = "#219afb";
        }

    } else {
        element.style.animation = "spin1 0.3s 1";
        element.style.animationFillMode = "forwards";

        document.body.style.backgroundColor = "black";
        var elems = document.getElementsByTagName("p");
        for (i = 0; i < elems.length; i++) {
            elems[i].style.color = "#fff";
        }
        var elems = document.getElementsByTagName("h3");
        for (i = 0; i < elems.length; i++) {
            elems[i].style.color = "#fff";
        }
        var elems = document.getElementsByTagName("h2");
        for (i = 0; i < elems.length; i++) {
            elems[i].style.color = "#fff";
        }
        var elems = document.getElementsByTagName("input");
        for (i = 0; i < elems.length; i++) {
            elems[i].classList.add('form__submit_black');
            elems[i].style.backgroundColor = "black";
        }
        var elems = document.getElementsByClassName("task_container__card");
        for (i = 0; i < elems.length; i++) {
            elems[i].style.backgroundColor = "black";
            elems[i].style.border = "1px solid white";
        }
        document.getElementById("form_id").style.backgroundColor = "black"
        document.getElementById("form_id").style.border = "1px solid white"

        var elems = document.getElementsByClassName("form_item__container");
        for (i = 0; i < elems.length; i++) {
            elems[i].style.backgroundColor = "black";

        }
        var elems = document.getElementsByClassName("dropdown-content");
        for (i = 0; i < elems.length; i++) {
            elems[i].style.backgroundColor = "black";
            elems[i].style.color = "white";
        }
        var elems = document.getElementsByTagName("input");
        for (i = 0; i < elems.length; i++) {
            elems[i].style.color = "white";
        }
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