import { Timer } from './components/_timer';
import { EventBlock } from './components/_event';
declare var __VERSION: string;

window.onload = () => {
    new Timer().init();
    new EventBlock().init();

    const versionEl = document.getElementById('version');
    versionEl.innerHTML = 'v' + __VERSION;
};
