document.querySelector(".projectMenu").innerHTML = `<p class="w3-bar-item ProjectTitle">MKT Calculator</p> <button class="w3-bar-item w3-button close_menu w3-hide-large"
onclick="w3_close()">Close &times;</button>
<a href="index.html" class="w3-bar-item w3-button">Калькулятор уравнения состояния идеального газа</a>
<a href="cgl.html" class="w3-bar-item w3-button">Калькулятор уравнения объединенного газового закона</a>
<a href="rd.html" class="w3-bar-item w3-button">Калькулятор радиоактивных распадов</a>
<a href="mendeleevtable.html" class="w3-bar-item w3-button">Онлайн таблица Менделеева</a>
`;


document.querySelector(".w3-container h1").innerHTML = '<button class="w3-button open_menu w3-xlarge w3-left" onclick="w3_open()">&#9776;</button>' + document.querySelector(".w3-container h1").innerHTML; 
document.querySelector('.projectMenu').classList.add('w3-animate-left');


document.querySelector(".modal-body").innerHTML = `<a href="https://ru.wikipedia.org/wiki/Молекулярно-кинетическая_теория">Молекулярно-кинетическая теория</a>
<a href="https://ru.wikipedia.org/wiki/Уравнение_состояния_идеального_газа">Уравнение состояния идеального газа</a>
<a href="https://foxford.ru/wiki/fizika/uravnenie-sostoyaniya-idealnogo-gaza">Уравнение состояния идеального газа</a>
<a href="https://interneturok.ru/lesson/physics/10-klass/osnovy-molekulyarno-kineticheskoy-teorii/grafiki-izoprotsessov">Графики изопроцессов</a>
<a href="https://ru.wikipedia.org/wiki/Радиоактивный_распад">Радиоактивный распад</a>`;

let current_theme = 'light;'

window.onload = () => {
    if(localStorage.getItem("theme") !== null){
        if(localStorage.getItem("theme") != "light"){
                document.querySelector(".theme__btn").querySelector("img").setAttribute("src", "assets/outline_dark_mode_white_24dp.png");
                document.querySelector("body").classList.remove("theme__light");
                document.querySelector("body").classList.add("theme__dark");
                current_theme = 'dark';
        }
        else{
            document.querySelector(".theme__btn").querySelector("img").setAttribute("src", "assets/light_mode_black_24dp.svg");
            document.querySelector("body").classList.add("theme__light");
            document.querySelector("body").classList.remove("theme__dark");        
            current_theme = 'light';
        }
    }
};


var materialsModal = new bootstrap.Modal(document.getElementById('materialsModal'), {})


function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
document.getElementById("mySidebar").style.display = "none";
}

document.querySelector(".theme__btn").addEventListener("click", () => {
    if(document.querySelector("body").classList.contains("theme__light")){
        document.querySelector(".theme__btn").querySelector("img").setAttribute("src", "assets/outline_dark_mode_white_24dp.png");
        document.querySelector("body").classList.remove("theme__light");
        document.querySelector("body").classList.add("theme__dark");
        localStorage.setItem("theme", "dark");
        current_theme = 'dark';
       
        document.querySelectorAll(".actionImage").forEach(img => {
            img.setAttribute("src", "assets/" + img.getAttribute("rtype") + "_white.png");
        })
    }
    else{
        document.querySelector(".theme__btn").querySelector("img").setAttribute("src", "assets/light_mode_black_24dp.svg");
        document.querySelector("body").classList.add("theme__light");
        document.querySelector("body").classList.remove("theme__dark");
        localStorage.setItem("theme", "light");
        current_theme = 'light';
        document.querySelectorAll(".actionImage").forEach(img => {
            img.setAttribute("src", "assets/" + img.getAttribute("rtype") + "_black.png");
        })
    }
})


document.querySelector(".additional__materials").addEventListener("click", () => {
    materialsModal.show();
})