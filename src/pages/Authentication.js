import { useState } from "react"
import SignInForm from "../components/pageProps/Authentication/SignInForm"
import SignUpForm from "../components/pageProps/Authentication/SignUpForm"

const Authentication = (props) => { 
    const [openForm, setOpenForm] = useState(props.openForm)

    return (
        <div className="w-[500px] mx-auto h-screen flex items-center justify-center">
            {openForm.signin === true ? <SignInForm openForm={openForm} setOpenForm={setOpenForm} /> : ""}
            {openForm.signup === true ? <SignUpForm openForm={openForm} setOpenForm={setOpenForm} /> : ""}
        </div>
    )
}

export default Authentication
