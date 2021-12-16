
import { useState, useEffect } from 'react';
import { Container, Alert, Card, Badge } from 'react-bootstrap';

import NavBar from '../../components/NavBar'
import RecommendationCard from '../../components/RecommendationCard'
import AskModal from '../../components/RecomendModal'

import api from "../../services/api.js"

import './styles.css'

export default function Main() {

  const [categoryFilter, setCategoryFilter] = useState("")

  const [show, setShow] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [shownRecommendations, setShownRecommendations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [shownSubCategories, setShownSubCategories] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {

    (async () => {
      const { data } = await api.get("/categories");
      setCategories(data);
      const allSubCategories = data.map(e => e.subcategories);
      setSubCategories(allSubCategories)
      setShownSubCategories(allSubCategories)
    })();

    (async () => {
      const { data } = await api.get("/recommendations");
      setRecommendations(data);
      setShownRecommendations(data);
    })();

  }, [])

  useEffect(() => {
    if (categoryFilter !== "categories") {
      const filteredCategory = recommendations.filter(e => e.category.name === categoryFilter)
      console.log(filteredCategory)
      setShownRecommendations(filteredCategory)
    } else {
      setShownRecommendations(recommendations)
    }
  }, [categoryFilter])

  return (
    <>
      <NavBar handleShow={handleShow} categories={categories} setCategoryFilter={setCategoryFilter} categoryFilter={categoryFilter} />

      <Container>
        <Alert variant="danger" className="mt-2">As by now the app only works with youtube content</Alert>
        {subCategories.length > 0 && <Card>
          <Card.Title className='text-center mt-2'>Sub-categories</Card.Title>
          <div>
            {shownSubCategories.map((subcategory, index) =>
              <Badge pill bg="secondary" key={index} className="sub-categories-filter">{subcategory}</Badge>
            )}
          </div>
        </Card>}
        {shownRecommendations.map((data, index) => <RecommendationCard key={index} data={data} index={index} />)}
      </Container>
      <AskModal handleClose={handleClose} show={show} />
    </>
  )
}
