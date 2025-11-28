import FilmCard from '@features/FilmCard/FilmCard.js';
import template from './ui/SeriesTab.hbs';
import { fetchSeries } from '@shared/api/seriesApi';

class SeriesTab {
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
            const seriesData = response.movies.map(series => ({
                id: series.media_id,
                title: series.title,
                genres: series.genres ? series.genres.map(g => g.name).join(', ').toLowerCase() : '',
                release_date: series.release_date.substr(0, 4),
                poster: series.posters? series.posters[0]: poster,
                seasons: series.seasons,
                type: "series",
            }));

        seriesData.forEach((series) => {
            const seriesElement = document.createElement('div');
            seriesContainer.appendChild(seriesElement);
            const seriesCard = new FilmCard(seriesElement, this.#app);
            seriesCard.render(series);
        });
        } catch (err) {
            seriesContainer.innerHTML = `
                <p>Failed to load appeals: ${err.message || 'Unknown error'}<\p>
            `;
        }
    }
}

export default SeriesTab;
