import styles from './AuthForm.module.scss'
import {useContext, useEffect, useRef, useState} from "react";
import AuthContext from "../../store/auth-context";
import {useRouter} from "next/router";
import {
    getAuth,
    setPersistence,
    signInWithEmailAndPassword,
    browserSessionPersistence,
    onAuthStateChanged,
    createUserWithEmailAndPassword
} from "firebase/auth";
import {auth, db} from "../../store/firebaseConfig";
import {ref, set} from "firebase/database";
import AuthCodeMap from "./AuthCodeMap";


// WHAT TO DO
// 1. HIDE ERROR ALERT WHEN CLICK ON OTHER LINKS            ------------ COMPLETED-------------
// 2. HIDE ERROR ALERT IN THE CONSOLE
// 3. STYLE ERROR ALERT


const AuthForm = (props) => {
    const router = useRouter();
    const [authType, setAuthType] = useState(true);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext)

    useEffect(() => {
        router.prefetch('/');
    })

    const authTypeHandler = type => e => {
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
        setAuthType(type);
    }

    const submitHandler = async (event) => {
        event.preventDefault()

        if (!authType) {
            createUserWithEmailAndPassword(auth, emailInputRef.current.value, passwordInputRef.current.value).then((userCredential) => {
                onAuthStateChanged(auth, (user) => {
                    const uid = user.uid;
                    if (user) {
                        const userRef = ref(db, `users/${uid}`);
                        set(userRef, {
                            email: emailInputRef.current,
                            password: passwordInputRef.current,
                        });
                    }
                })
            }).catch((error) => {
                const errorCode = error.code;
                console.log(errorCode)
                router.push({
                    pathname: '/login',
                    query: {
                        message: AuthCodeMap(errorCode),
                    },
                }, '/login');
            })
        } else {
            setPersistence(auth, browserSessionPersistence)
                .then(() => {
                    return signInWithEmailAndPassword(auth, emailInputRef.current.value, passwordInputRef.current.value);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    router.push({
                        pathname: '/login',
                        query: {
                            message: AuthCodeMap(errorCode),
                        },
                    }, '/login');
                })
        }

        router.push({
            pathname: '/',
            query: {
                message: authType ? 'You have been logged in.' : 'You have been signed up.'
            }
        }, '/')
    }

    return (
        <div className={styles.container}>
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

    )
}

export default AuthForm;