import { useEffect, useState } from "react";

import { Card, Col, Alert } from 'react-bootstrap';

import CardBreadCrumb from '../CardBreadCrumb'


import "./styles.css"
import api from "../../services/api";

export default function RecommendationCard({ data, votes, bookmarks }) {

    const [numberOfVotes, setNumberOfVotes] = useState(0);
    const [ownVote, setOwnVote] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [error, setError] = useState("");

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

    useEffect(() => {
        if (votes.includes(data._id)) {
            setOwnVote(true);
        }
        if (bookmarks.includes(data._id)) {
            setBookmark(true);
        }

        setNumberOfVotes(data.votes || 0);
    }, [votes, bookmarks])

    return (

        <Card className="my-4">
            <Card.Header>
                <CardBreadCrumb category={data.category.name} subcategory={data.subcategory} />
                <Card.Title>{data.title}</Card.Title>
            </Card.Header>
            <Card.Body>
                {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
                <Col className="action-container">
                    <button className="material-icons upvote" style={{ color: ownVote ? "rgb(200, 170, 20)" : "black" }} onClick={castVote}>arrow_upward</button>
                    <span>{numberOfVotes}</span>
                    <button className="material-icons bookmark" style={{ color: bookmark ? "rgb(200, 170, 20)" : "black" }} onClick={castBookmark}>bookmark</button>
                </Col>
                <Col className="content-container">
                    <div className="youtube-embeded">
                        <iframe src={`https://www.youtube-nocookie.com/embed/${data.video}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <p><strong>More about:</strong>{` ${data.about}`}</p>
                </Col>
            </Card.Body>
        </Card >
    )
}