const apiKey = '794e34ae'
const movieList = document.getElementById('movie-list')
const emptyElement = document.getElementById('empty')
const noMovieElement = document.getElementById('no-movie')

let myWatchList = JSON.parse(localStorage.getItem("myWatchList"));
if (myWatchList == null) {
    myWatchList = []
}

console.log(myWatchList)

function renderMovieItem() {
    movieList.innerHTML = ''
    myWatchList.forEach(element => {
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${element}`)
            .then(res => res.json())
            .then(movie => {
                movieList.innerHTML += `
                    <article class="movie-item">
                        <img src="${movie.Poster}" />
                        <div class="movie-item-info">
                            <div class="title">
                                <h3>${movie.Title} <span class="rating"><img src="./images/icon-star.png" /> ${movie.imdbRating}</span></h3>
                            </div>
                            <div class="detail-info">
                                <p>${movie.Runtime}</p>
                                <p>${movie.Genre}</p>
                                <button data-remove="${movie.imdbID}"><i class="fa fa-minus-circle"></i> Remove</button>
                            </div>
                            <p class="synopsys">
                                ${movie.Plot}
                            </p>
                            
                        </div>
                    </article>
                
                `
            })
        
    });
}



    if (myWatchList.length == 0) {
        movieList.classList.toggle('hide', true)
        noMovieElement.classList.toggle('hide', false)
    } else {
        movieList.classList.toggle('hide', false)
        noMovieElement.classList.toggle('hide', true)
        renderMovieItem()
    }



export  { renderMovieItem }