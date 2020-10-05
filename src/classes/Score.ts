export enum FrameState {
    spare,
    strike,
    neutral,
}

export class Score {
    frameNumber: number;
    state: FrameState;
    points: number[];
    total: number;

    public constructor(_frameNumber: number, _state: FrameState, _points: number[]) {
        this.frameNumber = _frameNumber;
        this.state = _state;
        this.points = _points;
        this.total = _points[0] + _points[1];
    }
}