import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import Footer from "./Footer";

function Layout(props) {
    return (
        <div>
            <main className={classes.main}>
                <MainNavigation />
                {props.children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;