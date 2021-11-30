import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import JSConfetti from 'js-confetti';

interface CountdownTimer {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export class Timer {
    private belgiumDate = '29 December 2021 12:05 GMT';
    private countdownEl: HTMLElement;
    private timer: any;
    private confetti: JSConfetti;

    constructor() {
        dayjs.extend(relativeTime);
        dayjs.extend(duration);

        this.countdownEl = document.getElementById('timer');
        this.confetti = new JSConfetti();

        if (!this.countdownEl) {
            console.error('Unable to find timer element');
            this.init = () => {};
        }
    }

    public init(): void {
        this.updateTimer();
        this.timer = setInterval(() => this.updateTimer(), 1000);
    }

    private updateTimer(): void {
        const timer = this.calculate(this.belgiumDate);
        console.log(timer);

        let output = '';

        if (timer.years > 0) output += this.formatSegment(timer.years, 'year');
        if (timer.months > 0)
            output += this.formatSegment(timer.months, 'month');
        if (timer.days > 0) output += this.formatSegment(timer.days, 'day');
        if (timer.hours > 0) output += this.formatSegment(timer.hours, 'hour');
        output += this.formatSegment(timer.minutes, 'minute');
        output += this.formatSegment(timer.seconds, 'second');

        if (timer.hours <= 0 && timer.minutes <= 0 && timer.seconds <= 0) {
            output = 'COMPLETED';
            this.timerComplete();
        }
        this.countdownEl.innerHTML = output.trim();
    }

    private calculate(target: string): CountdownTimer {
        const raw = dayjs
            .duration(dayjs(target).diff(dayjs()))
            .format('Y;M;D;H;m;s;');

        const data = raw.split(';');

        return {
            years: +data[0],
            months: +data[1],
            days: +data[2],
            hours: +data[3],
            minutes: +data[4],
            seconds: +data[5],
        };
    }

    private formatSegment(time: number, text: string): string {
        let output = '';

        if (time != 1) text += 's';

        if (time === 22) {
            output += `<span class="special">${time}</span> `;
            this.confetti.addConfetti({
                emojis: ['😘', '😍', '❤️', '❤️', '🍩', '🍊', '😏'],
                emojiSize: 25,
                confettiRadius: 30,
                confettiNumber: 7,
            });
        } else output += `${time} `;

        output += `<span class="text">${text}</span> `;

        return output;
    }

    private timerComplete(): void {
        clearInterval(this.timer);
        const timer = setInterval(
            () =>
                this.confetti.addConfetti({
                    emojis: ['😘', '😍', '❤️', '❤️', '🍩', '🍊', '😏'],
                    emojiSize: 25,
                    confettiRadius: 30,
                    confettiNumber: 50,
                }),
            2000
        );
    }
}
