import ProfileComponent from "../components/ProfileComponent";
import Subheader from "../components/Subheader"
import Address from "./Address";

function Profile() {
   
    const setInitial=()=>{
        //do nothing
    }
    return (
        <div>
               <Subheader title={"Profile"}/>
               <ProfileComponent/>
               <Address item_count={3} setInitial={setInitial}/>
        </div>
    )
}

export default Profile
