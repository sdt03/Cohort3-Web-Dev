import { selector } from "recoil";
import { cardItem } from "./cardItemState";

export const cartTotalSelector = selector({
    key: 'cartTotalSelector',
    get: ({get}) => {
        const cartItem = get(cardItem);

        const total = cardItem.reduce((acc, item)=> acc + item.price*item.quantity, 0).toFixed(2);

        const itemCount = cardItem.reduce((acc, item)=> acc + item.quantity, 0);

        return {total, itemCount};
    }
});