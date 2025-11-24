import { fetchWithErrorsHandling } from '@shared/utils/errorHandler';
import preview from '@assets/images/StrangerThings.png'

export async function fetchSeries() {
    return {
        "series":
        [
            {
                "media_id": 123,
                "title": "Stranger Things",
                "genres": [{"id":"4","name":"Horror","description":"Serious, character-driven stories focusing on emotional themes"}],
                "release_date": "2015-02-10T00:00:00Z",
                "rating": 8.7,
                "posters": [preview],
                "seasons": 5
            }
        ]
    }

    // return fetchWithErrorsHandling('/api/v1/media/recommendations?type=series&limit=10', {
    //     method: 'GET',
    // });
}