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
                    <form className={styles.form}>
                        <p className={styles.form__title}>Login</p>
                        <div className={styles.control}>
                            <input type="email" id="email" placeholder="Email" required/>
                        </div>
                        <div className={styles.control}>
                            <input type="password" id="password" placeholder="Password" required/>
                        </div>
                        <div className={styles.actions}>
                            <button>Login</button>
                        </div>
                    </form>
                    :
                    <form className={styles.form}>
                        <p className={styles.form__title}>Register</p>
                        <div className={styles.control}>
                            <input type="email" id="email" placeholder="Email" required/>
                        </div>
                        <div className={styles.control}>
                            <input type="password" id="password" placeholder="Password" required/>
                        </div>
                        <div className={styles.actions}>
                            <button>Register</button>
                        </div>
                    </form>}
            </div>

        </div>
    )
}

export default AuthForm;