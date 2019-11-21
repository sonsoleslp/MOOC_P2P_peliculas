// Lista de películas 
let my_movies = [
	{
		"titulo": "Superlópez",   	
		"director": "Javier Ruiz Caldera", 	
		"genero": "Comedia", 	
		"miniatura": "files/superlopez.png",
		"trailer": "https://www.youtube.com/embed/qPSySsdbss0"
	},
	{
		"titulo": "Jurassic Park", 	
		"director": "Steven Spielberg", 		
		"genero": "Fantasía", 
		"miniatura": "files/jurassicpark.png",
		"trailer": "https://www.youtube.com/embed/lc0UehYemQA"
	},
	{
		"titulo": "Interstellar",  	
		"director": "Christopher Nolan", 		
		"genero": "Drama", 	
		"miniatura": "files/interstellar.png",
		"trailer": "https://www.youtube.com/embed/zSWdZVtXT7E"
	}
];

// Lista de géneros
let generos = ["Comedia", "Drama", "Fantasía"];

// Géneros visibles en el menú izquierdo
let visibleGenres = ["Comedia", "Drama"];

// Cargar página principal
let index = () => {
	// Muestra los géneros a la izquierda
	let generosHTML = "";
	let generosDOM = document.getElementById("generos");

	for (let g in generos) {
		let genero = generos[g];
		generosHTML += showGenre(genero, visibleGenres.indexOf(genero) !== -1);
	}
	generosDOM.innerHTML = generosHTML;


	// Muestra las miniaturas de las películas 
	let contentDOM = document.getElementById("content");
	let moviesHTML = "<div id='movies'>";

	for (let p in my_movies) {
		let movie = my_movies[p];
		if (visibleGenres.indexOf(movie.genero) !== -1) {
			moviesHTML += showThumbnail(p);
		}
	}

	moviesHTML = moviesHTML || "<div class='no-results'> No hay resultados </div>"
	contentDOM.innerHTML = moviesHTML + "</div>";
};

// Muestra el botón de género
let showGenre = (genero, active) => {
	return `<li class="genero">
		<button id="${genero}" class="${active ? "active" : ""}" onclick="filterGenre(this)">${genero}</button>
	</li>
	`;
};

// Muestra el contenido de la película al hacer click
let showDetail = (index) => {
	let contentDOM = document.getElementById("content");
	let movie = my_movies[index]
	contentDOM.innerHTML = `
	  <div class="detail">
	    <button class="volver" onclick="index()">Volver</button>
	    <h1><b>Título</b>: ${movie.titulo}</h1>
	    <h2><b>Director</b>: ${movie.director}</h2>
	    <h3><b>Geńero</b>: ${movie.genero}</h3>
	    <iframe width="100%" height="315" src="${movie.trailer}" frameborder="0" 
	    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
	    </iframe>
	  </div>
	`;
};

// Muestra la miniatura de la película
let showThumbnail = (index) => {
	let movie = my_movies[index];
	return `<div class="movie">
		<div class="movie-img" onclick="showDetail(${index})">
			<img src="${movie.miniatura || 'files/placeholder.png'}" onerror="this.src='files/placeholder.png'"/>
		</div>
		<div class="movie-text">
			<div class="movie-titulo">
				${movie.titulo || 'Sin título'}
			</div>
			<div class="movie-director">
				${movie.director || 'Director desconocido'}
			</div>
			<div class="movie-actions">
			  <button onclick="editMovie(${index})">editar</button>
			  <button onclick="deleteMovie(${index})">borrar</button>
			</div>
		    <div class="movie-genero">
		      ${movie.genero}
		    </div>
		</div>
	</div>`;
};

// Añade o quita un género de la lista de géneros visibles
let filterGenre = (button) => {
	let generoSelected = button.id;
	let pos = visibleGenres.indexOf(generoSelected); 
	if (pos === -1) {
		visibleGenres.push(generoSelected);
	} else {
		visibleGenres.splice(pos, 1);
	}
	index();
};

// Muestra la pantalla de añadir una nueva película
let newMovie = () => {
	let movie = {
		"titulo": "",   	
		"director": "", 	
		"genero": "Comedia", 	
		"miniatura": "",
		"trailer": "https://www.youtube.com/embed/..."
	};
	movieForm(movie, -1);
};

// Extrae el contenido del formulario de añadir/editar película
let extractMovieForm = () => {
	let titulo = document.getElementById('form-titulo').value;
	let director = document.getElementById('form-director').value;
	let trailer = document.getElementById('form-trailer').value;
	let miniatura = document.getElementById('form-miniatura').value;
	let genero = document.querySelector('input[name="form-genero"]:checked').value;
	let movie = {titulo, miniatura, director, trailer, genero};
	return movie;
};

// Crea una nueva película
let createmovie = () => {
	let movie = extractMovieForm();
	my_movies.push(movie);
	// Aquí actualizar endpoint
	index();
};

// Muestra la pantalla de editar una película
let editMovie = (ind, newMovie) => {
	let movie = my_movies[ind];
	movieForm(movie, ind);
};

// Muestra el formulario de añadir/editar una película
let movieForm = (movie, index) => {
	const newMovie = index === -1;
	let contentDOM = document.getElementById("content");
	contentDOM.innerHTML = `
		<form class="nueva-movie-form">
			<h1>${newMovie ? "Nueva" : "Modificar"} película</h1>
			<div class="form-campo form-titulo">
				<label for="form-titulo">Título</label>
				<input type="text" name="form-titulo" id="form-titulo" value="${movie.titulo}"/>
			</div>
			<div class="form-campo form-miniatura">
				<label for="form-miniatura">Miniatura</label>
				<input type="text" name="form-miniatura" id="form-miniatura" value="${movie.miniatura}"/>
			</div>
			<div class="form-campo form-director">
				<label for="form-director">Director</label>
				<input type="text" name="form-director" id="form-director" value="${movie.director}"/>
			</div>
			<div class="form-campo form-trailer">
				<label for="form-trailer">Trailer</label>
				<input type="text" name="form-trailer" id="form-trailer" value="${movie.trailer}"/>
			</div>
			<div class="form-campo form-genero">
				<label for="form-genero">Género</label>
				<div class="input-group">
					${generos.map((genre,i)=>{
						return `<input type="radio" name="form-genero" id="form-genero${i}" ${i===0 ? "checked":""} value="${genre}"/>
						<label for="genero${i}">${genre}</label>`
					}).join('<br/>')}
				</div>
			</div>
			<div class="form-campo">
				<button class="create-movie" type="button" 
					onclick="${newMovie ? 'createmovie()':'updateMovie('+ind+')'}">
					${newMovie ? "Añadir":"Actualizar"}
				</button>
			</div>
		</form>
	`;
};

// Actualizar película
let updateMovie = (ind) => {
	let movie = extractMovieForm();
	my_movies[ind] = movie;
	// Aquí actualizar endpoint
	index();
};

// Borrar película
let deleteMovie = (ind) => {
	if (confirm("¿Seguro que desea borrar esta película?")) {
		my_movies.splice(ind, 1);
		// Aquí actualizar endpoint
		index();
	}
};

document.addEventListener('DOMContentLoaded', index);