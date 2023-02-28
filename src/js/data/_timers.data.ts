import { TargetTimer } from '../models/targetTimer.model';

const SummerSolstice: TargetTimer = {
  date: '21 June 2023 14:58',
  description: 'Summer Solstice ☀️',
  menuText: 'Summer ☀️',
  specialNumber: null,
  specialNumberConfetti: {
    emojis: ['☀️', '☀️', '🌻', '🍺'],
    emojiSize: 25,
    confettiRadius: 30,
    confettiNumber: 7,
  },
  successText: 'Longest day of the year! ☀️',
  successConfetti: {
    emojis: ['☀️', '☀️', '🌻', '🍺'],
    emojiSize: 25,
    confettiRadius: 30,
    confettiNumber: 50,
  },
};

const Christmas: TargetTimer = {
  date: '25 December 2023 00:00',
  description: 'Christmas Day 🎄',
  menuText: 'Christmas 🎄',
  specialNumber: 25,
  specialNumberConfetti: {
    emojis: ['🎄', '🎅', '🎁', '❄️', '⛄'],
    emojiSize: 25,
    confettiRadius: 30,
    confettiNumber: 7,
  },
  successText: '🎄 Merry Christmas! ⛄',
  successConfetti: {
    emojis: ['🎄', '🎅', '🎁', '🎁', '🎁', '❄️', '⛄'],
    emojiSize: 25,
    confettiRadius: 30,
    confettiNumber: 50,
  },
};

export const timers: TargetTimer[] = [SummerSolstice, Christmas];
