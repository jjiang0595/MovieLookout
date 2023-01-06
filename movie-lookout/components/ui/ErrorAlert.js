import {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import {useRouter} from "next/router";
import styles from './ErrorAlert.module.scss';
const AuthAlert = (props) => {
    const [showAlert, setShowAlert] = useState(false);
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
    }, [router.query.message])

    return (
        <>
            {showAlert &&
                <div className={`${styles.alert}`} >
                    <p className={styles.alert__text}>{router.query.message}</p>
                </div>}
        </>
    )
}

export default AuthAlert;