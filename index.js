const apiKey = '794e34ae'


document.getElementById('search-btn').addEventListener('click', () => {
    let searchTerm = encodeURIComponent(document.getElementById('input-search').value)
    console.log(searchTerm)
    fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`)
        .then(res => res.json())
        .then(data => console.log(data))
})