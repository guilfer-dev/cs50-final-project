// import libraries
import { useState, useEffect } from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { Alert } from 'react-bootstrap';

// import connection to api
import api from "./services/api.js"

// import components and pages
import NavBar from './components/NavBar';
import RecomendModal from './components/RecomendModal'
import Main from './Pages/Main'
import Bookmarks from './Pages/Bookmarks'
import Contributions from './Pages/Contributions'

export default function Router() {
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("categories");
    const [recommendations, setRecommendations] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [shownRecommendations, setShownRecommendations] = useState([]);
    const [shownSubCategories, setShownSubCategories] = useState([]);
    const [contributions, setContributions] = useState([]);
    const [votes, setVotes] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);


    // executes when page first loads
    useEffect(() => {

        (async () => {
            // get list of categories
            const { data: categoriesFromAPI } = await api.get("/categories");
            setCategories(categoriesFromAPI);

            // get sucategories from every category
            const allSubCategories = categoriesFromAPI.map(e => e.subcategories).flat();
            setSubCategories(allSubCategories);

            // set all subcategories to be displayed after the page loads
            setShownSubCategories(allSubCategories);
            setFilteredSubCategories(allSubCategories);

            // get all recommendations from api and set them to be displayed after the page loads
            const { data: recommendationFromAPI } = await api.get("/recommendations");
            setRecommendations(recommendationFromAPI);
            setShownRecommendations(recommendationFromAPI);
        })();


    }, []);

    // gets activity (votes, contribution and bookmarks) whenever the recommendation list change
    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get("/activity");
                setContributions(data.contributions);
                setVotes(data.votes);
                setBookmarks(data.bookmarks);
            }
            catch (err) {
                setContributions([]);
                setVotes([]);
                setBookmarks([]);
            }
        })();
    }, [recommendations]);

    // update  what categories are being filtered and list categories
    useEffect(() => {
        if (categoryFilter !== "categories") {
            const filteredCategory = recommendations.filter(e => e.category.name === categoryFilter);
            const filteredSubCategory = categories.filter(e => e.name === categoryFilter).map(e => e.subcategories).flat();
            setShownRecommendations(filteredCategory);
            setShownSubCategories(filteredSubCategory);
            setFilteredSubCategories(filteredSubCategory);

        } else {
            setShownRecommendations(recommendations);
            setShownSubCategories(subCategories);
            setFilteredSubCategories(subCategories);
        }
    }, [categoryFilter, recommendations]);

    // update recommendations based on the filter
    useEffect(() => {
        const filteredRecommendation = recommendations.filter(e => {
            if (categoryFilter !== "categories") {
                if (e.category.name === categoryFilter &&
                    filteredSubCategories.includes(e.subcategory)) {
                    return true;
                }
            } else if (filteredSubCategories.includes(e.subcategory)) {
                return true;
            }
        });
        setShownRecommendations(filteredRecommendation);

    }, [filteredSubCategories, recommendations]);

    // filter subcategories
    function filterSubCategory(filter, index) {

        if (shownSubCategories.length === filteredSubCategories.length) {
            setFilteredSubCategories([shownSubCategories[index]])
        } else if (filteredSubCategories.includes(filter)) {
            setFilteredSubCategories(filteredSubCategories.filter(subcategory => subcategory !== filter));
        } else {
            setFilteredSubCategories([...filteredSubCategories, shownSubCategories[index]])
        }
    }

    // update subcategories if a new subcategory is introduced
    function updateSubcategories(newSubCategory) {
        setSubCategories([...subCategories, newSubCategory])
    }

    return (
        <BrowserRouter>
            <NavBar states={{
                setShowModal,
                setCategoryFilter,
                categories,
                categoryFilter
            }} />
            <Alert variant="danger" className="mt-2 text-center">Made by Guilherme Fernandes in 2021 as part of Harvard's CS50 final project.</Alert>
            <Routes>
                <Route path="/" element={
                    <Main states={{
                        shownSubCategories,
                        filteredSubCategories,
                        filterSubCategory,
                        shownRecommendations,
                        votes,
                        bookmarks
                    }} />
                } />
                <Route path="bookmarks" element={
                    <Bookmarks states={{
                        recommendations,
                        votes,
                        bookmarks
                    }} />
                } />
                <Route path="contributions" element={
                    <Contributions states={{
                        recommendations,
                        contributions,
                        votes,
                        bookmarks
                    }} />
                } />
                <Route path="*" element={<h1 className='text-center'>404 PAGE NOT FOUND</h1>} />
            </Routes>
            <RecomendModal states={{
                setShowModal,
                setRecommendations,
                updateSubcategories,
                showModal,
                recommendations
            }} />
        </BrowserRouter>
    )
}



