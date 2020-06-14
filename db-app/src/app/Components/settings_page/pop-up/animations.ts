import {
    trigger, state, style, animate, transition,
} from '@angular/animations';

// Pop up showing animation
export const openCloseAnimation = trigger('openClose', [
    state('open', style({
        opacity: 1,
        transform: 'scale(1)',
    })),
    state('closed', style({
        opacity: 0,
        transform: 'scale(0)',
        display: 'none',
    })),
    transition('open => closed, closed => open', [
        animate('0.25s')
    ]),
]);

// Animation closing
export const openCloseShadeAnimation = trigger('openCloseShade', [
    state('open', style({
        opacity: .2,
    })),
    state('closed', style({
        opacity: 0,
        display: 'none',
    })),
    transition('open => closed, closed => open', [
        animate('0.25s')
    ]),
]);