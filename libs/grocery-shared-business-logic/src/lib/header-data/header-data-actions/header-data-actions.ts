import { HeaderButtonPosition, HeaderData } from "../../state/app-state.interface";

export const addItemHeaderData: HeaderData = {
    title: 'Add item to list',
    buttons: [
        {
            name: 'arrow-back',
            route: ['']
        }
    ],
    buttonGroupPosition: HeaderButtonPosition.START
}

export const homeHeaderData: HeaderData = {
    title: 'Current Grocery Items',
    buttons: [
        {
          text: 'Add to list',
          name: 'add',
          route: ['']
        }
    ],
    buttonGroupPosition: HeaderButtonPosition.END,
}

export const itemDetailHeaderData: HeaderData = {
    title: '',
    buttons: [
        {
            text: '',
            name: 'back',
            route: ['']
        }
    ],
    buttonGroupPosition: HeaderButtonPosition.START
}