import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import JSConfetti from 'js-confetti';
import { SitePlugin } from './_plugin';
import { TargetTimer } from '../models/targetTimer.model';

interface CountdownTimer {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export class Timer extends SitePlugin {
    private countdownEl: HTMLElement;
    private _timer: any;
    private confetti: JSConfetti;
    private data: TargetTimer;

    constructor() {
        super();

        dayjs.extend(relativeTime);
        dayjs.extend(duration);

        this.countdownEl = document.getElementById('timer');
        this.confetti = new JSConfetti();

        if (!this.countdownEl || !this.confetti) {
            console.error('Unable to start timer');
            this.init = () => {};
        }
    }

    public init(): void {
        this.data = this.getTimerData();

        this.updateTimer();
        this._timer = setInterval(() => this.updateTimer(), 1000);
    }

    public rebuild(): void {
        this.init();
    }

    private updateTimer(): void {
        const timer = this.calculate(this.data.date);

        let output = '';

        if (timer.years > 0) output += this.formatSegment(timer.years, 'year');
        if (timer.months > 0)
            output += this.formatSegment(timer.months, 'month');
        if (timer.days > 0) output += this.formatSegment(timer.days, 'day');
        if (timer.hours > 0) output += this.formatSegment(timer.hours, 'hour');
        output += this.formatSegment(timer.minutes, 'minute');
        output += this.formatSegment(timer.seconds, 'second');

        if (
            timer.years <= 0 &&
            timer.days <= 0 &&
            timer.hours <= 0 &&
            timer.minutes <= 0 &&
            timer.seconds <= 0
        ) {
            output = `<span class="completed">${this.data.successText}</span>`;
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
        let output = '<div class="segment">';

        if (time != 1) text += 's';

        if (time === this.data.specialNumber) {
            output += `<span class="highlight">${time}</span> `;
            this.confetti.addConfetti(this.data.specialNumberConfetti);
        } else output += `${time} `;

        output += `<span class="text">${text}</span></div>`;

        return output;
    }

    private timerComplete(): void {
        clearInterval(this._timer);
        this._timer = setInterval(
            () => this.confetti.addConfetti(this.data.successConfetti),
            2200
        );
    }
}
