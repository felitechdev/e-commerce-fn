import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { resetUserInfo } from "../../../redux/userSlice"
import { useEffect, useRef, useState } from "react"
import axios from "axios";

const UserAvatarDropdown = (props) => { 
    const Dispatch = useDispatch()
    const navigate = useNavigate()
    const dropDownRef = useRef()
    const avatarRef = useRef()
    const [displayDropdown, setDisplayDropdown] = useState(false)


    
    useEffect(() => { 
        document.body.addEventListener("click", (e) => {
            if (avatarRef.current && avatarRef.current.contains(e.target) === false ) {
                if (dropDownRef.current && dropDownRef.current.contains(e.target) === false) {
                    return setDisplayDropdown(false)
                }    
            }
        });
        
    }, [])
    
    const handleSignOut = (e) => {
        e.preventDefault()

        if (props.userInfo.logInType === "ByGoogle") {
            axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/logout`).then(() => {
                Dispatch(resetUserInfo())
                // window.open(
                //     `${process.env.REACT_APP_INDEX_PAGE_URL}`,
                //     "_self"
                // )
            }).catch((error) => {
                console.log(error.message);
            })
        } else if (props.userInfo.logInType === "ByEmail") { 
            Dispatch(resetUserInfo())
            navigate("/")
            // window.open(
            //     `${process.env.REACT_APP_INDEX_PAGE_URL}`,
            //     "_self"
            // )
        }

        
    }



    return (
        <>
            <li
                className="hidden rounded-full border-2 border-white hover:border-slate-300  md:inline-block align-middle w-[40px] md:ml-4 cursor-pointer"
                onClick={() => setDisplayDropdown(!displayDropdown)}
                ref={avatarRef}
            >
                <img className="inline-block w-[40px] rounded-full" src={props.userInfo.profile.profileImageUrl} alt={`${props.userInfo.profile.firstname}'s account settings`}/>
            </li>
            {displayDropdown && (
                <div className="absolute top-[75px] right-2 w-40 rounded-md h-56 py-2 px-2 border-2 bg-white"
                    ref={dropDownRef}
                >
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
