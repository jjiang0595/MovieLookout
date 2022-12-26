import styles from './AuthForm.module.scss'
import {useContext, useRef, useState} from "react";
import AuthContext from "../../store/auth-context";
import {useRouter} from "next/router";

const AuthForm = (props) => {
    const router = useRouter();
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
        console.log(process.env.NEXT_PUBLIC_API_KEY)
        event.preventDefault()

        let url;
        if (authType) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_API_KEY}`
        } else {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.NEXT_PUBLIC_API_KEY}`
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: emailInputRef.current.value,
                password: passwordInputRef.current.value,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(data => {
                    let errorMessage = 'Authentication failed!';
                    throw new Error(errorMessage);
                })
            }
        }).then((data) => {
            console.log(data.idToken)
            authCtx.login(data.idToken)
            router.replace('/')
        }).catch((err) => {
            alert(err.message)
        })

    }


    return (
        <div className={styles.auth}>
            <div className={styles.auth__container}>
                <div className={styles.authSelect}>
                    <button className={(authType ? styles.active : '')}
                            onClick={authTypeHandler(true)}>Login
                    </button>
                    <button className={(!authType ? styles.active : '')}
                            onClick={authTypeHandler(false)}>Register
                    </button>
                </div>
                <form onSubmit={submitHandler} className={styles.form}>
                    <p className={styles.form__title}>{authType ? 'Login' : 'Register'}</p>
                    <div className={styles.control}>
                        <svg className={styles.control__icon}>
                            <use href="/sprite.svg#icon-user"></use>
                        </svg>
                        <input ref={emailInputRef} className={styles.control__input} type="email" id="email"
                               placeholder="Email"
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