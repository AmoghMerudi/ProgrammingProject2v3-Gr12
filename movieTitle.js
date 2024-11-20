
class MovieTitle {
    constructor(popularity, revenue) {
        this.popularity = popularity;
        this.revenue = revenue;
    }

    getTextSize() {
        return Math.max(10, this.popularity / 5);
    }

    /**
     * Computes the colour of the star based on revenue.
     * @returns {String} RGB color string representing brightness.
     */
    getColor() {
        console.log(this.revenue);
        const revenueMax = 500000000;
        const normalizedRevenue = constrain(this.revenue / revenueMax, 0, 1);
        const colorStops = [
            { offset: 0, color: [255, 0, 0] },       // Red
            { offset: 0.14, color: [255, 165, 0] },  // Orange
            { offset: 0.28, color: [255, 255, 0] },  // Yellow
            { offset: 0.42, color: [0, 255, 0] },    // Green
            { offset: 0.57, color: [0, 0, 255] },    // Blue
            { offset: 0.71, color: [75, 0, 130] },   // Indigo
            { offset: 0.85, color: [238, 130, 238] },// Violet
            { offset: 1, color: [255, 192, 230] }    // Pink
        ];
        const [start, end] = this.getColorRange(normalizedRevenue, colorStops); // Get the color range based on normalized revenue
        return this.interpolateColor(normalizedRevenue, start, end); // Interpolate the color between the start and end colors
    }

    /**
     * Retrieves the color range based on value.
     * @param {Number} value - Normalized revenue value.
     * @param {Object[]} stops - Array of color stops.
     * @returns {Object[]} Start and end color stop objects.
     */
    getColorRange(value, stops) {
        for (let i = 0; i < stops.length - 1; i++) {
            if (value >= stops[i].offset && value <= stops[i + 1].offset) {
                return [stops[i], stops[i + 1]];
            }
        }
        return [stops[0], stops[stops.length - 1]];
    }

    /**
     * Interpolates between two colors.
     * @param {Number} value - Normalized value between 0 and 1.
     * @param {Object} start - Start color stop.
     * @param {Object} end - End color stop.
     * @returns {String} Interpolated RGB color.
     */
    interpolateColor(value, start, end) {
        const ratio = (value - start.offset) / (end.offset - start.offset); // Calculating the interpolation ratio
        const r = lerp(start.color[0], end.color[0], ratio); // Interpolate the red component
        const g = lerp(start.color[1], end.color[1], ratio); // Interpolate the green component
        const b = lerp(start.color[2], end.color[2], ratio); // Interpolate the blue component
        return `rgb(${round(r)}, ${round(g)}, ${round(b)})`; // Return the interpolated RGB color as a string
    }
}
