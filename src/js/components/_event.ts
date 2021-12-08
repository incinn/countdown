import dayjs from 'dayjs';
import { SitePlugin } from './_plugin';

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

export class EventBlock extends SitePlugin {
    private dateEl: HTMLElement;

    constructor() {
        super();

        this.dateEl = document.getElementById('date');

        if (!this.dateEl) {
            console.error('Unable to start date');
            this.init = () => {};
        }
    }

    public init(): void {
        this.updateDate();
    }

    private updateDate(): void {
        const date = dayjs(this.getDate());

        const day = this.dateEl.querySelector('span.day');
        const month = this.dateEl.querySelector('span.month');
        const year = this.dateEl.querySelector('span.year');

        if (!day || !month || !year) {
            console.error('Unable to find date elements');
            return;
        }

        day.innerHTML = date.date().toString();
        month.innerHTML = months[date.month()];
        year.innerHTML = date.year().toString();
    }
}
