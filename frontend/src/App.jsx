
import { Container, Card, Col, Row } from 'react-bootstrap';

import NavBar from './components/NavBar'
import Profile from './components/Profile'
import GeneralBreadCrumb from './components/GeneralBreadCrumb'
import RecommendationCard from './components/RecommendationCard'

import './App.css'

function App() {

  return (
    <>
      <NavBar />
      <Container>
        <Profile />
        <GeneralBreadCrumb />
        <Row>
          <Col md={8}>
            {[1, 2, 3, 4].map(e => <RecommendationCard />)}
          </Col>
          <Col md={4} >
          <Card className="my-4">
              NEW
              ====================
              Dinossaur anathomy
              Extraterrestrial contacts
              Universal basic income
              Dog Nutrition
            </Card>
            <Card className="my-4">
              TRENDING
              ====================
              78 ⬆️ Artificial Inteligence
              65 ⬆️ Moving average
              47 ⬆ P vs NP
              32 ⬆️ The Origin of...
            </Card>
            <Card className="my-4">
              RECOMENDATIONS
              ====================
              Algorithms
              Calculus
              Evolution
              Market
            </Card>
            <Card className="my-4">
              HELP US GROW
              ====================
              Found a bug
              Sugetions
              Invite someone
            </Card>
          </Col>
        </Row>
      </Container>


    </>
  )
}

export default App
