import styles from './AuthForm.module.scss'

const AuthForm = (props) => {
    return (
        <div className={styles.auth}>
            <div className={styles.auth__container}>
            <div className={styles.authSelect}>
                <button>Login</button>
                <button>Register</button>
            </div>
            <form className={styles.form}>
                <p className={styles.form__title}>Login Page</p>
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
            </div>

        </div>
    )
}

export default AuthForm;