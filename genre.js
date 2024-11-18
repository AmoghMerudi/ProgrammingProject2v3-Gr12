// /**
//  * Represents a genre containing movies.
//  * @class
//  * @extends VisualElement
//  */
// class Genre extends VisualElement {
//     /**
//      * Creates a new Genre instance.
//      * 
//      * @constructor
//      * @param {String} name - Name of the genre.
//      */
//     constructor(name) {
//         super();
//         this.name = name;
//         this.movies = [];
//         this.textPositions = [];
//         this.definition = "";
//     }

//     /**
//      * Adds a movie to the genre.
//      * @param {Movie} movie - Movie to add.
//      */
//     addMovie(movie) {
//         this.movies.push(movie);
//     }

//     /**
//      * Fetches the genre definition from the Wordnik API.
//      */
//     fetchDefinition() {
//         const apiKey = 'YOUR_WORDNIK_API_KEY';
//         const url = `https://api.wordnik.com/v4/word.json/${this.name}/definitions?limit=1&includeRelated=false&useCanonical=false&includeTags=false&api_key=${apiKey}`;

//         loadJSON(url, data => {
//             if (data.length > 0) {
//                 this.definition = data[0].text;
//             }
//         });
//     }

//     /**
//      * Displays the genre and its movies on the canvas.
//      * @param {Number} x - X-coordinate for display.
//      * @param {Number} y - Y-coordinate for display.
//      */
//     display(x, y) {
//         textAlign(CENTER);
//         fill(255);
//         textSize(20);
//         text(`${this.name}: ${this.definition}`, x, y - 20);

//         const textStep = 20;
//         this.textPositions = [];

//         this.movies.forEach((movie, i) => {
//             const textY = y + (i + 1) * textStep;
//             movie.display(x, textY);

//             this.textPositions.push({
//                 x: x,
//                 y: textY,
//                 movie: movie
//             });
//         });
//     }

//     /**
//      * Checks if a movie was clicked based on mouse position.
//      * @param {Number} mouseX - Mouse X-coordinate.
//      * @param {Number} mouseY - Mouse Y-coordinate.
//      * @returns {Movie|null} The clicked movie or null if none clicked.
//      */
//     checkClick(mouseX, mouseY) {
//         return this.textPositions.find(
//             pos => dist(mouseX, mouseY, pos.x, pos.y) < 10
//         )?.movie || null;
//     }
// }
