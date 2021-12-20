import RecommendationCard from '../../components/RecommendationCard'

// import styles
import { Container } from 'react-bootstrap';
import './styles.css'

export default function contribuitions({ states: {
  recommendations,
  votes,
  bookmarks
} }) {

  return (
    <>
      <Container>
        {bookmarks && recommendations
          .filter(e => bookmarks.includes(e._id))
          .map(data =>
            <RecommendationCard key={data._id} data={data} votes={votes} bookmarks={bookmarks} />)}
      </Container>
    </>
  )
}
