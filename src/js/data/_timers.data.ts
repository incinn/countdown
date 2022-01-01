import { TargetTimer } from '../models/targetTimer.model';

const BelgiumTrip: TargetTimer = {
    date: '29 December 2021 12:05 UTC+1',
    description: 'Belgium Trip!!',
    specialNumber: 22,
    specialNumberConfetti: {
        emojis: ['😘', '😍', '❤️', '🍩', '🍊', '😏'],
        emojiSize: 25,
        confettiRadius: 30,
        confettiNumber: 7,
    },
    successText: 'Arrived!!!',
    successConfetti: {
        emojis: ['😘', '😍', '❤️', '❤️', '❤️', '🍩', '🍊', '😏'],
        emojiSize: 25,
        confettiRadius: 30,
        confettiNumber: 50,
    },
};

const Christmas: TargetTimer = {
    date: '25 December 2022 00:00 GMT',
    description: 'Christmas 2022! 🎄',
    specialNumber: 0,
    specialNumberConfetti: {
        emojis: ['🎄', '🎅', '🎁', '❄️', '⛄'],
        emojiSize: 25,
        confettiRadius: 30,
        confettiNumber: 7,
    },
    successText: '🎄 Merry Christmas! ⛄',
    successConfetti: {
        emojis: ['🎄', '🎅', '🎁', '❄️', '⛄'],
        emojiSize: 25,
        confettiRadius: 30,
        confettiNumber: 50,
    },
};

export const timers: TargetTimer[] = [BelgiumTrip, Christmas];
