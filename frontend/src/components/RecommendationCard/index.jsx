import { useEffect, useState } from "react";

import axios from "axios"
import { Card, Col, } from 'react-bootstrap';

import CardBreadCrumb from '../CardBreadCrumb'


import "./styles.css"

export default function RecommendationCard({ data, index }) {

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
                    <div className="youtube-embeded">
                        <iframe src={`https://www.youtube-nocookie.com/embed/${data.video}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <p><strong>More about:</strong>{` ${data.about}`}</p>
                </Col>
            </Card.Body>
        </Card >
    )
}