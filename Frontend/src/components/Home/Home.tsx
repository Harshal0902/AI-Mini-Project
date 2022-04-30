import React from 'react'
import "./Home.css"
import { Container, Row, Col } from "react-bootstrap";
import GlobeImg from "../../assets/globe.png"

export default function Home() {
    return (
        <>
            <Container className="Intro">
                <Row>
                    <Col md={8} className="about-description">
                        <h1>Better Solutions For Your Crop</h1>
                        <p>What our project actually does is asks the user to click a picture of your crop and then it scans the entire picture and compares it with the other pictures on the database and detects the faults in the crop and tells us if the crop is healthy or maybe suffering from disease, and recommend Treatment fro the specific disease.
                        </p>
                    </Col>

                    <Col md={4} className="img_globe">
                        <img src={GlobeImg} className="img-fluid" alt="Me" />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
