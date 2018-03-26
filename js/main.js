$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
getMovies(searchText);
e.preventDefault();
});
});


function getMovies(searchText) {
    console.log(searchText);
    axios.get('https://www.omdbapi.com?s='+ searchText+'&apikey=15edf019')
        .then((response) => {
        console.log(response);
        let movies =  response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
          output += `
            <div class="col-md-4">
            <div class="card-body text-center">
         <img class="card-image-top" src="${movie.Poster}">
            <h5>${movie.Title}</h5>
            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
            </div>        
          `;
        });

        $('#movies').html(output);
})
.catch((err) => {
        console.log(err)
})
};

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}


function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('https://www.omdbapi.com?i='+ movieId+'&apikey=15edf019')
        .then((response) => {
            console.log(response);
            let movie = response.data;

            let output = `
               <div class="row">
               <div class="col-md-4">
               <img src="${movie.Poster}" class="img-thumbnail">
                </div>
                <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                <li class="list-group-item"><strong>Genre: </strong> ${movie.Genre}</li>
                <li class="list-group-item"><strong>Rated: </strong> ${movie.Rated}</li>
                <li class="list-group-item"><strong>IMDB Rating: </strong> ${movie.imdbRating}</li>
                <li class="list-group-item"><strong>Director: </strong> ${movie.Director}</li>
                <li class="list-group-item"><strong>Writer: </strong> ${movie.Writer}</li>
                <li class="list-group-item"><strong>Actors: </strong> ${movie.Actors}</li>
                <li class="list-group-item"><strong>Awards: </strong> ${movie.Awards}</li>
                <li class="list-group-item"><strong>Box Office' </strong> ${movie.BoxOffice}</li>
</ul>
</div>
               
</div>

            <div class="row">
            <div class="card-body">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-light">Back To Search</a>
</div>
</div>
        `;
            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err)
        })
}