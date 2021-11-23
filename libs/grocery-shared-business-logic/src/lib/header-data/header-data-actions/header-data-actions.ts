import { HeaderButtonPosition, HeaderData } from "../../state/app-state.interface";
import { HeaderType } from 'libs/grocery-shared-business-logic/src/lib/state/app-state.interface';

export const homeHeaderData: HeaderData = {
    title: 'Current Grocery Items',
    buttons: [
        {
            name: 'add',
            route: ['add-list'],
            nextHeaderData: HeaderType.ADD_ITEM_HEADER
        }
    ],
    buttonGroupPosition: HeaderButtonPosition.END
}

export const addItemHeaderData: HeaderData = {
    title: 'Add item to list',
    buttons: [
        {
            name: 'arrow-back',
            route: [''],
            isBack: true,
            nextHeaderData: HeaderType.HOME_HEADER
        }
    ],
    buttonGroupPosition: HeaderButtonPosition.START
}

export const itemDetailHeaderData: HeaderData = {
    title: '',
    buttons: [
        {
            text: '',
            name: 'arrow-back',
            route: [''],
            isBack: true,
            nextHeaderData: HeaderType.HOME_HEADER
        }
    ],
    buttonGroupPosition: HeaderButtonPosition.START
}