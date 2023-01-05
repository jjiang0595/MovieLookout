import styles from './AuthAlert.module.scss';
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import {useRouter} from "next/router";
import {auth} from '../../store/firebaseConfig';

const AuthAlert = (props) => {
    const [showAlert, setShowAlert] = useState(true);
    const [alertMessage, setAlertMessage] = useState(null);
    const authCtx = useContext(AuthContext);
    const user = auth.currentUser;
    const router = useRouter();

    const hideAlert = () => {
        setShowAlert(false);
    }

    useEffect(() => {
            if (router.query.message !== undefined) {
                setAlertMessage(router.query.message);
                setShowAlert(true);
            } else {
                hideAlert();
            }
        }, [authCtx.isLoggedIn, router.query.message]
    )

    return (
        <>
            {showAlert &&
                <div className={`${styles.alert}`}>
                    <p className={styles.alert__text}>{alertMessage}</p>
                    <button className={styles.alert__x} onClick={hideAlert}>x</button>
                </div>}
        </>
    )
}

export default AuthAlert;