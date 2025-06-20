import "./SearchStyle.css";
import { useEffect, useState } from "react";



// function navigatePages(url) {
    
//     console.log("navigatePages: ", url);
    

// }

function Search() {

    //State for displaying the breed options
    const [breedOptions, setBreedOptions] = useState([]);

    const [resultsUrl, setResultsUrl] = useState("");

    const [resultsData, setResultsData] = useState();

    const [dogDetails, setDogDetails] = useState([]);

    const [favsList, setFavsList] = useState([]);

    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");




    //API call for getting list of breeds
    useEffect(() => {

        const fetchBreeds = () => {
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

        }



        fetchBreeds();

        const interval = setInterval(fetchBreeds, 1000);

        const timeout = setTimeout(() => {
            clearInterval(interval);
            console.log("Interval stopped");
        }, 1000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        }
        

    }, [])

    const handleSearch = (event) => {
        event.preventDefault();

        try {
            const breed = event.target.breed.value;
            console.log("Breed from const variable: ", breed);

            const zip = event.target.zipcode.value;
            console.log("Zipcode from const variable: ", zip);

            const minAge = event.target.agemin.value;
            console.log("Minimum age from const variable: ", minAge)

            const maxAge = event.target.agemax.value;
            console.log("Maximum age from const variable: ", maxAge);

            //Checks if the user selected a breed and searches for IDs that match the given breed
            //Otherwise, it searches the IDs of all dogs
            if(breed && zip && minAge && maxAge){
                
                fetch(`https://frontend-take-home-service.fetch.com/dogs/search?breeds=${breed}&zipCodes=${zip}&ageMin=${minAge}&ageMax=${maxAge}&sort=breed:asc`, {
                    method: "GET",
                    credentials: "include",

                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {                    
                    setResultsData(data);
                    console.log("Results inside if(all filters) statement", resultsData);

                })
            }else if(breed && zip && minAge){
                fetch(`https://frontend-take-home-service.fetch.com/dogs/search?breeds=${breed}&zipCodes=${zip}&ageMin=${minAge}&sort=breed:asc`, {
                    method: "GET",
                    credentials: "include",

                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {                    
                    setResultsData(data);
                    console.log("Results inside if(breed && zip && minAge) statement", resultsData);

                })
            }else if(breed && zip && maxAge){
                fetch(`https://frontend-take-home-service.fetch.com/dogs/search?breeds=${breed}&zipCodes=${zip}&ageMax=${maxAge}&sort=breed:asc`, {
                    method: "GET",
                    credentials: "include",

                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {                    
                    setResultsData(data);
                    console.log("Results inside if(breed && zip && maxAge) statement", resultsData);

                })
            }else if (zip && minAge && maxAge){
                fetch(`https://frontend-take-home-service.fetch.com/dogs/search?zipCodes=${zip}&ageMin=${minAge}&ageMax=${maxAge}&sort=breed:asc`, {
                    method: "GET",
                    credentials: "include",

                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {                    
                    setResultsData(data);
                    console.log("Results inside if(zip && minAge && maxAge) statement", resultsData);

                })
            }else if(breed && minAge && maxAge){
                fetch(`https://frontend-take-home-service.fetch.com/dogs/search?breeds=${breed}&ageMin=${minAge}&ageMax=${maxAge}&sort=breed:asc`, {
                    method: "GET",
                    credentials: "include",

                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {                    
                    setResultsData(data);
                    console.log("Results inside if(breed && minAge && maxAge) statement", resultsData);

                })
            }else if(breed && zip){
                fetch(`https://frontend-take-home-service.fetch.com/dogs/search?breeds=${breed}&zipCodes=${zip}&sort=breed:asc`, {
                    method: "GET",
                    credentials: "include",

                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {                    
                    setResultsData(data);
                    console.log("Results inside if(breed && zip) statement", resultsData);

                })
            }else if(breed && minAge){
                fetch(`https://frontend-take-home-service.fetch.com/dogs/search?breeds=${breed}&ageMin=${minAge}&sort=breed:asc`, {
                        method: "GET",
                        credentials: "include",

                    })
                    .then((response) => {
                        setResultsUrl(response.url);
                        return response.json();
                    
                    })
                    .then((data) => {                    
                        setResultsData(data);
                        console.log("Results inside if(breed && minAge) statement", resultsData);

                    })
            
                    
            }else if(breed && maxAge){
                fetch(`https://frontend-take-home-service.fetch.com/dogs/search?breeds=${breed}&ageMax=${maxAge}&sort=breed:asc`, {
                    method: "GET",
                    credentials: "include",

                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {                    
                    setResultsData(data);
                    console.log("Results inside if(breed && maxAge) statement", resultsData);

                })
            }else if(zip && minAge){
                fetch(`https://frontend-take-home-service.fetch.com/dogs/search?zipCodes=${zip}&ageMin=${minAge}&sort=breed:asc`, {
                    method: "GET",
                    credentials: "include",

                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {                    
                    setResultsData(data);
                    console.log("Results inside if(zip && minAge) statement", resultsData);

                })
            }else if(zip && maxAge){
                fetch(`https://frontend-take-home-service.fetch.com/dogs/search?zipCodes=${zip}&ageMax=${maxAge}&sort=breed:asc`, {
                    method: "GET",
                    credentials: "include",

                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {                    
                    setResultsData(data);
                    console.log("Results inside if(zip and maxAge) statement", resultsData);

                })
            }else if(minAge && maxAge){
                fetch(`https://frontend-take-home-service.fetch.com/dogs/search?ageMin=${minAge}&ageMax=${maxAge}&sort=breed:asc`, {
                    method: "GET",
                    credentials: "include",

                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {                    
                    setResultsData(data);
                    console.log("Results inside if(minAge && maxAge) statement", resultsData);

                })
            }else if(breed) {
                fetch(`https://frontend-take-home-service.fetch.com/dogs/search?breeds=${breed}&sort=breed:asc`, {
                    method: "GET",
                    credentials: "include",

                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {                    
                    setResultsData(data);
                    console.log("Results inside if(breed) statement", resultsData);

                })
            }else if(zip) {
                fetch(`https://frontend-take-home-service.fetch.com/dogs/search?zipCodes=${zip}&sort=breed:asc`, {
                    method: "GET",
                    credentials: "include",

                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {                    
                    setResultsData(data);
                    console.log("Results inside if(zip) statement", resultsData);

                })
            }else if(minAge){
                fetch(`https://frontend-take-home-service.fetch.com/dogs/search?ageMin=${minAge}&sort=breed:asc`, {
                    method: "GET",
                    credentials: "include",

                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {                    
                    setResultsData(data);
                    console.log("Results inside if(minAge) statement", resultsData);

                })
            }else if (maxAge){
                fetch(`https://frontend-take-home-service.fetch.com/dogs/search?ageMax=${maxAge}&sort=breed:asc`, {
                    method: "GET",
                    credentials: "include",

                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {                    
                    setResultsData(data);
                    console.log("Results inside if(maxAge) statement", resultsData);

                })
            }else {
                console.log("Else Statement");
                fetch(`https://frontend-take-home-service.fetch.com/dogs/search?sort=breed:asc`, {
                    method: "GET",
                    credentials: "include",
                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {
                    setResultsData(data);
                    console.log("Results inside else statement", resultsData);
                })
            }

            if(prevUrl) {
                setPrevUrl("");
            }


        }catch (error) {
            console.error("Error occurred while searching", error);
        }
        
    }

    const handleSort = (event) => {
        event.preventDefault();
        console.log("Url that's going to be used to order the data: ", resultsUrl);

        try {
            const sortBreed = event.target.sort_breed.checked;
            const sortName = event.target.sort_name.checked;
            const sortAge = event.target.sort_age.checked;

            const sortAsc = event.target.sort_asc.checked;
            const sortDesc = event.target.sort_desc.checked;

            console.log("value stored in sort_breed: ", sortBreed)
            
            if((sortBreed === true) || (sortBreed === true && sortAsc === true)) {
                let newUrl = new URL(resultsUrl);


                newUrl.searchParams.set("sort", "breed:asc")
                // console.log(newUrl.searchParams.set("sort", "breed:asc"));

                console.log("New URL: ", newUrl.toString());
                

                fetch(`${newUrl.toString()}`, {
                    method: "GET",
                    credentials: "include",
                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {
                    setResultsData(data);
                    console.log("Results after sorting by breed and in ascending order", resultsData);
                })
            }

            if((sortBreed === true && sortDesc === true)) {
                let newUrl = new URL(resultsUrl);

                newUrl.searchParams.set("sort", "breed:desc")

                fetch(`${newUrl.toString()}`, {
                    method: "GET",
                    credentials: "include",
                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {
                    setResultsData(data);
                    console.log("Results after sorting by breed and in descending order", resultsData);
                })

            }

            if((sortName === true) || (sortName === true && sortAsc === true)) {
                let newUrl = new URL(resultsUrl);


                newUrl.searchParams.set("sort", "name:asc")

                console.log("New URL: ", newUrl.toString());
                

                fetch(`${newUrl.toString()}`, {
                    method: "GET",
                    credentials: "include",
                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {
                    setResultsData(data);
                    console.log("Results after sorting by name and in ascending order", resultsData);
                })
            }

            if((sortName === true && sortDesc === true)) {
                let newUrl = new URL(resultsUrl);

                newUrl.searchParams.set("sort", "name:desc")

                fetch(`${newUrl.toString()}`, {
                    method: "GET",
                    credentials: "include",
                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {
                    setResultsData(data);
                    console.log("Results after sorting by name and in descending order", resultsData);
                })

            }

            if((sortAge === true) || (sortAge === true && sortAsc === true)) {
                let newUrl = new URL(resultsUrl);


                newUrl.searchParams.set("sort", "age:asc")

                console.log("New URL: ", newUrl.toString());
                

                fetch(`${newUrl.toString()}`, {
                    method: "GET",
                    credentials: "include",
                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {
                    setResultsData(data);
                    console.log("Results after sorting by age and in ascending order", resultsData);
                })
            }

            if((sortAge === true && sortDesc === true)) {
                let newUrl = new URL(resultsUrl);

                newUrl.searchParams.set("sort", "age:desc")

                fetch(`${newUrl.toString()}`, {
                    method: "GET",
                    credentials: "include",
                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {
                    setResultsData(data);
                    console.log("Results after sorting by age and in descending order", resultsData);
                })

            }

        }catch(error) {
            console.error("Error occurred while sorting results", error);
        }
        


    }

    const addToFavs = (event, idStr) => {

        event.preventDefault();
        console.log("Add to favs id: ", idStr);

        if(favsList.includes(idStr)){

            setFavsList((prev) => prev.filter((i) => i !== idStr));

        } else {
            setFavsList((prev) => [...prev, idStr]);

        }

    }

    const navigatePages = (url) => {
        console.log("navigatePages: ", url);

        // setResultsUrl(url);

        try {
            if(!prevUrl) {
                console.log("There isn't a previous page");
            }else {
                fetch(`${url}`, {
                    method: "GET",
                    credentials: "include",

                })
                .then((response) => {
                    setResultsUrl(response.url);
                    return response.json();
                    
                })
                .then((data) => {                    
                    setResultsData(data);
                    console.log("Results after clicking previous or next: ", resultsData);

                })
            }

            
        }catch (error) {
            console.error("Error occurred while navigating pages", error);
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
            <div id="logo_div">
                <img id="logo" src="design.png" alt="Fetch company logo"></img>
            </div>
            <div id="filter_div">
                <h1 id="filter_title">Filters</h1>
                <form id="search_form" onSubmit={handleSearch}>
                    <label id="breed_label" for="breed">Breed: </label>
                    <select name="Breed" id="breed">    
                        <option value="">Select a breed</option>
                        {breedOptions.map((breed, index) => {
                            return <option key={index} value={breed}>{breed}</option>
                        })}
                    </select>
                    <label id="zipcode_label" for="zipcode">ZIP code: </label>
                    <input id="zipcode" type="text"></input>
                    <label id="agemin_label" for="agemin">Minimum age: </label>
                    <input id="agemin" type="text"></input>
                    <label id="agemax_label" for="agemax">Maximum age: </label>
                    <input id="agemax" type="text"></input>
                <button id="submit_btn" type="submit">Search</button>
                </form>
            </div>

            <div id="sort_div">
                <h3 id="sort_title">Sort</h3>
                <form id="sort_form" onSubmit={handleSort}>
                    <label id="sort_breed_label" for="sort_breed">Breed</label>
                    <input id="sort_breed" type="radio" name="sortOption" value="breed"></input>
                    
                    <label id="sort_name_label" for="sort_name">Name</label>
                    <input id="sort_name" type="radio" name="sortOption" value="name"></input>
                    
                    <label id="sort_age_label" for="sort_age">Age</label>
                    <input id="sort_age" type="radio" name="sortOption" value="age"></input>
                    
                    <label id="asc_label" for="asc_option">Ascending</label>
                    <input id="sort_asc" type="radio" name="sortOrder" value="asc"></input>
                    
                    <label id="desc_label" for="desc_option">Descending</label>
                    <input id="sort_desc" type="radio" name="sortOrder" value="desc"></input>                 
                <button id="sort_btn" type="submit">Sort</button>
                </form>
            </div>
            
            
            <div id="display_dogs">
                
                <ul id="dog_list" type="none">
                    {dogDetails.map((dog, index) => {
                        const isClicked = favsList.includes(dog["id"]);

                        return <li id="dog_li" key={index}>
                            <div id="li_div">
                                <img src={dog["img"]} alt=""></img>
                                <p>Name: {dog["name"]}</p>
                                <p>Age: {dog["age"]}</p>
                                <p>Breed: {dog["breed"]}</p>
                                <p>ZIP: {dog["zip_code"]}</p>
                                <button id="li_btn" onClick={(e) => addToFavs(e, dog["id"])}>
                                    {isClicked ? "Remove" : "Add to Favorites"}
                                    </button>

                            </div>
                        </li>
                    })}
                </ul>
            </div>

            <div id="btn_div">
                <ul id="btn_ul">
                    <button id="prev_btn" onClick={() => navigatePages(prevUrl)}>Previous</button>
                    <button id="next_btn" onClick={() => navigatePages(nextUrl)}>Next</button>
                </ul>
            </div>

            <div id="match_div">
                <button id="match_btn">Find your Match</button>
            </div>

            <div id="links">
                <a id="blog" href="https://fetch.com/blog">Blog   </a>{"|"}
                <a id="contact" href="https://help.fetch.com/hc/en-us">  Contact Support   </a>{"|"}
                <a id="news" href="https://business.fetch.com/newsroom">  Newsroom</a>
            </div>
            
        </div>
    )

}

export default Search;