// libraries
import { Container } from 'react-bootstrap';

// componentes
import RecommendationCard from '../../components/RecommendationCard'

// import styles
import './styles.css'

export default function contribuitions({ states: {
  recommendations,
  votes,
  bookmarks,
  setVotes,
  setBookmarks
} }) {

  return (
    //render bookmark page
    <>
      <Container>
        {bookmarks && recommendations
          .filter(e => bookmarks.includes(e._id))
          .map(data =>
            <RecommendationCard key={data._id} states={{
              data,
              votes,
              bookmarks,
              setVotes,
              setBookmarks
            }}
            />)}
      </Container>
    </>
  )
}
