import "./SearchStyle.css";
import { useEffect, useState } from "react";


function navigatePages(url) {

}

function Search() {

    //State for displaying the breed options
    const [breedOptions, setBreedOptions] = useState([]);

    const [resultsData, setResultsData] = useState();

    const [dogDetails, setDogDetails] = useState([]);

    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");


    //API call for getting list of breeds
    useEffect(() => {

        fetch(`https://frontend-take-home-service.fetch.com/dogs/breeds`, {
            method: "GET",
            credentials: "include"
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setBreedOptions(data);
        })
        .catch((err) => {
            console.error("Error: ", err);
        });

    }, [])

    const handleSearch = (event) => {
        event.preventDefault();

        try {
            const breed = event.target.breed.value;
            console.log("Breed from const variable: ", breed);

            //Checks if the user selected a breed and searches for IDs that match the given breed
            //Otherwise, it searches the IDs of all dogs
            if(breed) {
                fetch(`https://frontend-take-home-service.fetch.com/dogs/search?${breed}`, {
                    method: "GET",
                    credentials: "include",

                })
                .then((response) => response.json())
                .then((data) => {                    
                    setResultsData(data);
                    console.log("Results inside if statement", resultsData);

                })
            }else {
                console.log("Else Statement");
                fetch(`https://frontend-take-home-service.fetch.com/dogs/search`, {
                    method: "GET",
                    credentials: "include",
                })
                .then((response) => response.json())
                .then((data) => {
                    setResultsData(data);
                    console.log("Results inside else statement", resultsData);
                })
            }


        }catch (error) {
            console.error("Error occurred while seraching", error);
        }
        
    }

    //Hook that paginates results and sets the url for the next and previous pages
    useEffect(() => {
        
        console.log("Results outside statements: ", resultsData);

        if(resultsData) {
            console.log("URL for next page: ", resultsData.next);
            setNextUrl(`https://frontend-take-home-service.fetch.com` + resultsData.next);
            
            if("prev" in resultsData) {
                setPrevUrl(`https://frontend-take-home-service.fetch.com` + resultsData.prev);
            }
            
            let dogIds = JSON.stringify(resultsData.resultIds);

            fetch(`https://frontend-take-home-service.fetch.com/dogs/`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: dogIds
    
            })
            .then((response) => response.json())
            .then((data) => {
                setDogDetails(data);
            })
            .catch((error) => console.error("Error fetching dogs", error));

            // let resultsArr = [];
            // resultsArr = searchDogs(resultsData.resultIds);

        }
    
    }, [resultsData]);

    console.log("Decoded Ids: ", dogDetails);
    console.log("NextURL value: ", nextUrl);
    console.log("PrevURL value: ", prevUrl);

    return (
        <div id="search_bg">
            <form id="search_form" onSubmit={handleSearch}>
                <label id="breed_label" for="breed">Breed: </label>
                <select name="Breed" id="breed">    
                    <option value="">Select a breed</option>
                    {breedOptions.map((breed, index) => {
                        return <option key={index} value={breed}>{breed}</option>
                    })}
                </select>
                <button id="submit_btn" type="submit">Search</button>
            </form>
            
            <div id="display_dogs">
                <ol id="dog_list" type="A">
                    {dogDetails.map((dog, index) => {
                        return <li id="dog_il" key={index}>
                            <div>
                                <p>{dog["name"]}</p>
                                {/* <p>{dog["img"]}</p>
                                <p>{dog["age"]}</p>
                                <p>{dog["breed"]}</p>
                                <p>{dog["zip_code"]}</p> */}

                            </div>
                        </li>
                    })}
                </ol>
            </div>

            <button id="next_btn" onClick={navigatePages(nextUrl)}>Next</button>
            <button id="prev_btn" onClick={navigatePages(prevUrl)}>Previous</button>
        </div>
    )

}

export default Search;