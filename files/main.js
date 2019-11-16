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
var mis_peliculas_objects = [];
var appliedFilters = ["Comedia", "Drama"];

let preparation = () => {
	for (let p in mis_peliculas) {
		let {titulo, director, genero, miniatura, trailer} = mis_peliculas[p];
		mis_peliculas_objects.push(new Pelicula(titulo, director, genero, miniatura, trailer));
	}
	index();
};

let applyFilter = (button) => {
	let generoSelected = button.id;
	let pos = appliedFilters.indexOf(generoSelected); 
	if (pos === -1) {
		appliedFilters.push(generoSelected);
	} else {
		appliedFilters.splice(pos, 1);
	}
	index();
};

let renderGenero = (genero, active) => {
	return `<li class="genero">
		<button id="${genero}" class="${active ? "active" : ""}" onclick="applyFilter(this)">${genero}</button>
	</li>
	`;
}

let showDetail = (index) => {
	let peliculasDOM = document.getElementById("peliculas");
	peliculasDOM.innerHTML = mis_peliculas_objects[index].renderDetail()
};

let index = () => {
	/** Render géneros **/
	let generosHTML = "";
	let generosDOM = document.getElementById("generos");

	for (let g in generos) {
		let genero = generos[g];
		generosHTML += renderGenero(genero, appliedFilters.indexOf(genero) !== -1);
	}
	generosDOM.innerHTML = generosHTML;


	/** Render películas **/
	let peliculasDOM = document.getElementById("peliculas");
	let peliculasHTML = "";

	for (let p in mis_peliculas_objects) {
		let pelicula = mis_peliculas_objects[p];
		if (appliedFilters.indexOf(pelicula.genero) !== -1) {
			peliculasHTML += pelicula.renderThumbnail(p);
		}
	}

	peliculasHTML = peliculasHTML || "<div class='no-results'> No hay resultados </div>"
	peliculasDOM.innerHTML = peliculasHTML;
	
}

document.addEventListener('DOMContentLoaded', () => {
	preparation();
});