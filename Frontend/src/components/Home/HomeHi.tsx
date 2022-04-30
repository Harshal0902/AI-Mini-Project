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
                        <h1>आपकी फसल के लिए बेहतर समाधान</h1>
                        <p>हमारी परियोजना वास्तव में उपयोगकर्ता को आपकी फसल की तस्वीर क्लिक करने के लिए कहती है और फिर यह पूरी तस्वीर को स्कैन करती है और डेटाबेस पर अन्य चित्रों के साथ तुलना करती है और फसल में दोषों का पता लगाती है और हमें बताती है कि फसल स्वस्थ है या शायद बीमारी से पीड़ित हैं, और विशिष्ट बीमारी के लिए उपचार की सलाह देते हैं।
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
