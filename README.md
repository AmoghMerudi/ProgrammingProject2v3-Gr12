# Movie Word ☁️

**Movie Word ☁️** is a visualization project that represents movies as stars in a constellation. Each movie's visual properties (size, color, etc.) are determined by its metadata (popularity and revenue). The project integrates APIs to fetch random words and movie details, creating a rich interactive experience.

---

## Features
- **Dynamic Visualization**: Movies are displayed with varying text sizes and colors based on their popularity and revenue.
- **Random Word Association**: Each movie is associated with a random word fetched from the Wordnik API.
- **Detailed Movie Metadata**: Fetches genre and release date from The Movie Database (TMDb) API.
- **Interactive Display**: Users can click on movies to view detailed information.

---

## Technologies Used
- **Languages**: JavaScript, p5.js
- **APIs**:
  - [Wordnik API](https://wordnik.com): For fetching random words.
  - [TMDb API](https://www.themoviedb.org/): For fetching movie details.
- **Visualization Framework**: p5.js
- **Data**: `tmdb_5000_movies.csv` (Preloaded CSV containing movie data)

---

## Setup and Installation

### Prerequisites
- Node.js installed on your machine (for serving the project locally).
- A modern web browser for running the application.

### Steps
1. Clone this repository:
   ```bash
   git clone <https://github.com/AmoghMerudi/ProgrammingProject2v3-Gr12.git>
   cd movie-constellations
