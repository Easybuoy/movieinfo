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
            <div class="col-lg-4 col-md-12 mb-4">
             <div class="view overlay rounded z-depth-1">
         <img class="img-fluid" src="${movie.Poster}" style="height: 400px; width: 100%;">
            </div>
            <div class="card-body text-center mt-3">
            <h5><strong>${movie.Title}</strong></h5>
            <h6>${movie.Year}</h6>
            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-elegant" href="#" style="border-radius: 10em;">Movie Details</a>
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
    window.location = '../movie.html';
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
                <li class="list-group-item"><strong>Production: </strong> ${movie.Production}</li>
                <li class="list-group-item"><strong>Genre: </strong> ${movie.Genre}</li>
                <li class="list-group-item"><strong>IMDB Rating: </strong> ${movie.imdbRating}</li>
                <li class="list-group-item"><strong>Director: </strong> ${movie.Director}</li>
                <li class="list-group-item"><strong>Writer: </strong> ${movie.Writer}</li>
                <li class="list-group-item"><strong>Actors: </strong> ${movie.Actors}</li>
                <li class="list-group-item"><strong>Awards: </strong> ${movie.Awards}</li>
                <li class="list-group-item"><strong>Box Office: </strong> ${movie.BoxOffice}</li>
                <li class="list-group-item"><strong>Languages: </strong> ${movie.Language}</li>
                <li class="list-group-item"><strong>Rated: </strong> ${movie.Rated}</li>
</ul>
</div>
             
</div>

            <div class="row">
            <div class="card-body">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-light-green" style="border-radius: 10em;">View IMDB</a>
            <a href="index.html" class="btn btn-light" style="border-radius: 10em;">Back To Search</a>
</div>
</div>
        `;
            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err)
        })
}