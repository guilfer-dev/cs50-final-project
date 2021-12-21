// import components
import RecommendationCard from '../../components/RecommendationCard'

// import styles
import { Container } from 'react-bootstrap';
import './styles.css'

export default function contribuitions({ states: {
  recommendations,
  contributions,
  votes,
  bookmarks,
  setVotes,
  setBookmarks
} }) {

  return (
    // render contribution page
    <>
      <Container>
        {contributions && recommendations
          .filter(e => contributions.includes(e._id))
          .map(data =>
            <RecommendationCard key={data._id} states={{
              data,
              votes,
              bookmarks,
              setVotes,
              setBookmarks
            }} />)}
      </Container>
    </>
  )
}
