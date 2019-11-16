class Pelicula {

  constructor(titulo, director, genero, miniatura, trailer) {
    this.titulo = titulo;
    this.director = director;
    this.genero = genero;
    this.miniatura = miniatura;
    this.trailer = trailer;
  }

  renderThumbnail(index){
  	return `<div class="pelicula" onclick="showDetail(${index})">
  		<div class="pelicula-img">
  			<img src="${this.miniatura}"/>
  		</div>
  		<div class="pelicula-text">
  			<div class="pelicula-titulo">
  				${this.titulo}
  			</div>
  			<div class="pelicula-director">
  				${this.director}
  			</div>
        <div class="pelicula-genero">
          ${this.genero}
        </div>
  		</div>
  	</div>`;
  }

  renderDetail(){
    return `
      <div class="detail">
        <button class="volver" onclick="index()">Volver</button>
        <h1><b>Título</b>: ${this.titulo}</h1>
        <h2><b>Director</b>: ${this.director}</h2>
        <h3><b>Geńero</b>: ${this.genero}</h3>
        <iframe width="100%" height="315" src="${this.trailer}" frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
      </div>
    `;
  }

}