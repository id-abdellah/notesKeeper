import "./greeting.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";

const isMobile = window.innerWidth <= 767;

export default function Greeting(props) {

    const menu = useRef(null);
    useEffect(() => {
        if (isMobile) {
            menu.current.addEventListener("click", function () {
                menu.current.classList.toggle("active");
                props.nav.current.classList.toggle("active");
            })
        }
    }, [])


    // Date stuff

    let currentDate = new Date();

    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];;
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    return (
        <div className="greeting">
            <div>
                <h3>Good Morning</h3>
            </div>
            {
                isMobile &&
                <div className="burger-menu" ref={menu} >
                    <FontAwesomeIcon icon={faBars} />
                </div>
            }

        </div>
    )
}