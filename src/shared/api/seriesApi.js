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

export async function  fetchSeriesById(seriesId) {
    return {
        "media_id": 123,
        "title": "Stranger Things",
        "genres": [{"id":"4","name":"Horror","description":"Serious, character-driven stories focusing on emotional themes"}],
        "release_date": "2015-02-10T00:00:00Z",
        "rating": 8.7,
        "posters": [preview],
        "seasons": 5,
        "age_rating": 16,
        "country": "United States of America",
        "plot_summary":"The adventure takes off when toys come to life!",
        "description":"Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences."
    }

    // return fetchWithErrorsHandling('/api/v1/media/recommendations?type=series&limit=10', {
    //     method: 'GET',
    // });
}


export async function fetchEpisodesBySeriesId(seriesId) {
    return {
        "episodes":
        [
            {
                "media_id": 124,
                "episode_number": 1,
                "season_number": 1,
                "title": "Chapter One: The Vanishing Of Will Byers",
                "release_date": "2015-02-10T00:00:00Z",
                "posters": [preview],
                "plot_summary":"On his way home from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab",
            },
            {
                "media_id": 125,
                "episode_number": 2,
                "season_number": 1,
                "title": "Chapter Two: The Weirdo on Maple Street",
                "release_date": "2015-02-10T00:00:00Z",
                "posters": [preview],
                "plot_summary":"Lucas, Mike and Dustin try to talk to the girl they found in the woods. Meanwhile, Hopper questions an anxious Joyce about an unsettling phone call.",
            },
        ]
    }
}