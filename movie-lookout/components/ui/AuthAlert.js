import styles from './AuthAlert.module.scss';
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";

const AuthAlert = (props) => {
    const [showAlert, setShowAlert] = useState(true);
    const authCtx = useContext(AuthContext);
    const hideAlert = () => {
        setShowAlert(false);
    }

    useEffect(() => {
        if (props.message) {
            setShowAlert(true);
        }
    }, [authCtx.isLoggedIn])

    return (
        <>
            {showAlert &&
                <div className={styles.alert}>
                    <p className={styles.alert__text}>{props.message}</p>
                    <button className={styles.alert__x} onClick={hideAlert}>x</button>
                </div>}
        </>
    )
}

export default AuthAlert;