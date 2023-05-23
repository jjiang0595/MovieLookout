import Error from "../components/layout/Error";
import {useEffect} from "react";
export default function Custom404() {
    useEffect(() => {
        document.title = `Error | Movie Lookout`
    })

    return <Error />
}