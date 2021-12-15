
import { useState } from 'react';
import { Container, Alert, Card, Badge } from 'react-bootstrap';

import NavBar from '../../components/NavBar'
import RecommendationCard from '../../components/RecommendationCard'
import AskModal from '../../components/RecomendModal'

import './styles.css'

export default function Main() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const subcategories = true;
  const more = true;

  return (
    <>
      <NavBar handleShow={handleShow} />

      <Container>
        <Alert variant="danger" className="mt-2">As by now the app only works with youtube content</Alert>
        {subcategories && <Card>
          <Card.Title className='text-center mt-2'>Sub-categories</Card.Title>
          <div>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e, i) =>
              <Badge pill bg="secondary" key={i} className="sub-categories-filter">subcategory</Badge>
            )}
            {more && <strong className='more-categories-option'>more...</strong>}
          </div>
        </Card>}
        {[1, 2, 3, 4].map((e, i) => <RecommendationCard key={i} card={i} />)}
      </Container>
      <AskModal handleClose={handleClose} show={show} />
    </>
  )
}
