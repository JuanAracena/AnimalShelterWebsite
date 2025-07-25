import { useState, useEffect } from "react";
import "./MatchStyle.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Match() {

    const location = useLocation();
    const { list } = location.state || {};

    const [matchId, setMatchId] = useState("");
    const [matchData, setMatchData] = useState([]);

    const navigate = useNavigate();

    //API call that matches a dog from the list with the user

    useEffect(() => {

        console.log("List: ", list);
        
        const fetchData = async () => {
            try {
                fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
                    method: "POST",
                    credentials: "include",
                    body:  JSON.stringify(list),
                    headers: {
                        "Content-Type": "application/json"
                    }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("data: ", data["match"]);
                setMatchId(data["match"]);
                // console.log("matchID: ", matchId);
            })
            .catch((error) => console.error("Error fetching match", error));

            }catch (error) {
                console.error("Error occured while finding match: ", error);
            }

            
        }

        fetchData();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!matchId) {
            return;
        }
        
        const fetchDetails = () => {
            try {
                let dog = JSON.stringify([matchId]);
                //console.log("Dog: ", dog);

                fetch(`https://frontend-take-home-service.fetch.com/dogs/`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: dog
        
                })
                .then((response) => response.json())
                .then((data) => {
                    setMatchData(data);
                })
                .catch((error) => console.error("Error fetching details of match", error));
                

            } catch(error) {
                console.error("Error occured while fetching details: ", error);
            }
        }

        fetchDetails();

    }, [matchId]);

    useEffect(() => {
        if(matchData) {
            console.log("matchData updated:", matchData);
        }
    }, [matchData]);

    const handleSubmit = (event) => {
        event.preventDefault();

        navigate("/search");

    }

    const handleLogout = (event) => {
        event.preventDefault();

        try {
            fetch(`https://frontend-take-home-service.fetch.com/auth/logout`, {
                method: "POST",
                credentials: "include"
            })
            .catch((error) => console.error("Error fetching auth token: ", error)
            );

            console.log("Logged out successfully");
            navigate("/");

        } catch(error){
            console.error("Error occured while signing out: ", error);
        }

        
        
    }

    return (
        <div id="match_bg">
            <div id="logo_div">
                <img id="logo" src="design.png" alt="Fetch company logo"></img>
                <button id="log_out" onClick={handleLogout}>Logout</button>
            </div>
            <div id="final_match_div">
                <h1 id="match_title">Your match is:</h1>
                <ul id="match_ul" type="none">
                    {matchData.map((dog, index) => {
                    return <li id="match_li" key={index}>
                        <div id="match_list">
                            <img src={dog["img"]} alt=""></img>
                            <p>Name: {dog["name"]}</p>
                            <p>Age: {dog["age"]}</p>
                            <p>Breed: {dog["breed"]}</p>
                            <p>ZIP: {dog["zip_code"]}</p>
                        </div>
                    </li>
                    })}
                </ul>
            </div>
            <div id="btn_div">
                <button id="back_btn" onClick={handleSubmit}>Go Back</button>
            </div>
            <div id="links">
                <a id="blog" href="https://fetch.com/blog">Blog   </a>{"|"}
                <a id="contact" href="https://help.fetch.com/hc/en-us">  Contact Support   </a>{"|"}
                <a id="news" href="https://business.fetch.com/newsroom">  Newsroom</a>
            </div>
        </div>
    )

}

export default Match;