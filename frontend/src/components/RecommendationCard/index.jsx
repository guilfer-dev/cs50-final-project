// Source: https://stackoverflow.com/questions/42555450
// For some reason, the youtube app was throwing constant errors and using a no-cookie version helps

// libraries
import { useEffect, useState } from "react";
import { Card, Col, Alert } from 'react-bootstrap';

// components
import CardBreadCrumb from '../CardBreadCrumb'

// api service
import api from "../../services/api";

// sytles
import "./styles.css"

export default function RecommendationCard({ data, votes, bookmarks }) {

    const [numberOfVotes, setNumberOfVotes] = useState(0);
    const [ownVote, setOwnVote] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [error, setError] = useState("");

    // change how the votes and bookmarks are displayd if the user have voted for that recommendation before
    useEffect(() => {
        if (votes.includes(data._id)) {
            setOwnVote(true);
        }
        if (bookmarks.includes(data._id)) {
            setBookmark(true);
        }

        setNumberOfVotes(data.votes || 0);
    }, [votes, bookmarks, data._id, data.votes])

    // change the state of the vote to the oposite
    async function castVote() {
        try {
            await api.patch(`/recommendations/${data._id}`, {
                action: "votes",
                value: !ownVote
            });
            setOwnVote(!ownVote);
            if (!ownVote) {
                setNumberOfVotes(numberOfVotes + 1);
            } else {
                setNumberOfVotes(numberOfVotes - 1);
            }
        }
        catch (err) {
            setError(err.message);
        }
    }

    // change the state of the vote to the oposite
    async function castBookmark() {
        try {
            await api.patch(`/recommendations/${data._id}`, {
                action: "bookmarks",
                value: !bookmark
            });
            setBookmark(!bookmark);
        }
        catch (err) {
            setError(err.message);
        }
    }

    return (

        // renders the card with all filed previously filled by some user
        <Card className="my-4">
            <Card.Header>
                <CardBreadCrumb category={data.category.name} subcategory={data.subcategory} />
                <Card.Title>{data.title}</Card.Title>
            </Card.Header>
            <Card.Body>
                {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
                <Col className="action-container">
                    {/* change the color of the vote/bookmark based on the boolean value */}
                    <button className="material-icons upvote" style={{ color: ownVote ? "rgb(200, 170, 20)" : "black" }} onClick={castVote}>arrow_upward</button>
                    <span>{numberOfVotes}</span>
                    <button className="material-icons bookmark" style={{ color: bookmark ? "rgb(200, 170, 20)" : "black" }} onClick={castBookmark}>bookmark</button>
                </Col>
                <Col className="content-container">
                    <div className="youtube-embeded">
                        {/* shows an embeded youtube player */}
                        <iframe src={`https://www.youtube-nocookie.com/embed/${data.video}`}
                            title={data.title}
                            allowFullScreen
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                    </div>
                    <p><strong>More about:</strong>{` ${data.about}`}</p>
                </Col>
            </Card.Body>
        </Card >
    )
}