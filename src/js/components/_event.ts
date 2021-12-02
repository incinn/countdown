import dayjs, { Dayjs } from 'dayjs';

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
];

export class EventBlock {
    private date: Dayjs;
    private dateEl: HTMLElement;

    constructor() {
        this.dateEl = document.getElementById('date');

        if (!this.dateEl) {
            console.error('Unable to start date');
            this.init = () => {};
        }
    }

    public init(): void {
        this.updateDate();
    }

    private getDate(): void {
        this.date = dayjs('29 December 2021 12:05 GMT');
    }

    private updateDate(): void {
        this.getDate();

        const day = this.dateEl.querySelector('span.day');
        const month = this.dateEl.querySelector('span.month');
        const year = this.dateEl.querySelector('span.year');

        if (!day || !month || !year) {
            console.error('Unable to find date elements');
            return;
        }

        day.innerHTML = this.date.date().toString();
        month.innerHTML = months[this.date.month()];
        year.innerHTML = this.date.year().toString();
    }
}
