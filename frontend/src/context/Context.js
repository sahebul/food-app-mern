import { createContext,useReducer,useContext,useState,useEffect } from "react"
import { cartReducer } from "./Reducer";
import { useNavigate } from "react-router-dom";
const Cart = createContext();
const Context = ({children}) => {
    
  const [user,setUser]=useState()
  const [state, dispatch] = useReducer(cartReducer, {
      cart:[]
  })
  const navigate = useNavigate();
  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("userdata"));
    console.log("requested user info::"+JSON.stringify(userInfo))
    setUser(userInfo);
  },[navigate]  )
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userdata"));
    setUser(userInfo);
  }, [])
    return (
        <Cart.Provider value={{state,dispatch,user,setUser}}>
            {children}
        </Cart.Provider>
    )
}

export default Context


//export the contex
export const CartState=()=>{
    return useContext(Cart);
}
