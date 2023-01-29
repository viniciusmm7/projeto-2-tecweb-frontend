const axios = require("axios");
const keys = require("./keys");

async function request() {
    const rawg = keys.keys.rawg;
    const rapid = keys.keys.rapid;

    const options = {
        headers: {
            'X-RapidAPI-Key': rapid,
            'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
        }
    };

    return axios.get(`https://rawg-video-games-database.p.rapidapi.com/games/grand-theft-auto-v?key=${rawg}`, options)
        .then((response) => response.data);
}

// Function for getting the weighted average of ratings
function ratingAvg(ratingsArray) {
    let numerator, denominator;

    numerator = 0;
    denominator = 0;

    for (let i = 0; i < ratingsArray.length; i++) {
        numerator += ratingsArray[i].id * ratingsArray[i].count;
        denominator += ratingsArray[i].count;
    }

    return numerator / denominator;
};

async function main() {
    let jason = await request();
    let ratings = jason.ratings;

    let ratingMean = ratingAvg(ratings).toFixed(2);

    console.log(ratingMean);
};

main();