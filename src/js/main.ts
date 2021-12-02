import { DateEl } from './components/_date';
import { Timer } from './components/_timer';
declare var __VERSION: string;

window.onload = () => {
    new Timer().init();
    new DateEl().init();

    const versionEl = document.getElementById('version');
    versionEl.innerHTML = __VERSION;
};
