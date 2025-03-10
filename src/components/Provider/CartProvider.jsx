import React, { useContext, useState } from 'react';
import { PropTypes } from 'prop-types';

export const CartContext = React.createContext();
export const AddCartContext = React.createContext();
export const RemoveCartContext = React.createContext();
export const TotalPriceCartContext = React.createContext();

export function useCart() {
    return useContext(CartContext);
}

export function useAddItemCart() {
    return useContext(AddCartContext);
}

export function useRemoveItemCart () {
    return useContext(RemoveCartContext);
}

export function useTotalPriceCart () {
    return useContext(TotalPriceCartContext);
}

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    function removeItemCart(ItemToRemove, number) {

        setCart(prev => {
            let newArray = prev.map((item) => {
                if (item.id === ItemToRemove.id && ItemToRemove.number > 0) {
                    item.number = number;
                }
                return item;
            })

            newArray = newArray.filter((item) => item.number > 0);
            return newArray;
        })
    }

    function addItemCart(newItem, number) {
        function checkNewItemInCart(oldCart) {
            const ItemIsIn = oldCart.filter((item) => {
                                return item.id === newItem.id
                            })
            return ItemIsIn.length;
        }

        setCart(prev => {
            if (checkNewItemInCart(prev)) {
                return prev.map((item) => {
                    if (item.id === newItem.id) {
                        item.number = number;
                    }
                    return item;
                })
            }
            newItem.number = 1;
            return [...prev, newItem];
        })
    }

    function totalPriceCart() {
        let total = 0;

        cart.forEach(elem => {
            total += elem.price * elem.number;
        })

        return total.toFixed(2);
    }

    return (
        <CartContext.Provider value={cart}>
            <AddCartContext.Provider value={addItemCart}>
                <RemoveCartContext.Provider value={removeItemCart} >
                    <TotalPriceCartContext.Provider value={totalPriceCart()} >
                        { children }
                    </TotalPriceCartContext.Provider>
                </RemoveCartContext.Provider>
            </AddCartContext.Provider>
        </CartContext.Provider>
    )
}

CartProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element)
}

export default CartProvider;