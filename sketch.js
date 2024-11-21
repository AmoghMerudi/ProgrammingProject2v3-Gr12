/* -------------------------------------------------------------------------
Stack Overflow used for API handling 
---------------------------------------------------------------------------- */

let table; // Stores the loaded CSV file
let movies = []; // Array to hold instances of the Movie class

/**
 * Preloads the CSV file before the sketch starts
 * Ensures the data is available for processing during the setup phase
 */
function preload() {
    console.log("Attempting to load CSV file...");
    table = loadTable('/tmdb_5000_movies.csv', 'csv', 'header', loadSuccess, loadError);
}

/**
 * Callback function to execute when the CSV file loads successfully
 * Logs a success message to the console.
 */
function loadSuccess() {
    console.log("CSV loaded successfully");
}

/**
 * Callback function to execute if there is an error loading the CSV file
 * Logs an error message to the console
 */
function loadError() {
    console.error("Failed to load CSV file.");
}

/**
 * Sets up the sketch and initializes the canvas
 * Processes the CSV data to create Movie instances and displays them on the page
 */
async function setup() {
    createCanvas(windowWidth, windowHeight); 
    await handleData(); 
    displayMovies(); 
}

/**
 * Processes the loaded CSV data to create Movie objects
 * Iterates over each row in the CSV and extracts relevant data
 * Pushes Movie objects into the global `movies` array
 */
async function handleData() {
    for (const row of table.rows) {
        const title = row.getString("original_title") || "Unknown"; 
        const popularity = row.getNum("popularity") || 0; 
        const revenue = row.getNum("revenue") || 0; 

        // Create a new Movie instance and add it to the movies array
        const movie = new Movie(title, popularity, revenue);
        movies.push(movie);
    }
}

/**
 * Displays movies as div elements on the web page
 * Each movie is represented with dynamic styling (font size and background color)
 * and interactive click events to show details
 */
function displayMovies() {
    const movieList = document.getElementById('movie-list'); // Target container for movie elements

    movies.forEach((movie) => {
        const movieDiv = document.createElement('div'); 
        movieDiv.classList.add('movie'); 
        movieDiv.textContent = movie.title; 
        movieDiv.style.fontSize = `${movie.getTextSize()}px`; 
        movieDiv.style.backgroundColor = movie.getColor(); 

        // Add a click event listener to display movie details
        movieDiv.addEventListener('click', async (event) => {
            await movie.handleDetails(event); 
        });

        // Append the movie div to the movie list container
        movieList.appendChild(movieDiv);
    });
}
