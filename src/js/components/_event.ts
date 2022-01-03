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
    private descriptionEl: HTMLElement;

    constructor() {
        super();

        this.dateEl = document.getElementById('date');
        this.descriptionEl = document.getElementById('description');

        if (!this.dateEl || !this.descriptionEl) {
            console.error('Unable find event elements');
            this.init = () => {};
        }
    }

    public init(): void {
        this.updateDate();
        this.updateDescription();
    }

    public rebuild(): void {
        this.init();
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

    private updateDescription(): void {
        const data = this.getTimerData();

        this.descriptionEl.innerHTML = data.description;
    }
}
