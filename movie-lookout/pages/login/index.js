import AuthForm from '../../components/Auth/AuthForm'
import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import AuthContext from "../../store/auth-context";
import styles from './index.module.scss';
import ErrorAlert from "../../components/ui/ErrorAlert";

const LoginPage = () => {
    const authCtx = useContext(AuthContext);

    return (
        <div className={styles.auth}>
                <ErrorAlert/>
                <AuthForm/>
        </div>
    );

}

export default LoginPage;