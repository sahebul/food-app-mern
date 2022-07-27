
 import Subheader from "../components/Subheader"
import { CartState } from "../context/Context"
import Orders from "../components/Orders";

function Myorder() {
    const {user}= CartState();

    return (
        <div>
             <Subheader title={"My Orders"}/>
            {
                user && (<Orders/>)
            }
        </div>
    )
}

export default Myorder
