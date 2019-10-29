// Receives an exact compass direction (like WNW) and spits out a very rough
// and overly simplified direction (N|E|S|W). Use with caution!
const getRoughCompassDirection = (exact: string) => {
    if (/^NNE|NE|NNW|N$/.test(exact)) {
        return 'N';
    }

    if (/^ENE|E|ESE|SE$/.test(exact)) {
        return 'E';
    }

    if (/^SSE|S|SSW|SW$/.test(exact)) {
        return 'S';
    }

    if (/^WSW|W|WNW|NW$/.test(exact)) {
        return 'W';
    }
};

export default getRoughCompassDirection;
