import { useDispatch, useSelector } from "react-redux"
import { getCartItemsAsync, postChangeCartAsync, postChangeCartPageAsync, postRemoveCartAsync } from "../slices/cartSlice"

const useCustomCart = () => {
    const dispatch = useDispatch()

    const cartItems = useSelector(state => state.cartSlice)

    const refreshCart = () => {
        dispatch(getCartItemsAsync())
    }

    const changeCart = (param) =>{
        dispatch(postChangeCartAsync(param))
    }

    const changeCartPage = (param) =>{
        dispatch(postChangeCartPageAsync(param))
    }

    const removeCartItemNo = (param) => {
        dispatch(postRemoveCartAsync(param))
    }

    return {cartItems,refreshCart,changeCart,changeCartPage,removeCartItemNo}
}

export default useCustomCart