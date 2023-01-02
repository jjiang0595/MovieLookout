import AuthForm from '../../components/Auth/AuthForm'
import {useContext, useEffect} from "react";
import {useRouter} from "next/router";
import AuthContext from "../../store/auth-context";

const LoginPage = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const router = useRouter();



    return (
        <AuthForm/>
    );

}

export default LoginPage;