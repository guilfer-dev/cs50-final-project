
import { Container, Alert } from 'react-bootstrap';

import NavBar from './components/NavBar'
import RecommendationCard from './components/RecommendationCard'

import './App.css'

function App() {

  return (
    <>
      <NavBar />
      <Container>
        <Container>
          <Alert variant="danger" className="mt-2">As by now the app only works with youtube content</Alert>
          {[1, 2, 3, 4].map((e, i) => <RecommendationCard key={i} card={i} />)}
        </Container>
      </Container>
    </>
  )
}

export default App
