import { timers } from '../data/_timers.data';
import { TargetTimer } from '../models/targetTimer.model';
import { SitePlugin } from './_plugin';

export class Switcher extends SitePlugin {
    private switcherListEl: HTMLUListElement;
    private timers: TargetTimer[];

    constructor() {
        super();

        this.timers = timers;
        this.switcherListEl = document.getElementById(
            'switcherList'
        ) as HTMLUListElement;

        if (!this.timers || !this.switcherListEl) {
            console.error('Cannot start switcher');
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            this.init = () => {};
        }
    }

    public init(): void {
        this.buildSwitcherList();
        this.setActive(0);
    }

    public setActive(index: number): void {
        index = +index; // make sure the damn thing is a number
        this.setStorage(this.timers[index]);

        for (let i = 0; i < this.switcherListEl.children.length; i++) {
            const el = this.switcherListEl.children[i];
            el.classList.remove('active');

            if (index === i) {
                el.classList.add('active');
            }
        }
    }

    private buildSwitcherList(): void {
        this.switcherListEl.innerHTML = '';

        this.timers.forEach((timer: TargetTimer, index) => {
            const li = document.createElement('li');
            const button = document.createElement('button');

            button.innerText = timer.menuText;
            button.dataset.index = '' + index;

            button.addEventListener('click', (e) =>
                this.handleSwitcherClick(e)
            );

            li.appendChild(button);

            this.switcherListEl.appendChild(li);
        });
    }

    private handleSwitcherClick(event: Event): void {
        const index = (<HTMLButtonElement>event.target).dataset.index;

        this.setActive(+index);

        const changedTimerEvent = new CustomEvent('changedTimer');
        document.dispatchEvent(changedTimerEvent);
    }

    private setStorage(timer: TargetTimer): void {
        localStorage.setItem('targetDate', timer.date);
        if (timer.specialNumber)
            localStorage.setItem('specialNumber', '' + timer.specialNumber);
        if (timer.specialNumberConfetti)
            localStorage.setItem(
                'specialNumberConfetti',
                JSON.stringify(timer.specialNumberConfetti)
            );
        localStorage.setItem('menuText', timer.menuText);
        localStorage.setItem('successText', timer.successText);
        localStorage.setItem(
            'successConfetti',
            JSON.stringify(timer.successConfetti)
        );
        localStorage.setItem('descriptionText', timer.description);
    }
}
