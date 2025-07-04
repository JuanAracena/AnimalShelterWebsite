import "./SearchStyle.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Search() {

    //State for displaying the breed options
    const [breedOptions, setBreedOptions] = useState([]);

    const [resultsUrl, setResultsUrl] = useState("");

    const [resultsData, setResultsData] = useState();

    const [dogDetails, setDogDetails] = useState([]);

    const [favsList, setFavsList] = useState([]);
    const [isFavsEnabled, setFavsEnabled] = useState(false);

    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(25);

    const [isPrevEnabled, setPrevEnabled] = useState(false);

    const navigate = useNavigate();




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

    useEffect(() => {

        console.log("Length: :", (favsList.length));
        console.log(favsList);
        if(favsList.length === 0){
                setFavsEnabled(false);
        }
    }, [favsList]);

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

            setStartIndex(0);
            setEndIndex(25);


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
            setFavsEnabled(true);

        }

    }

    const navigateNextPage = (url) => {
        console.log("navigateNextPage: ", url);

        
        try {
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
                console.log("Results after clicking next: ", resultsData);

            })

            
            let currUrl = new URL(url);
            console.log("Current initial index: ", currUrl.searchParams.get("from"));
            setStartIndex(currUrl.searchParams.get("from"));

            let newEndIndex = Number(currUrl.searchParams.get("from"));
            newEndIndex += 25;

            setEndIndex(newEndIndex.toString());

            setPrevEnabled(true);

        } catch(error) {
            console.error("Error occurred while navigating to the next page: ", error);
        }
        

    }


    const navigatePrevPage = (url) => {
        console.log("navigatePages: ", url);

        try {
            if(!prevUrl || startIndex === "0") {
                alert("You're on the first page");
                setPrevEnabled(false);
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

            let currUrl = new URL(url);
            

            setStartIndex(currUrl.searchParams.get("from"));

            let newEndIndex = Number(endIndex);
            console.log("Number: ", newEndIndex);
            if(newEndIndex !== 25) {
                newEndIndex -= 25;
            }
            setEndIndex(newEndIndex.toString());
            
            
        }catch (error) {
            console.error("Error occurred while navigating to the previous page: ", error);
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

    const handleNextClick = () => {
        setPrevEnabled(true);
    }


    const findMatch = (event) => {
        
        event.preventDefault();

        console.log("Favs List: ", favsList);

        navigate("/match", {state: {list: favsList} });
        
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
        <div id="search_bg">
            <div id="logo_div">
                <img id="logo" src="design.png" alt="Fetch company logo"></img>
                <button id="log_out" onClick={handleLogout}>Logout</button>
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
                    <button id="prev_btn" disabled={!isPrevEnabled} onClick={() => navigatePrevPage(prevUrl)}>Previous</button>
                    <p id="index">{startIndex} - {endIndex} of {resultsData ? resultsData["total"] : ""}</p>
                    <button id="next_btn" onClick={() => {
                        navigateNextPage(nextUrl);
                        handleNextClick();

                    }}>Next</button>
                </ul>
            </div>

            <div id="match_div">
                <button id="match_btn" disabled={!isFavsEnabled} onClick={findMatch}>Find your Match</button>
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