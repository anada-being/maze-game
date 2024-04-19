#!/usr/bin/env node

import { select } from "@inquirer/prompts";
import { User } from "./user.js";
import { Map } from "./map.js";

async function main() {
  const map = new Map();
  const user = new User();
  const userChoices = [];
  console.log("\nWelcome to the maze!\nWatch out for traps.\n");
  console.log("The exit is located at", map.goal, "\n");
  let count = 3;

  while (!isGameFinshed(userChoices, map, user)) {
    map.setChoices();
    try {
      const choice = await getUserChoice(map);
      if (!choice) {
        return process.exit();
      }
      count++;
      userChoices.push(choice);
      if (userChoices.length === 5) {
        userChoices.shift();
        if (count % 3 === 0) {
          const result = map.putTrap();
          if (result) {
            console.log("\nI have a bad feeling about something.");
          }
        }
      }
      if (count === 5) {
        console.log("Beware! There might be traps nearby:", map.traps);
        count = 0;
      }
      user.point = user.faceToDirection(choice);
      console.log("You are facing", user.direction);
    } catch (err) {
      console.log("\nHope to see you again for another try!\n");
      process.exit();
    }
  }
  console.log("\nHope to see you again for another try!\n");
}

function isGameFinshed(userChoices, map, user) {
  return (
    isLoop(userChoices) ||
    isTrap(map.traps, user.point) ||
    isGoal(map, user.point)
  );
}

function isLoop(choices) {
  if (
    choices.length !== 4 ||
    choices[0] === "forward" ||
    choices[0] === "back"
  ) {
    return false;
  } else {
    const allSame = (value) => value == choices[0];
    if (choices.every(allSame)) {
      console.log("You're stuck in an endless loop.");
    }
    return choices.every(allSame);
  }
}

function isTrap(traps, point) {
  const trapHit = (trap) => trap.x === point.x && trap.y === point.y;
  if (traps.some(trapHit)) {
    console.log(
      "\nGAMEOVER\nYou fell into a trap!\nTraps:",
      traps,
      "\nYour current location:",
      point,
    );
    return true;
  } else {
    return false;
  }
}

function isGoal(map, point) {
  if (point.x === map.goal.x && point.y === map.goal.y) {
    console.log("\nCongratulations! You've reached the exit!");
    return true;
  } else {
    return false;
  }
}

async function getUserChoice(map) {
  return await select({
    message: "where do you want to go?",
    choices: map.choices.map((choice) => ({
      value: choice,
    })),
  });
}

main();
