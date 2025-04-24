import "./SearchStyle.css";
import { useEffect, useState } from "react";


function Search() {

    //State for displaying the breed options
    const [breedOptions, setBreedOptions] = useState([]);

    const [resultsData, setResultsData] = useState();

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

    //Hook that paginates results
    useEffect(() => {
        
        console.log("Results outside statements: ", resultsData);

        if(resultsData) {
            console.log("URL for next page: ", resultsData.next);
            setNextUrl(`https://frontend-take-home-service.fetch.com` + resultsData.next);
            
            //Fix this by using an useEffect hook
            console.log("NextURL value: ", nextUrl);

        }
    
    }, [resultsData]);

    return (
        <div id="search_bg">
            <form id="search_form" onSubmit={handleSearch}>
                <label id="breed_label" for="breed">Breed: </label>
                {/* <select name="Breed" id="breed" value={selectedBreed} onChange={handleBreedChange}> */}
                <select name="Breed" id="breed">    
                    <option value="">Select a breed</option>
                    {breedOptions.map((breed, index) => {
                        return <option key={index} value={breed}>{breed}</option>
                    })}
                </select>
                <button id="submit_btn" type="submit">Search</button>
            </form>
        </div>
    )

}

export default Search;