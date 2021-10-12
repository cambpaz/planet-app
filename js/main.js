$(document).ready(
    $.get("json/data.json", function (listaPlanetas, estado) {
        let planetas = [];
        if (estado == "success") {
            for (planeta of listaPlanetas) {
                planetas.push(planeta)
            }
        }
        LocalStorage.guardarPlanetas(planetas);
    }),
)

let colores = {
    MERCURY: 'red',
    SATURN: 'purple',
    EARTH: 'blue'
}



class LocalStorage {
    static guardarPlanetas(planetas) {
        localStorage.setItem("Planetas", JSON.stringify(planetas))
    }
    static getPlanetas(id) {
        let planetas = JSON.parse(localStorage.getItem("Planetas"));
        return planetas.find(planeta => planeta.name == id)
    }
    static getOverview(id) {
        let planetas = JSON.parse(localStorage.getItem("Planetas"));
        return planetas.find(planeta => planeta.rotation == id)
    }
    static getInfo(id) {
        let planetas = JSON.parse(localStorage.getItem("Planetas"));
        return planetas.find(planeta => planeta.id == id)
    }
    static getGeology(id) {
        let planetas = JSON.parse(localStorage.getItem("Planetas"));
        return planetas.find(planeta => planeta.temperature == id)
    }
}
let linkSource = document.getElementById("Wikipedia-link");
let imagenPlaneta = document.getElementById("imagenPlaneta");
let imagenGeology = document.getElementById("geology-img")

function displayPlaneta(e) {
    e.preventDefault();
    let id = e.target.id;
    let planeta = LocalStorage.getPlanetas(id);
    $(".nombre-planeta").text(planeta.name);
    $(".planeta-texto").text(planeta.overview.content);
    linkSource.href = planeta.overview.source;
    imagenPlaneta.src = planeta.images.planet;
    $(".Wikipedia-link").text(planeta.overview.source)
    $("#rotationTime").text(planeta.rotation)
    $("#revolutionTime").text(planeta.revolution)
    $("#radius").text(planeta.radius)
    $("#temp").text(planeta.temperature)
    $(".btn-internal").attr('id', `${planeta.id}`);
    $(".btn-geology").attr('id', `${planeta.temperature}`);
    $(".btn-ovw").attr('id', `${planeta.rotation}`);
    $("#geology-img").hide()
    $(".btn-ovw").addClass("active");
    $(".btn-ovw").removeClass("default");
    $(".btn-internal").removeClass("active");
    $(".btn-internal").addClass("default");
    $(".btn-geology").removeClass("active");
    $(".btn-geology").addClass("default");
    imagenPlaneta.src = planeta.images.planet;
}

function displayInternal(e) {
    e.preventDefault;
    let id = e.target.id;
    let planeta = LocalStorage.getInfo(id);
    console.log(planeta);
    $(".btn-ovw").removeClass("active");
    $(".btn-ovw").addClass("default");
    $(".btn-internal").addClass("active");
    $(".btn-internal").removeClass("default");
    $(".btn-geology").removeClass("active");
    $(".btn-geology").addClass("default")
    imagenPlaneta.src = planeta.images.internal;
    $("#geology-img").hide();
}

function displayGeology(e) {
    e.preventDefault;
    let id = e.target.id;
    let planeta = LocalStorage.getGeology(id);
    $(".btn-ovw").removeClass("active");
    $(".btn-ovw").addClass("default");
    $(".btn-internal").removeClass("active");
    $(".btn-internal").addClass("default");
    $(".btn-geology").addClass("active");
    $(".btn-geology").removeClass("default")
    $("#geology-img").show()
    imagenGeology.src = planeta.images.geology;
    imagenPlaneta.src = planeta.images.planet;
}

function displayOverview(e) {
    e.preventDefault;
    let id = e.target.id;
    let planeta = LocalStorage.getOverview(id);
    $(".btn-ovw").addClass("active");
    $(".btn-ovw").removeClass("default");
    $(".btn-internal").removeClass("active");
    $(".btn-internal").addClass("default");
    $(".btn-geology").removeClass("active");
    $(".btn-geology").addClass("default");
    imagenPlaneta.src = planeta.images.planet;
    $("#geology-img").hide()
}



//EVENT LISTENERS BUTTONS
$(".btn-geology").click(displayGeology);
$(".btn-internal").click(displayInternal);
$(".btn-ovw").click(displayOverview)
$("#MERCURY").click(displayPlaneta);
$("#VENUS").click(displayPlaneta);
$("#EARTH").click(displayPlaneta);
$("#MARS").click(displayPlaneta);
$("#JUPITER").click(displayPlaneta);
$("#SATURN").click(displayPlaneta);
$("#URANUS").click(displayPlaneta);
$("#NEPTUNE").click(displayPlaneta);

//MENU HAMBURGUESA



let hamburger = document.getElementById("hamburger");
let nav = document.getElementById("nav");

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
});

$(".nav-link").click(()=> {
    $("#nav").toggleClass("open");
})


