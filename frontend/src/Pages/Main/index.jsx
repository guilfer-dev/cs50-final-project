// import components
import RecommendationCard from '../../components/RecommendationCard'

// import styles
import { Container, Alert, Card, Badge } from 'react-bootstrap';
import './styles.css'

export default function Main({ states: {
  shownSubCategories,
  filteredSubCategories,
  filterSubCategory,
  shownRecommendations,
  votes,
  bookmarks
} }) {

  return (
    <>
      <Container>
        <Card>
          <Card.Title className='text-center mt-2'>Sub-categories</Card.Title>
          <div>
            {shownSubCategories && shownSubCategories.map((subcategory, index) =>
              <Badge pill bg={filteredSubCategories.includes(subcategory) ? "primary" : "secondary"} key={index} className="sub-categories-filter" onClick={(e) => filterSubCategory(e.target.textContent, index)}>{subcategory}</Badge>
            )}
          </div>
        </Card>
        {shownRecommendations && shownRecommendations.map(data => <RecommendationCard key={data._id} data={data} votes={votes} bookmarks={bookmarks} />)}
      </Container>
    </>
  )
}
