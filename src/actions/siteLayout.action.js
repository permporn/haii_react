export const TOGGLE_RIGHT_NAV = 'TOGGLE_RIGHT_NAV';
export const PUSH_MAIN_MENU = 'PUSH_MAIN_MENU';


export function toggleRightNav() {
    return {
        type: TOGGLE_RIGHT_NAV
    };
} 
export function pushMainMenu() {
    return {
        type: PUSH_MAIN_MENU
    }
}  