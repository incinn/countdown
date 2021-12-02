import { DateEl } from './components/_date';
import { Timer } from './components/_timer';

window.onload = () => {
    new Timer().init();
    new DateEl().init();
};
