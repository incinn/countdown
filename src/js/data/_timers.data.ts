import { TargetTimer } from '../models/targetTimer.model';

const BelgiumTrip: TargetTimer = {
    date: '29 December 2021 12:05 GMT',
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

export const timers: TargetTimer[] = [BelgiumTrip];
