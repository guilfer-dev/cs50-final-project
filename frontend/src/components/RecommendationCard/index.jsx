import { useEffect, useState } from "react";

import axios from "axios"
import { Card, Col, } from 'react-bootstrap';

import CardBreadCrumb from '../CardBreadCrumb'


import "./styles.css"

export default function RecommendationCard({ data, index }) {

    useEffect(() => {
        async function getEmbeded() {
            const res = await axios.get(`https://www.youtube.com/oembed?url=${data.url}&format=json`)
            const parser = new DOMParser();
            const embeded = parser.parseFromString(res.data.html, "text/html").querySelector("iframe")
            document.getElementById(`youtube-embeded-${index}`).appendChild(embeded)
        }
        getEmbeded()
    }, [data.url])

    return (

        <Card className="my-4">
            <Card.Header>
                <CardBreadCrumb category={data.category.name} subcategory={data.subcategory} />
                <Card.Title>{data.title}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Col className="action-container">
                    <button className="material-icons upvote">arrow_upward</button>
                    <span>{data.votes}</span>
                    <button className="material-icons downvote">arrow_downward</button>
                    <button className="material-icons bookmark">bookmark</button>
                </Col>
                <Col className="content-container">
                    <div id={`youtube-embeded-${index}`} className="youtube-embeded"></div>
                    <p><strong>More about:</strong>{` ${data.about}`}</p>
                </Col>
            </Card.Body>
        </Card >
    )
}