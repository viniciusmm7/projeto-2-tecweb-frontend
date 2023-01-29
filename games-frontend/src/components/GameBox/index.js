import React from 'react';
import GameCarousel from '../GameCarousel';
import '../../App.css';

function GameBox({ rawgIDs, hrefs, srcs, games, ratings, children}) {
    return (
        <div className="flex flex-col space-y-2 mx-8 mb-8">
            <div className="flex justify-between">
                <h2 className="text-3xl font-light mb-2">{children}</h2>
                <a className="text-sky-600 font-medium rounded-full place-self-center py-1 px-3 hover:bg-sky-100" href="#">Ver todos</a>
            </div>
            <ul className="flex overflow-hidden lg:overflow-x-scroll">
                <GameCarousel rawgIDs={rawgIDs.slice(0, 6)} hrefs={hrefs} srcs={srcs.slice(0, 6)} games={games.slice(0, 6)} ratings={ratings.slice(0, 6)} />
                <GameCarousel rawgIDs={rawgIDs.slice(6, 12)} hrefs={hrefs} srcs={srcs.slice(6, 12)} games={games.slice(6, 12)} ratings={ratings.slice(6, 12)} />
            </ul>
        </div>
    );
}

export default GameBox;