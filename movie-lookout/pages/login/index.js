import AuthForm from '../../components/Auth/AuthForm'
import {useEffect} from "react";
import styles from './index.module.scss';
import ErrorAlert from "../../components/ui/ErrorAlert";

const LoginPage = () => {

    useEffect(() => {
        document.title = `Sign in | Movie Lookout`
    })

    return (
        <div className={styles.auth}>
                <ErrorAlert/>
                <AuthForm/>
        </div>
    );

}

export default LoginPage;