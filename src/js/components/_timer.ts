import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as duration from 'dayjs/plugin/duration';

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

    constructor() {
        dayjs.extend(relativeTime);
        dayjs.extend(duration);

        this.countdownEl = document.getElementById('timer');

        if (!this.countdownEl) {
            console.error('Unable to find timer element');
            this.init = () => {};
        }
    }

    public init(): void {
        this.updateTimer();
        this.timer = setInterval(() => this.updateTimer(), 1000);
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

    private updateTimer(): void {
        const timer = this.calculate(this.belgiumDate);
        console.log(timer);

        let output = '';

        if (timer.years > 0) output += this.formatSegment(timer.years, 'years');
        if (timer.months > 0)
            output += this.formatSegment(timer.months, 'months');
        if (timer.days > 0) output += this.formatSegment(timer.days, 'days');
        if (timer.hours > 0) output += this.formatSegment(timer.hours, 'hours');
        output += this.formatSegment(timer.minutes, 'minutes');
        output += this.formatSegment(timer.seconds, 'seconds');

        if (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0)
            output = 'COMPLETED';

        this.countdownEl.innerHTML = output.trim();
    }

    private formatSegment(time: number, text: string): string {
        let output = '';

        if (time === 22) output += `<span class="special">${time}</span> `;
        else output += `${time} `;

        output += `<span class="text">${text}</span> `;

        return output;
    }
}
