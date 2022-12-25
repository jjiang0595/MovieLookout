import styles from './AuthForm.module.scss'
import {useContext, useRef, useState} from "react";
import AuthContext from "../../store/auth-context";

const AuthForm = (props) => {
    const [authType, setAuthType] = useState(true);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext)

    const authTypeHandler = type => e => {
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
        setAuthType(type);
    }

    const submitHandler = (event) => {
        event.preventDefault()

        if(authType) {

        } else {

        }

    }


    return (
        <div className={styles.auth}>
            <div className={styles.auth__container}>
                <div className={styles.authSelect}>
                    <button className={(authType ? styles.active : '')}
                            onClick={authTypeHandler(true)}>Login
                    </button>
                    <button className={(!authType? styles.active : '')}
                            onClick={authTypeHandler(false)}>Register
                    </button>
                </div>
                    <form onSubmit={submitHandler} className={styles.form}>
                        <p className={styles.form__title}>{authType ? 'Login' : 'Register'}</p>
                        <div className={styles.control}>
                            <svg className={styles.control__icon}>
                                <use href="/sprite.svg#icon-user"></use>
                            </svg>
                            <input ref={emailInputRef} className={styles.control__input} type="email" id="email" placeholder="Email"
                                   required/>
                        </div>
                        <div className={styles.control}>
                            <svg className={styles.control__icon}>
                                <use href="/sprite.svg#icon-key"></use>
                            </svg>
                            <input ref={passwordInputRef} className={styles.control__input} type="password" id="password"
                                   placeholder="Password" required/>
                        </div>
                        <div className={styles.actions}>
                            <button className={styles.actions__button}>{authType ? 'Login' : 'Register'}</button>
                        </div>
                    </form>

            </div>

        </div>
    )
}

export default AuthForm;