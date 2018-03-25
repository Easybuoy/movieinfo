$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
getMovies(searchText);
e.preventDefault();
});
});


function getMovies(searchText) {
    console.log(searchText);
    axios.get('http://www.omdbapi.com?s='+ searchText+'&apikey=15edf019')
        .then((response) => {
        console.log(response);
        let movies =  response.data.Search;
        let output = '';
        $each(movies, (index, movie))
})
.catch((err) => {
        console.log(err)
})
}