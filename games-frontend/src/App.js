import React, { useState, useEffect } from 'react';
import GameBox from './components/GameBox';
import Header from './components/Header';
import axios from 'axios';
import './App.css';

// Classe para requisições da API
class API {

    constructor() {
        this.page = 1;
        this.genreObject = {};
        this.rawgIDArray = [];
        this.titleArray = [];
        this.genreArray = [];
        this.slugArray = [];
        this.ratingArray = [];
        this.imageArray = [];
    }

    async #getGenres() {
        const keys = require("./keys");

        const rawg = keys.keys.rawg;
        const rapid = keys.keys.rapid;

        const options = {
            method: 'GET',
            url: `https://rawg-video-games-database.p.rapidapi.com/genres?key=${rawg}`,
            headers: {
                'X-RapidAPI-Key': rapid,
                'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
            }
        };

        axios.request(options).then((response) => response.data).then((response) => {
            for (let x in response.results) {
                let genre = response.results[x].name;

                this.genreArray.push(genre);
                this.genreObject[genre] = [];
            }
        })
    }

    async requestPage(page = 1) {
        await this.#getGenres();
        const keys = require("./keys");

        const rawg = keys.keys.rawg;
        const rapid = keys.keys.rapid;

        const options = {
            method: 'GET',
            url: `https://rawg-video-games-database.p.rapidapi.com/games?key=${rawg}&page=${page}`,
            headers: {
                'X-RapidAPI-Key': rapid,
                'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
            }
        };

        return await axios.request(options).then((response) => response.data);
    }

    // Método privado para pegar a média ponderada de avaliações
    #ratingAvg(ratingsArray) {
        let numerator, denominator;

        numerator = 0;
        denominator = 0;

        for (let i = 0; i < ratingsArray.length; i++) {
            numerator += ratingsArray[i].id * ratingsArray[i].count;
            denominator += ratingsArray[i].count;
        }

        return (numerator / denominator).toFixed(2);
    }

    // Método privado para adicionar dados aos arrays desse objeto
    #handleResults(jason) {

        for (let x in jason.results) {
            let genreLength = jason.results[x].genres.length;

            let rawgID = jason.results[x].id;
            let title = jason.results[x].name;
            let slug = jason.results[x].slug;
            let rating = this.#ratingAvg(jason.results[x].ratings);
            let image = jason.results[x].background_image;

            for (let i = 0; i < genreLength; i++) {
                let genre = jason.results[x].genres[i].name;
                this.genreObject[genre].push({
                    'rawgID': rawgID,
                    'title': title,
                    'slug': slug,
                    'rating': rating,
                    'image': image,
                });
            }

            this.rawgIDArray.push(rawgID);
            this.titleArray.push(title);
            this.slugArray.push(slug);
            this.ratingArray.push(rating);
            this.imageArray.push(image);
        }
    }

    consoleShowAllPerGenre() {
        if (!Object.keys(this.genreObject).length) {
            console.log('Não temos nenhum dado :/');
            return;
        }

        for (let x in this.genreObject) {
            console.log('------------------------------------------------------------');
            console.log(`Gênero: ${x}`);
            console.log(`RAWG ID: ${this.genreObject[x].rawgID}`);
            console.log(`Título: ${this.genreObject[x].title}`);
            console.log(`Classificação média: ${this.genreObject[x].rating}`);
            console.log(`URL imagem: ${this.genreObject[x].image}`);
            console.log();
        }
    }

    consoleShowAll() {
        if (!this.titleArray.length) {
            console.log('Não temos nenhum dado :/');
            return;
        }

        for (let index in this.titleArray) {
            console.log('------------------------------------------------------------');
            console.log(`RAWG ID: ${this.rawgIDArray[index]}`);
            console.log(`Título: ${this.titleArray[index]}`);
            console.log(`Gênero primário: ${this.genreArray[index]}`);
            console.log(`Classificação média: ${this.ratingArray[index]}`);
            console.log(`URL imagem: ${this.imageArray[index]}`);
            console.log();
        }
    }

    consoleShowGame(index) {
        if (!this.titleArray.length) {
            console.log('Não temos nenhum dado :/');
            return;
        }
        console.log('------------------------------------------------------------');
        console.log(`RAWG ID: ${this.rawgIDArray[index]}`);
        console.log(`Título: ${this.titleArray[index]}`);
        console.log(`Gênero primário: ${this.genreArray[index]}`);
        console.log(`Classificação média: ${this.ratingArray[index]}`);
        console.log(`URL imagem: ${this.imageArray[index]}`);
        console.log();
    }

    async getNPages(n) {
        let page = 1
        while (page <= n) {
            try {
                let jason = await this.requestPage(page);
                this.#handleResults(jason);
            } catch {
                break;
            }
            page++;
        }
    }

    async getByGenre(genre) {
        let page = 1;
        let idArray = [];
        let titleArray = [];
        let ratingArray = [];
        let imageArray = [];
        let i = 0;
        while (idArray.length < 20) {
            let jason = await this.requestPage(page).results;

            let jasonGenre = jason[i].genres[0].name;

            if (jasonGenre == genre) {
                let id = jason[i].id;
                let title = jason[i].name;
                let rating = this.#ratingAvg(jason[i].ratings);
                let image = jason[i].background_image;

                idArray.push(id);
                titleArray.push(title);
                ratingArray.push(rating);
                imageArray.push(image);
            }

            page++;
            i++;
        }
        return idArray, titleArray, ratingArray, imageArray;
    }

    async getNextPage() {
        this.page++;
        return await this.getActualPage();
    }

    async getPreviousPage() {
        this.page--;
        return await this.getActualPage();
    }

    async getActualPage() {
        let jason = await this.requestPage(this.page);
        this.#handleResults(jason);
    }
}


