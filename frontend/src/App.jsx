
import { Container, Alert, Card, Badge } from 'react-bootstrap';

import NavBar from './components/NavBar'
import RecommendationCard from './components/RecommendationCard'

import './App.css'

function App() {

  const subcategories = true;
  const more = true;

  return (
    <>
      <NavBar />

      <Container>
        <Alert variant="danger" className="mt-2">As by now the app only works with youtube content</Alert>
        {subcategories && <Card>
          <Card.Title className='text-center'>Sub-categories</Card.Title>
          <div>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e, i) =>
              <Badge pill bg="secondary" key={i} className="sub-categories-filter">subcategory</Badge>
            )}
            {more && <Badge pill bg="primary" className="sub-categories-filter">more...</Badge>}
          </div>
        </Card>}
        {[1, 2, 3, 4].map((e, i) => <RecommendationCard key={i} card={i} />)}
      </Container>
    </>
  )
}

export default App
