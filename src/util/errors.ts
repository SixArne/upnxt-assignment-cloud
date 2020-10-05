export class InvalidFrameLength extends Error {
    constructor(message) {
        super(message);
        this.message = 'The length of the 1st till 9nth frame is too long.';
    }
}

export class InvalidLastFrameLength extends Error {
    constructor(message) {
        super(message);
        this.message = 'The length of the last frame should have 3 points.';
    }
}

export class InvalidGameLength extends Error {
    constructor(message) {
        super(message);
        this.message = 'The game should have exactly 10 frames.';
    }
}

export class InvalidBounds extends Error {
    constructor(message) {
        super(message);
        this.message = 'The bounds of the points should stay within 0 and 10.';
    }
}