import { renderMovieItem } from "./watchlist.js"

const apiKey = '794e34ae'
const movieList = document.getElementById('movie-list')
const emptyElement = document.getElementById('empty')
const noMovieElement = document.getElementById('no-movie')

let myWatchList = JSON.parse(localStorage.getItem("myWatchList"));
if (myWatchList == null) {
    myWatchList = []
}

function handleWatchlistAddclick(imdbID) {
    myWatchList.push(imdbID)
    localStorage.setItem("myWatchList", JSON.stringify(myWatchList))
    console.log(localStorage.getItem("myWatchList"))

}

function handleWatchlistRemoveclick(imdbID) {
    const index = myWatchList.indexOf(imdbID)
    const removedId = myWatchList.splice(index, 1)
    localStorage.setItem("myWatchList", JSON.stringify(myWatchList))
    console.log(localStorage.getItem("myWatchList"))
    console.log('removed supposedly')
    renderMovieItem()
}

document.addEventListener('click', (e) => {
    console.log(e)
    if(e.target.dataset.add) {
        handleWatchlistAddclick(e.target.dataset.add)

    } else if (e.target.dataset.remove) {
        handleWatchlistRemoveclick(e.target.dataset.remove)
    }
})

document.getElementById('search-btn').addEventListener('click', () => {
    let searchTerm = encodeURIComponent(document.getElementById('input-search').value)
    fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            if (data.Response == "True") {
                movieList.classList.toggle('hide', false)
                emptyElement.classList.toggle('hide', true)
                noMovieElement.classList.toggle('hide', true)
                movieList.innerHTML = ''
                const searchResult = data.Search
                searchResult.forEach(element => {
                    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${element.imdbID}`)
                        .then(res => res.json())
                        .then(movie => {
                            const actionHtml = myWatchList.includes(movie.imdbID) ? `<button data-remove="${movie.imdbID}"><i class="fa fa-minus-circle"></i> Remove</button>` : `<button data-add="${movie.imdbID}"><i class="fa fa-plus-circle"></i> Watchlist</button>`
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
                                            ${actionHtml}
                                        </div>
                                        <p class="synopsys">
                                            ${movie.Plot}
                                        </p>
                                        
                                    </div>
                                </article>
                            
                            `
    
                        })
    
                    
                });

            } else {
                movieList.classList.toggle('hide', true)
                emptyElement.classList.toggle('hide', true)
                noMovieElement.classList.toggle('hide', false)
            }
            

        })
})



