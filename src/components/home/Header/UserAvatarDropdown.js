import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { resetUserInfo } from "../../../redux/userSlice"

const UserAvatarDropdown = (props) => { 
    const Dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignOut = () => {
        Dispatch(resetUserInfo())
        navigate("/", { replace: true })
    }

    return (
        <>
            <li
                className="hidden rounded-full border-2 border-white hover:border-slate-300  md:inline-block align-middle w-[40px] md:ml-4 cursor-pointer"
                onClick={props.handleProfileClick}
            >
                <img className="inline-block w-[40px] rounded-full" src={props.userInfo.profileImageUrl} alt={`${props.userInfo.firstname}'s account settings`}/>
            </li>
            {props.displayDropdown && (
                <div className="absolute top-[75px] right-2 w-40 rounded-md h-56 py-2 px-2 border-2 bg-white">
                    <ul>
                        <li
                            className="absolute w-[90%] bottom-2 text-center py-2 px-2 lg:hover:bg-[#E5E5E5] rounded-md cursor-pointer"
                            onClick={handleSignOut}
                        >Sign out</li>
                    </ul>
                </div>
            )}
        </>
    )
}

export default UserAvatarDropdown;
