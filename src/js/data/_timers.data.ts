import { TargetTimer } from '../models/targetTimer.model';

const SummerSolstice: TargetTimer = {
    date: '21 June 2022 00:00',
    description: 'Summer Solstice ☀️',
    menuText: 'Summer ☀️',
    specialNumber: 6,
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

const TwentyTwo: TargetTimer = {
    date: '22 February 2022 22:22',
    description: '22/02/2022 22:22 🍩❤️',
    menuText: '22 Day 🍩',
    specialNumber: 22,
    specialNumberConfetti: {
        emojis: ['😘', '😍', '❤️', '🍩', '🍊', '😏'],
        emojiSize: 25,
        confettiRadius: 30,
        confettiNumber: 7,
    },
    successText: '❤️ HAPPY TWENTY TWO DAY!!! ❤️',
    successConfetti: {
        emojis: ['😘', '😍', '❤️', '❤️', '❤️', '🍩', '🍊', '😏'],
        emojiSize: 25,
        confettiRadius: 30,
        confettiNumber: 50,
    },
};

const BETrip: TargetTimer = {
    date: '28 April 2022 15:00',
    description: 'Belgium Trip 🍊 ❤️ 🍩',
    menuText: '🇧🇪 ❤️ 🍩',
    specialNumber: 23,
    specialNumberConfetti: {
        emojis: ['😘', '😍', '❤️', '🍩', '🍊', '😏'],
        emojiSize: 25,
        confettiRadius: 30,
        confettiNumber: 7,
    },
    successText:
        'OMG BABE I SEE YOU!!! *pokes* 😍<br />I LOVE YOU MORE THAN ANYTHING!!<br />❤️❤️❤️❤️❤️❤️❤️❤️',
    successConfetti: {
        emojis: ['😘', '❤️', '❤️', '❤️', '🍩', '🍊', '😏'],
        emojiSize: 25,
        confettiRadius: 50,
        confettiNumber: 50,
    },
};

const Christmas: TargetTimer = {
    date: '25 December 2022 00:00 GMT',
    description: 'Christmas 2022 🎄',
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

export const timers: TargetTimer[] = [BETrip, SummerSolstice, Christmas];
