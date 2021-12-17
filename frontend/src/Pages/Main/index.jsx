
import { useState, useEffect } from 'react';
import { Container, Alert, Card, Badge } from 'react-bootstrap';

import NavBar from '../../components/NavBar'
import RecommendationCard from '../../components/RecommendationCard'
import AskModal from '../../components/RecomendModal'

import api from "../../services/api.js"

import './styles.css'

export default function Main() {

  const [categoryFilter, setCategoryFilter] = useState("categories")

  const [show, setShow] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [shownRecommendations, setShownRecommendations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [shownSubCategories, setShownSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {

    (async () => {
      const { data } = await api.get("/categories");
      setCategories(data);
      const allSubCategories = data.map(e => e.subcategories).flat();
      setSubCategories(allSubCategories);
      setShownSubCategories(allSubCategories);
      setFilteredSubCategories(allSubCategories);
    })();

    (async () => {
      const { data } = await api.get("/recommendations");
      setRecommendations(data);
      setShownRecommendations(data);
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
  }, [categoryFilter])

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

  }, [filteredSubCategories])

  function filterSubCategory(filter, index) {

    console.log(shownSubCategories)
    console.log(filteredSubCategories.length)
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
      <NavBar handleShow={handleShow} categories={categories} setCategoryFilter={setCategoryFilter} categoryFilter={categoryFilter} />

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
      <AskModal handleClose={handleClose} show={show} />
    </>
  )
}
