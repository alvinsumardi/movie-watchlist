const apiKey = '794e34ae'
const movieList = document.getElementById('movie-list')

document.getElementById('search-btn').addEventListener('click', () => {
    let searchTerm = encodeURIComponent(document.getElementById('input-search').value)
    console.log(searchTerm)
    fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            movieList.innerHTML = ''
            const searchResult = data.Search
            console.log(searchResult)
            searchResult.forEach(element => {
                fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${element.imdbID}`)
                    .then(res => res.json())
                    .then(movie => {
                        console.log(movie)
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
                                        <button><i class="fa fa-plus-circle"></i> Watchlist</button>
                                    </div>
                                    <p class="synopsys">
                                        ${movie.Plot}
                                    </p>
                                    
                                </div>
                            </article>
                        
                        `

                    })

                
            });
            

        })
})



