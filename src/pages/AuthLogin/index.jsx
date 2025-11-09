import { Login } from "../../components/Login"
import { Navbar } from "../../components/Navbar"

export const AuthLogin=()=>{
    return (
        <>
        <Navbar/>
        <main className="flex justify-center !pt-35">
            <Login/>
        </main>
        </>
    )
}