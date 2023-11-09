import { useState } from "react"
import SignInForm from "../components/pageProps/Authentication/SignInForm"
import SignUpForm from "../components/pageProps/Authentication/SignUpForm"
import { Link } from "react-router-dom/"
import { FeliTechLogo_transparent } from "../assets/images"

const Authentication = (props) => { 
    const [openForm, setOpenForm] = useState(props.openForm)

    return (
        <div className="w-[500px] mx-auto h-screen flex items-center justify-center">
            <div className="w-full bg-white flex flex-col gap-4">
                <Link to="/">
                    <img src={FeliTechLogo_transparent} alt="logoImg" className="w-32 mx-auto" />
                </Link>
                {openForm.signin === true ? <SignInForm openForm={openForm} setOpenForm={setOpenForm} /> : ""}
                {openForm.signup === true ? <SignUpForm openForm={openForm} setOpenForm={setOpenForm} /> : ""}
            </div>    
        </div>
    )
}

export default Authentication
