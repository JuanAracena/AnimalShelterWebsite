import { useState } from "react";
import "./LoginStyle.css";
import { useNavigate } from "react-router-dom";


function Login() {

    const [showError, setShowError] = useState(false);


    const navigate = useNavigate();

    //Calls API to get auth token
    const handleSubmit = (event) => {
        try {
            event.preventDefault();

            const name = event.target.name.value;
            const email = event.target.email.value
    
        
            if(name && email) {
                fetch(`https://frontend-take-home-service.fetch.com/auth/login`, {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({
                        name: name,
                        email: email
                    }),
        
                    headers: {
                        "Content-type": "application/json"
                    }
                }).catch((error) => console.error("Error fetching auth token", error)
                );

                console.log("Form submitted");
                navigate("/search");
            } else {
                setShowError(true);
            }
            
    
            
            
        } catch (error) {
            console.error("Error occurred while submitting form", error);
        }
        
        
    };

    return (
        <div id="Login_bg">
            <form id="login_form" onSubmit={handleSubmit}>
                <label id="name_label" for="name">Name: </label>
                <input id="name" type="text"></input>
                <label id="email_label" for="email"> Email: </label>
                <input id="email" type="email"></input>
                <br></br>
                <button id="login_btn" type="submit">Login</button>
            </form>
            {showError === true && (
                <p id= "error_msg">Login error: Please enter a name and email.</p>
            )}          
        </div>
    );

}

export default Login;