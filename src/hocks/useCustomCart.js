import { useDispatch, useSelector } from "react-redux"
import { getCartItemsAsync, postChangeCartAsync, postChangeCartPageAsync } from "../slices/cartSlice"

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

    return {cartItems,refreshCart,changeCart,changeCartPage}
}

export default useCustomCart