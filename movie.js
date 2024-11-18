class Movie extends MovieTitle {
    constructor(title, popularity, revenue) {
        super(popularity, revenue);
        this.title = title;
        this.randomWord = 'Loading...';
        this.wordFetched = false;
        this.genre = null;
        this.releaseDate = null;
    }

    async fetchRandomWord() {
        try {
            const response = await fetch(
                `https://api.wordnik.com/v4/words.json/randomWord?maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=2&maxLength=-1&api_key=wnnjlmio6z6mx0os9gkq3o74im7ayv7j9t1a3lq2e2egygwct`
            );
            const data = await response.json();
            this.randomWord = data.word;
            this.wordFetched = true;
        } catch (error) {
            console.error('Error fetching random word:', error);
            this.randomWord = 'Error';
            this.wordFetched = true;
        }
    }

    async fetchDetails() {
        const apiKey = '75d20cb437df116a7b641bef86c09d20';
        const query = this.title;
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
            );
            const data = await response.json();
            const movieData = data.results[0];

            const genreMap = {
                28: "Action",
                12: "Adventure",
                16: "Animation",
                35: "Comedy",
                80: "Crime",
                99: "Documentary",
                18: "Drama",
                10751: "Family",
                14: "Fantasy",
                36: "History",
                27: "Horror",
                10402: "Music",
                9648: "Mystery",
                10749: "Romance",
                878: "Science Fiction",
                10770: "TV Movie",
                53: "Thriller",
                10752: "War",
                37: "Western"
            };

            this.genre = genreMap[movieData.genre_ids[0]] || 'Unknown';
            this.releaseDate = movieData.release_date || 'Unknown';
        } catch (error) {
            console.error('Error fetching movie details:', error);
            this.genre = 'Unknown';
            this.releaseDate = 'Unknown';
        }
    }

    async handleDetails() {
        // Fetch both APIs
        await this.fetchRandomWord();
        await this.fetchDetails();

        // Navigate to the details page
        const detailsPage = `
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${this.title} Details</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        padding: 20px;
                        background-color: #f9f9f9;
                    }
                </style>
            </head>
            <body>
                <h1>${this.title}</h1>
                <p><strong>Popularity:</strong> ${this.popularity}</p>
                <p><strong>Revenue:</strong> ${this.revenue}</p>
                <p><strong>Random Word:</strong> ${this.randomWord}</p>
                <p><strong>Genre:</strong> ${this.genre}</p>
                <p><strong>Release Date:</strong> ${this.releaseDate}</p>
            </body>
            </html>
        `;

        const newWindow = window.open();
        if (newWindow) {
            newWindow.document.write(detailsPage);
            newWindow.document.close();
        } else {
            alert('Unable to open details page. Please check your browser settings.');
        }
    }
}
