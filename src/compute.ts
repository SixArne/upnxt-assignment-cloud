import {Frame, Game, LastFrame} from "./types";
import {FrameState, Score} from './classes/Score';
import {Map} from "typescript";

/*
The goal is to knock down all ten pins•Each frame consists of throwing the ball twice to knock down all the pins•
If you knock down all the pins with the first ball, it is called a "strike"•
If you knock down all the pins with the second ball, it is called a "spare" •
Each games consists of ten frames. If you bowl a strike in the tenth frame, you get two more balls. If you throw a spare, you get one more ball.•
Open frames are frames without a strike or spare•Scoring is based on the number of pins you knock down.
However, if you bowl a spare, you get to add the pins in your next ball to that frame.
For strikes, you get the next two balls. •An average of three games is played.
You determine a 3 game average by adding all 3 scores and then dividing that number by 3.•
 */

/* You get 2 balls for every set, so only a maximum of 10 pins can be knocked down in each set. */

export function compute(game: Game): number {
  // Get each state from every frame in the game.
  const frameStates = determineFrameStates(game);
  let total = 0;
  let scores = new Map<number, Score>();

  // First we generate the scores with their corresponding frame states.
  game.forEach((frame: (Frame | LastFrame), index: number) => {
    if (index == game.length - 1) {
      scores.set(index + 1, new Score(index, FrameState.neutral, [frame[0], frame[1], frame[2]]));
    } else {
      // The last frame has special behaviour and therefore needs a slightly different structure.
      scores.set(index + 1, new Score(index, frameStates[index], [frame[0], frame[1]]));
    }
  })

  scores.forEach((score: Score, index: number) => {
    // we check if the current score is everything EXCEPT the last frame.
    if (scores.has(index + 1)) {
      // Important note: we don't need to add the scores if you don't hit all 10
      // pins. They are automatically added in the Score class definition.
      if (score.state == FrameState.strike) {
        const isNextStrike = scores.get(index + 1).state == FrameState.strike;

        // Because having multiples strikes results in a 0 as the second element in a frame
        // we need to skip past that frame and add the next number that isn't a 0.
        // hence the "IsNextStrike" variable.
        if (isNextStrike) {
          score.total += (scores.get(index + 1).points[0] + scores.get(index + 2).points[0]);
        } else {
          score.total += (scores.get(index + 1).points[0] + scores.get(index + 1).points[1]);
        }
      } else if (score.state == FrameState.spare) {
        score.total += scores.get(index + 1).points[0];
      }

      total += score.total;
    } else {
      total += (score.points[0] + score.points[1] + score.points[2]);
    }
  });

  return total;
}

// First we need to know if a frame ended in a strike, spare or normal state.
const determineFrameStates = (game: Game): FrameState[] => {
  const frameStates: FrameState[] = [];

  game.forEach((frame) => {
    if (frame[0] == 10) {
      frameStates.push(FrameState.strike);
    } else if (frame[0] + frame[1] == 10) {
      frameStates.push(FrameState.spare);
    } else {
      frameStates.push(FrameState.neutral);
    }
  });

  return frameStates;
}