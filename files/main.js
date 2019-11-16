var mis_peliculas = [
	{
		titulo: "Superlópez",   	
		director: "Javier Ruiz Caldera", 	
		genero: "Comedia", 	
		miniatura: "files/superlopez.png",
		trailer: "https://www.youtube.com/embed/qPSySsdbss0"
	},
	{
		titulo: "Jurassic Park", 	
		director: "Steven Spielberg", 		
		genero: "Fantasía", 
		miniatura: "files/jurassicpark.png",
		trailer: "https://www.youtube.com/embed/lc0UehYemQA"
	},
	{
		titulo: "Interstellar",  	
		director: "Christopher Nolan", 		
		genero: "Drama", 	
		miniatura: "files/interstellar.png",
		trailer: "https://www.youtube.com/embed/zSWdZVtXT7E"
	}
];

var generos = ["Comedia", "Drama", "Fantasía"];
var generosVisibles = ["Comedia", "Drama"];

let index = () => {
	/** Render géneros **/
	let generosHTML = "";
	let generosDOM = document.getElementById("generos");

	for (let g in generos) {
		let genero = generos[g];
		generosHTML += showGenero(genero, generosVisibles.indexOf(genero) !== -1);
	}
	generosDOM.innerHTML = generosHTML;


	/** Render películas **/
	let peliculasDOM = document.getElementById("peliculas");
	let peliculasHTML = "";

	for (let p in mis_peliculas) {
		let pelicula = mis_peliculas[p];
		if (generosVisibles.indexOf(pelicula.genero) !== -1) {
			peliculasHTML += showThumbnail(p);
		}
	}

	peliculasHTML = peliculasHTML || "<div class='no-results'> No hay resultados </div>"
	peliculasDOM.innerHTML = peliculasHTML;
};

let showGenero = (genero, active) => {
	return `<li class="genero">
		<button id="${genero}" class="${active ? "active" : ""}" onclick="aplicarFiltro(this)">${genero}</button>
	</li>
	`;
};

let showDetail = (index) => {
	let peliculasDOM = document.getElementById("peliculas");
	let pelicula = mis_peliculas[index]
	peliculasDOM.innerHTML = `
	  <div class="detail">
	    <button class="volver" onclick="index()">Volver</button>
	    <h1><b>Título</b>: ${pelicula.titulo}</h1>
	    <h2><b>Director</b>: ${pelicula.director}</h2>
	    <h3><b>Geńero</b>: ${pelicula.genero}</h3>
	    <iframe width="100%" height="315" src="${pelicula.trailer}" frameborder="0" 
	    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
	    </iframe>
	  </div>
	`;
};

let showThumbnail = (index) => {
	let pelicula = mis_peliculas[index];
	return `<div class="pelicula" onclick="showDetail(${index})">
		<div class="pelicula-img">
			<img src="${pelicula.miniatura}"/>
		</div>
		<div class="pelicula-text">
			<div class="pelicula-titulo">
				${pelicula.titulo}
			</div>
			<div class="pelicula-director">
				${pelicula.director}
			</div>
		    <div class="pelicula-genero">
		      ${pelicula.genero}
		    </div>
		</div>
	</div>`;
};

let aplicarFiltro = (button) => {
	let generoSelected = button.id;
	let pos = generosVisibles.indexOf(generoSelected); 
	if (pos === -1) {
		generosVisibles.push(generoSelected);
	} else {
		generosVisibles.splice(pos, 1);
	}
	index();
};

document.addEventListener('DOMContentLoaded', index);