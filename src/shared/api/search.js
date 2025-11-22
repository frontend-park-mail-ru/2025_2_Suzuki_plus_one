// import { fetchWithErrorsHandling } from '@shared/utils/errorHandler';

// export async function search(query, type = 'any', limit = 10, offset = 0) {
//     if (!query.trim()) return null;

//     const params = new URLSearchParams({
//         query: query.trim(),
//         type,
//         limit: limit.toString(),
//         offset: offset.toString(),
//     });

//     return await fetchWithErrorsHandling(`/api/v1/search?${params}`, {
//         method: 'GET',
//     });
// }



const MOCK_DATA = [
    {
        medias: [
            {
                id: "1",
                title: "Inception",
                rating: 8.8,
                release_date: "2010-07-16",
                duration_minutes: 148,
                image_urls: ["https://upload.wikimedia.org/wikipedia/ru/thumb/c/c3/Interstellar_2014.jpg/250px-Interstellar_2014.jpg"],
            },
            {
                id: "2",
                title: "Interstellar",
                rating: 8.6,
                release_date: "2014-11-07",
                duration_minutes: 169,
                image_urls: ["https://upload.wikimedia.org/wikipedia/ru/thumb/c/c3/Interstellar_2014.jpg/250px-Interstellar_2014.jpg"],
            },
            {
                id: "3",
                title: "The Matrix",
                rating: 8.7,
                release_date: "1999-03-31",
                duration_minutes: 136,
                image_urls: ["https://upload.wikimedia.org/wikipedia/ru/thumb/c/c3/Interstellar_2014.jpg/250px-Interstellar_2014.jpg"],
            },
        ],
        actors: [
            {
                id: "123",
                name: "Leonardo DiCaprio",
                image_urls: ["https://upload.wikimedia.org/wikipedia/ru/thumb/c/c3/Interstellar_2014.jpg/250px-Interstellar_2014.jpg"],
            },
            {
                id: "124",
                name: "Tom Hanks",
                image_urls: ["https://upload.wikimedia.org/wikipedia/ru/thumb/c/c3/Interstellar_2014.jpg/250px-Interstellar_2014.jpg"],
            },
            {
                id: "125",
                name: "Scarlett Johansson",
                image_urls: ["https://upload.wikimedia.org/wikipedia/ru/thumb/c/c3/Interstellar_2014.jpg/250px-Interstellar_2014.jpg"],
            },
        ],
    },
];

export async function search(query) {
    if (!query?.trim()) return null;

    await new Promise(r => setTimeout(r, 300));

    const lower = query.toLowerCase();

    const result = {
        actors: MOCK_DATA[0].actors.filter(a => a.name.toLowerCase().includes(lower)),
        medias: MOCK_DATA[0].medias.filter(m => m.title.toLowerCase().includes(lower)),
    };

    console.log('Search result:', result);
    return [result];
}