export default function App() {
    const [rawgIDs, setRawgIDs] = useState([]);
    const [titles, setTitles] = useState([]);
    const [genres, setGenres] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [hrefs, setHrefs] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {

        async function fetchData() {
            let rawgIDArray, titleArray, genreArray, ratingArray, imageArray;

            let api = new API()
            await api.getNPages(2);

            rawgIDArray = api.rawgIDArray;
            titleArray = api.titleArray;
            genreArray = api.genreArray;
            ratingArray = api.ratingArray;
            imageArray = api.imageArray;

            setRawgIDs(rawgIDArray);
            setTitles(titleArray);
            setGenres(genreArray);
            setRatings(ratingArray);
            setHrefs(['#', '#', '#', '#', '#', '#']);
            setImages(imageArray);
        }
        fetchData();
    }, []);

    return (
        <main className="text-slate-700">
            <Header />
            <div className="mx-auto sm:w-sm md:w-md lg:w-lg xl:w-xl 2xl:w-2xl">
                <GameBox rawgIDs={rawgIDs.slice(0, 12)} games={titles.slice(0, 12)} ratings={ratings.slice(0, 12)} hrefs={hrefs} srcs={images.slice(0, 12)}>{genres[0]}</GameBox>
                <GameBox rawgIDs={rawgIDs.slice(12, 24)} games={titles.slice(12, 24)} ratings={ratings.slice(12, 24)} hrefs={hrefs} srcs={images.slice(12, 24)}>{genres[1]}</GameBox>
                <GameBox rawgIDs={rawgIDs.slice(0, 12)} games={titles.slice(0, 12)} ratings={ratings.slice(0, 12)} hrefs={hrefs} srcs={images.slice(0, 12)}>{genres[2]}</GameBox>
                <GameBox rawgIDs={rawgIDs.slice(12, 24)} games={titles.slice(12, 24)} ratings={ratings.slice(12, 24)} hrefs={hrefs} srcs={images.slice(12, 24)}>{genres[3]}</GameBox>
                <GameBox rawgIDs={rawgIDs.slice(0, 12)} games={titles.slice(0, 12)} ratings={ratings.slice(0, 12)} hrefs={hrefs} srcs={images.slice(0, 12)}>{genres[4]}</GameBox>
                <GameBox rawgIDs={rawgIDs.slice(12, 24)} games={titles.slice(12, 24)} ratings={ratings.slice(12, 24)} hrefs={hrefs} srcs={images.slice(12, 24)}>{genres[5]}</GameBox>
            </div>
        </main>
    );
}