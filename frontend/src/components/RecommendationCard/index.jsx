import { useEffect, useState } from "react";

import axios from "axios"
import { Card, Col, } from 'react-bootstrap';

import CardBreadCrumb from '../CardBreadCrumb'


import "./styles.css"
const URL = "https://www.youtube.com/watch?v=jwzeJU_62IQ"
const COMMENTS = 100;
const VOTES = 13;
const TEXT = "O vídeo fornece uma maneira poderosa de ajudá-lo a provar seu argumento. Ao clicar em Vídeo Online, você pode colar o código de inserção do vídeo que deseja adicionar. Você também pode digitar uma palavra-chave para pesquisar online o vídeo mais adequado ao seu documento.";

export default function RecommendationCard({ card }) {

    useEffect(() => {
        async function getEmbeded() {
            const res = await axios.get(`https://www.youtube.com/oembed?url=${URL}&format=json`)
            const parser = new DOMParser();
            const embeded = parser.parseFromString(res.data.html, "text/html").querySelector("iframe")
            document.getElementById(`youtube-embeded-${card}`).appendChild(embeded)
        }
        getEmbeded()
    })

    return (

        <Card className="my-4">
            <Card.Header>
                <CardBreadCrumb />
                <Card.Title>Special title treatment</Card.Title>
            </Card.Header>
            <Card.Body>
                <Col className="action-container">
                    <button className="material-icons upvote">arrow_upward</button>
                    <span>{VOTES}</span>
                    <button className="material-icons downvote">arrow_downward</button>
                    <button className="material-icons bookmark">bookmark</button>
                    <button className="material-icons comments">comment</button>
                    <br />
                    <span >{COMMENTS}</span>
                </Col>
                <Col className="content-container">
                    <div id={`youtube-embeded-${card}`} className="youtube-embeded"></div>
                    <p><strong>More about:</strong>{` ${TEXT}`}</p>
                </Col>
            </Card.Body>
        </Card >
    )
}