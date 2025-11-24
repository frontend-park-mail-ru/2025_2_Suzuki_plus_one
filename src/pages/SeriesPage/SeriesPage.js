import FilmCard from '@features/FilmCard/FilmCard.js';
import template from './ui/SeriesPage.hbs';
import { fetchSeries } from '@shared/api/seriesApi';

class SeriesPage {
    #parent;
    #app;

    constructor(parent, appInstance, params = {}) {
        this.#parent = parent;
        this.#app = appInstance;
    }
    render() {
        this.#parent.innerHTML = template({});
        this.renderSeries();
    }

    async renderSeries() {
        const seriesContainer = this.#parent.querySelector('#seriesContainer');
        try {
            const response = await fetchSeries();
            const seriesData = response.series.map(series => ({
                id: series.media_id,
                title: series.title,
                genres: series.genres ? series.genres.map(g => g.name).join(', ').toLowerCase() : '',
                release_date: series.release_date.substr(0, 4),
                poster: series.posters[0],
                seasons: series.seasons,
            }));

        seriesData.forEach((series) => {
            const seriesElement = document.createElement('div');
            seriesContainer.appendChild(seriesElement);
            const filmCard = new FilmCard(seriesElement, this.#app);
            filmCard.render(series);
        });
        } catch (err) {
            seriesContainer.innerHTML = `
                <p>Failed to load appeals: ${err.message || 'Unknown error'}<\p>
            `;
        }
    }
}

export default SeriesPage;
