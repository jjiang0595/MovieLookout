import styles from './AuthAlert.module.scss';
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import {useRouter} from "next/router";

const AuthAlert = (props) => {
    const [showAlert, setShowAlert] = useState(true);
    const authCtx = useContext(AuthContext);
    const router = useRouter();

    const hideAlert = () => {
        setShowAlert(false);
    }

    useEffect(() => {
        if (router.query.message !== undefined) {
            setShowAlert(true);
        } else {
            hideAlert();
        }
    }, [authCtx.isLoggedIn])

    return (
        <>
            {showAlert &&
                <div className={`${styles.alert}`}>
                    <p className={styles.alert__text}>{router.query.message}</p>
                    <button className={styles.alert__x} onClick={hideAlert}>x</button>
                </div>}
        </>
    )
}

export default AuthAlert;