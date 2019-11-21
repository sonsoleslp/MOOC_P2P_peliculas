// URL de la API 
const URL = "https://api.myjson.com/bins/lsigq";

// Lista de películas 
let my_movies = [];

// Lista de géneros
let generos = ["Comedia", "Drama", "Fantasía"];

// Géneros visibles en el menú izquierdo
let visibleGenres = ["Comedia", "Drama"];

// Cargar página principal
let index = async () => {
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
	try {
		let res = await fetch(URL);
		my_movies = await res.json();
	} catch (e) {
		alert("No se ha podido recuperar la información.")
	}
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
		<button id="${genero}" class="animated ${active ? "active" : ""}" onclick="filterGenre(this)">${genero}</button>
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
		<div class="animated movie-img" onclick="showDetail(${index})">
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
		"trailer": ""
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

// Actualiza la información a través de la API
let updateAPI = async () => {
	try {
		await fetch(URL, {
			method: 'PUT', 
			headers:{
	            "Content-Type": "application/json",
	        },
			body: JSON.stringify(my_movies)});
	} catch(e) {
		alert("Ha ocurrido un error");
		return;
	}
};

// Crea una nueva película
let createmovie = async () => {
	let movie = extractMovieForm();
	my_movies.push(movie);
	await updateAPI();
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
		    <button type="button" class="volver" onclick="index()">Volver</button>
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
				<input type="url" name="form-trailer" id="form-trailer" value="${movie.trailer}"/>
				<button type="button" id="search-youtube" onclick="youtubeSearch()">
					<img id="search-icon" class="animated" src="files/search.jpg"/>
				</button>
			</div>
			<div id="youtube-results">
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
let updateMovie = async (ind) => {
	let movie = extractMovieForm();
	my_movies[ind] = movie;
	await updateAPI();
	index();
};

// Borrar película
let deleteMovie = async (ind) => {
	if (confirm("¿Seguro que desea borrar esta película?")) {
		my_movies.splice(ind, 1);
		await updateAPI();
		index();
	}
};

// Búsqueda en Youtube
let youtubeSearch = async () => {
	let text = document.getElementById('form-trailer').value;
	try {
		let res = await fetch(encodeURI('https://www.googleapis.com/youtube/v3/search?part=id,snippet&maxResults=20&q=' + text + '&key=AIzaSyAMOw9ufNTZAlg5Xvcht9PhnBYjlY0c9z8&videoEmbeddable=true&type=video'))
		let videosStr = await res.text();
	    let videos = JSON.parse(videosStr);
    	if (videos.items) {
	        let results = videos.items.map(video => {
	        	let result = {
	                title: video.snippet.title,
	                channelTitle: video.snippet.channelTitle,
	                url: "https://www.youtube.com/embed/" + (video.id ? video.id.videoId : ''),
	                thumbnail: (video.snippet && video.snippet.thumbnails && video.snippet.thumbnails.default && video.snippet.thumbnails.default.url) ? video.snippet.thumbnails.default.url : "",
	            };
	        	return `
	        	<div class="youtube-video-result">
	        		<img class="animated youtube-video-thumbnail" src="${result.thumbnail}" onclick="setTrailer('${result.url}')"/>
	        		<a href="${result.url}">${result.title}</a>
	        		<p>${result.channelTitle}</p>
	        	</div>
	        	`
	        }).join("");
	        document.getElementById("youtube-results").innerHTML = results || "No hay resultados";
	    }
	} catch(e) {
		console.error(e);
	}
};

// Seleccionar trailer de los resultados de búsqueda
let setTrailer = (url) => {
	document.getElementById('form-trailer').value = url;
	document.getElementById("youtube-results").innerHTML = "";
};

document.addEventListener('DOMContentLoaded', index);
