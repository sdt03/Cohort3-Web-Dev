import {atom} from 'recoil'

export const cartItem = atom({
    key: "cartItemState",

    default: [
    {
        id: '1',
        name: 'Airpods Max',
        price: '59990',
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpod-max-202409-thumb-5?wid=282&hei=240&fmt=jpeg&qlt=90&.v=1723166678925',
        rating: '5', quantity: '1',
        reviews: '34502'
    }
    ]
})