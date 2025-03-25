import { useEffect } from "react";

export default function BuyMeACoffee() {
    useEffect(() => {
        const script = document.createElement("script");
        const div = document.getElementById("supportByBMC");
        script.setAttribute("data-name", "BMC-Widget");
        script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
        script.setAttribute("data-id", "kruton");
        script.setAttribute("data-description", "Support me on Buy me a coffee!");
        script.setAttribute("data-color", "#E3BD33");
        script.setAttribute("data-position", "Right");
        script.setAttribute("data-x_margin", "18");
        script.setAttribute("data-y_margin", "18");
        script.async = true;
        document.head.appendChild(script);
        script.onload = function () {
            const evt = new Event("DOMContentLoaded", {
                bubbles: false,
                cancelable: false
            });
            window.dispatchEvent(evt);
        };

        div?.appendChild(script);
    }, []);

    return <div id="supportByBMC"></div>;
}
