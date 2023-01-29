import React from 'react';
import Game from '../Game';
import '../../App.css';

function GameCarousel({ rawgIDs, ratings, hrefs, srcs, games}) {
    return (
        <li className="min-w-full h-max lg:pb-2">
            <ul className="grid grid-cols-2 p-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-3">
                <Game rawgID={rawgIDs[0]} style="" rating={ratings[0]} src={srcs[0]} href={hrefs[0]}>
                    {games[0]}
                </Game>
                <Game rawgID={rawgIDs[1]} style="" rating={ratings[1]} src={srcs[1]} href={hrefs[1]}>
                    {games[1]}
                </Game>
                <Game rawgID={rawgIDs[2]} style="hidden sm:block" rating={ratings[2]} src={srcs[2]} href={hrefs[2]}>
                    {games[2]}
                </Game>
                <Game rawgID={rawgIDs[3]} style="hidden md:block" rating={ratings[3]} src={srcs[3]} href={hrefs[3]}>
                    {games[3]}
                </Game>
                <Game rawgID={rawgIDs[4]} style="hidden lg:block" rating={ratings[4]} src={srcs[4]} href={hrefs[4]}>
                    {games[4]}
                </Game>
                <Game rawgID={rawgIDs[5]} style="hidden lg:block" rating={ratings[5]} src={srcs[5]} href={hrefs[5]}>
                    {games[5]}
                </Game>
            </ul>
        </li>
    )
}

export default GameCarousel;