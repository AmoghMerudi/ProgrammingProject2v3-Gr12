let table;
let movies = [];

/**
 * Preloads the CSV file before the sketch starts.
 */
function preload() {
    console.log("Attempting to load CSV file...");
    table = loadTable('/tmdb_5000_movies.csv', 'csv', 'header', loadSuccess, loadError);
}

function loadSuccess() {
    console.log("CSV loaded successfully");
}

function loadError() {
    console.error("Failed to load CSV file.");
}

async function setup() {
    createCanvas(windowWidth, windowHeight);
    await handleData();
    displayMovies();
}

async function handleData() {
    for (const row of table.rows) {
        const title = row.getString("original_title") || "Unknown";
        const popularity = row.getNum("popularity") || 0;
        const revenue = row.getNum("revenue") || 0;

        const movie = new Movie(title, popularity, revenue);
        movies.push(movie);
    }
}

function displayMovies() {
    const movieList = document.getElementById('movie-list');

    movies.forEach((movie) => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.textContent = movie.title;
        movieDiv.style.fontSize = `${movie.getTextSize()}px`;
        movieDiv.style.backgroundColor = movie.getColor();

        movieDiv.addEventListener('click', async () => {
            await movie.handleDetails(); 
        });

        movieList.appendChild(movieDiv);
    });
}