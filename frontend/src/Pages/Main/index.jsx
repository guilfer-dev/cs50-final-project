// import libraries
import { useState, useEffect } from 'react';

// import connection to api
import api from "../../services/api.js"

// import components
import NavBar from '../../components/NavBar'
import RecommendationCard from '../../components/RecommendationCard'
import RecomendModal from '../../components/RecomendModal'

// import styles
import { Container, Alert, Card, Badge } from 'react-bootstrap';
import './styles.css'

export default function Main() {

  // new recommmendation modal
  const [showModal, setShowModal] = useState(false);

  // filters
  const [categoryFilter, setCategoryFilter] = useState("categories")
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  // api data
  const [recommendations, setRecommendations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // data shown on screen after filters
  const [shownRecommendations, setShownRecommendations] = useState([]);
  const [shownSubCategories, setShownSubCategories] = useState([]);


  // fetch data from api
  useEffect(() => {

    (async () => {
      // get list of categoriesF
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

  }, [])

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
  }, [categoryFilter, recommendations])

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
    setShownRecommendations(filteredRecommendation)


  }, [filteredSubCategories, recommendations])

  function filterSubCategory(filter, index) {

    if (shownSubCategories.length === filteredSubCategories.length) {
      setFilteredSubCategories([shownSubCategories[index]])
    } else if (filteredSubCategories.includes(filter)) {
      setFilteredSubCategories(filteredSubCategories.filter(subcategory => subcategory !== filter));
    } else {
      setFilteredSubCategories([...filteredSubCategories, shownSubCategories[index]])
    }
  }

  return (
    <>
      <NavBar setShowModal={setShowModal} categories={categories} setCategoryFilter={setCategoryFilter} categoryFilter={categoryFilter} />

      <Container>
        <Alert variant="danger" className="mt-2">Made by Guilherme Fernandes in 2021 as part of Harvard's CS50 final project</Alert>
        {shownSubCategories.length > 0 && <Card>
          <Card.Title className='text-center mt-2'>Sub-categories</Card.Title>
          <div>
            {shownSubCategories.map((subcategory, index) =>
              <Badge pill bg={filteredSubCategories.includes(subcategory) ? "primary" : "secondary"} key={index} className="sub-categories-filter" onClick={(e) => filterSubCategory(e.target.textContent, index)}>{subcategory}</Badge>
            )}
          </div>
        </Card>}
        {shownRecommendations.map((data, index) => <RecommendationCard key={index} data={data} index={index} />)}
      </Container>
      <RecomendModal setShowModal={setShowModal} showModal={showModal} recommendations={recommendations} setRecommendations={setRecommendations} />
    </>
  )
}
