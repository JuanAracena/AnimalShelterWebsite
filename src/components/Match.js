import { useState, useEffect } from "react";
import "./MatchStyle.css";
import { useLocation } from "react-router-dom";

function Match() {

    const location = useLocation();
    const { list } = location.state || {};

    const [matchId, setMatchId] = useState("");

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
        
    }, []);

    return (
        <div id="match_bg">
            <div id="logo_div">
                <img id="logo" src="design.png" alt="Fetch company logo"></img>
            </div>
            <div id="match_div">
                <h1 id="match_title">Your match is:</h1>
                <p>Match ID: {matchId}</p>
                
                

            </div>
        </div>
    )

}

export default Match;