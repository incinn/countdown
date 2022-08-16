import { TargetTimer } from "../models/targetTimer.model";

const SummerSolstice: TargetTimer = {
  date: "21 June 2022 00:00",
  description: "Summer Solstice ☀️",
  menuText: "Summer ☀️",
  specialNumber: 6,
  specialNumberConfetti: {
    emojis: ["☀️", "☀️", "🌻", "🍺"],
    emojiSize: 25,
    confettiRadius: 30,
    confettiNumber: 7,
  },
  successText: "Longest day of the year! ☀️",
  successConfetti: {
    emojis: ["☀️", "☀️", "🌻", "🍺"],
    emojiSize: 25,
    confettiRadius: 30,
    confettiNumber: 50,
  },
};

const Christmas: TargetTimer = {
  date: "25 December 2022 00:00 GMT",
  description: "Christmas 2022 🎄",
  menuText: "Christmas 🎄",
  specialNumber: 25,
  specialNumberConfetti: {
    emojis: ["🎄", "🎅", "🎁", "❄️", "⛄"],
    emojiSize: 25,
    confettiRadius: 30,
    confettiNumber: 7,
  },
  successText: "🎄 Merry Christmas! ⛄",
  successConfetti: {
    emojis: ["🎄", "🎅", "🎁", "🎁", "🎁", "❄️", "⛄"],
    emojiSize: 25,
    confettiRadius: 30,
    confettiNumber: 50,
  },
};

export const timers: TargetTimer[] = [SummerSolstice, Christmas];
