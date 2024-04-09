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
  map.traps.push(map.trap);
  map.putTrap(5);

  let count = 2;

  while (!isGameFinshed(userChoices, map, user)) {
    map.setChoices();
    const choice = await getUserChoice(map);
    if (!choice) {
      return process.exit();
    }
    count++;
    if (count === 5) {
      console.log("Beware! There might be traps nearby:", map.traps);
      count = 0;
    }
    userChoices.push(choice);
    if (userChoices.length === 5) {
      userChoices.shift();
      if (count % 3 === 0) {
        const result = map.putTrap(count);
        if (result) {
          console.log("\nI have a bad feeling about something.");
        }
      }
    }
    user.point = user.faceToDirection(choice);
    console.log("You are facing", user.direction);
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
  try {
    return await select({
      message: "where do you want to go?",
      choices: map.choices.map((choice) => ({
        value: choice,
      })),
    });
  } catch (err) {
    console.log("\nHope to see you again for another try!\n");
    return false;
  }
}

main();
