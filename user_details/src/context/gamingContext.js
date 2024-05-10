import React from "react";

const GamingContext = React.createContext({
    gameId: undefined,
    getGameId: () => {},
    token: undefined,
    getToken: () => {},
    score: 0,
    getScore: () => {},
})

export default GamingContext