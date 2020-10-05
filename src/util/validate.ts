import {Game} from "../types";
import {InvalidBounds, InvalidFrameLength, InvalidGameLength, InvalidLastFrameLength} from "./errors";

// this function will check for 4 things:
// the first till 9nth element should only contain 2 elements.
// all numbers mst be between 0 and 10.
// the last frame should contain 3 elements.
export const validate = (game: Game) => {
    const lengthCheck = game.length === 10;

    if (!lengthCheck) {
        throw new InvalidGameLength('');
    }

    let firstNineFramesLengthCheck: boolean;
    let lastFrameLengthCheck = false;
    let boundsCheck = false;

    const firstNine = game.slice(0, game.length - 1);

    firstNineFramesLengthCheck = firstNine.every((el) => el.length == 2);

    if (!firstNineFramesLengthCheck) {
        throw new InvalidFrameLength('');
    }

    boundsCheck = game.every((el) => {
        return (el[0] <= 10 && el[0] >= 0) &&
        (el[1] <= 10 && el[1] >= 0)
    });

    if (!boundsCheck) {
        throw new InvalidBounds('');
    }

    lastFrameLengthCheck = game[game.length - 1].length == 3;

    if (!lastFrameLengthCheck) {
        throw new InvalidLastFrameLength('');
    }
}