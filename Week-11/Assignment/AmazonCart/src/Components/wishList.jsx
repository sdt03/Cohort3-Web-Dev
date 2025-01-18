import { useState } from "react";
import { cartItemState } from "../store/cartItemState";
import {cartTotalSelector} from "../store/cartTotalSelector";
import { useRecoilState, useRecoilValue } from "recoil";
import { styles } from "./wishListStyles.module";
import { wishItemsState } from '../store/wishItemsState';
import {Header, ProductModal, Sidebar} from "./"

const WishList = () => {
    const {total, itemCount} = useRecoilValue(cartTotalSelector);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const [wishItems, setWishItems] = useRecoilState(wishItemsState);
    const [cartItems, setCartItems] = useRecoilState(cartItemState);
    const [isAdded, setIsAdded] = useState(false);

    const [addedProducts, setAddedProducts] = useState({});

    const addToCart = () => {
        
    }

}