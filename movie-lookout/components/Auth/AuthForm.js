import styles from './AuthForm.module.scss'
import {useState} from "react";

const AuthForm = (props) => {
    const [authType, setAuthType] = useState('login');

    const authTypeHandler = type => e => {
        if (type === 'login') {
            setAuthType('login');
        } else if (type === 'register') {
            setAuthType('register')
        }
    }

    const loginHandler = (event, email, password) => {
        event.preventDefault()

    }

    const registerHandler = (event, email, password) => {
        event.preventDefault();

        if (email.length === 0 || password.length === 0) {
            return alert('Please enter a valid email and password.');
        }
    }

    return (
        <div className={styles.auth}>
            <div className={styles.auth__container}>
                <div className={styles.authSelect}>
                    <button className={(authType === 'login' ? styles.active : '')}
                            onClick={authTypeHandler('login')}>Login
                    </button>
                    <button className={(authType === 'register' ? styles.active : '')}
                            onClick={authTypeHandler('register')}>Register
                    </button>
                </div>
                {authType === 'login' ?
                    <form onSubmit={loginHandler} className={styles.form}>
                        <p className={styles.form__title}>Login</p>
                        <div className={styles.control}>
                            <svg className={styles.control__icon}>
                                <use href="/sprite.svg#icon-user"></use>
                            </svg>
                            <input className={styles.control__input} type="email" id="email" placeholder="Email"
                                   required/>
                        </div>
                        <div className={styles.control}>
                            <svg className={styles.control__icon}>
                                <use href="/sprite.svg#icon-key"></use>
                            </svg>
                            <input className={styles.control__input} type="password" id="password"
                                   placeholder="Password" required/>
                        </div>
                        <div className={styles.actions}>
                            <button className={styles.actions__button}>Login</button>
                        </div>
                    </form>
                    :
                    <form onSubmit={registerHandler} className={styles.form}>
                        <p className={styles.form__title}>Register</p>
                        <div className={styles.control}>
                            <svg className={styles.control__icon}>
                                <use href="/sprite.svg#icon-user"></use>
                            </svg>
                            <input className={styles.control__input} type="email" id="email" placeholder="Email"
                                   required/>
                        </div>
                        <div className={styles.control}>
                            <svg className={styles.control__icon}>
                                <use href="/sprite.svg#icon-key"></use>
                            </svg>
                            <input className={styles.control__input} type="password" id="password"
                                   placeholder="Password" required/>
                        </div>
                        <div className={styles.actions}>
                            <button className={styles.actions__button}>Register</button>
                        </div>
                    </form>}
            </div>

        </div>
    )
}

export default AuthForm;