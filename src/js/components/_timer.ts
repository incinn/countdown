import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

export class Timer {
    belgiumDate = '29 December 2021 12:05 GMT';

    constructor() {
        dayjs.extend(relativeTime);
    }

    public init(): void {
        console.log('timer started');

        this.calculate();
    }

    private calculate(): void {
        // https://stackoverflow.com/questions/66639760/dayjs-diff-between-two-date-in-day-and-hours
        const date1 = dayjs();
        const date2 = dayjs(this.belgiumDate);
        const diff = date2.diff(date1, 'day', true);

        console.log('obtained', diff);

        const days = Math.floor(diff);
        const hours = Math.floor((diff - days) * 24);

        console.log(`${days} days, ${hours} hours`);
    }
}
