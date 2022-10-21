import React from "react";
import { Carousel, Container } from "react-bootstrap";

function Notify() {
    return(
        <div style={{backgroundColor: "#E5862D"}}>
            <Container>
            <Carousel indicators={false} controls={false} interval={1500}>
                <Carousel.Item>
                    <p style={{textAlign: "center", color: "#fff", fontWeight: "bold"}}>
                        EMI options Available
                    </p>
                  
                </Carousel.Item>
                <Carousel.Item>
                    

                    <p style={{textAlign: "center", color: "#fff",  fontWeight: "bold"}}>
                    PAN INDIA FREE DELIVERY AVAILABLE
                    </p>
                </Carousel.Item>
                <Carousel.Item>
                    

                    <p style={{textAlign: "center", color: "#fff",  fontWeight: "bold" }}>
                    EMI options Available
                    </p>
                </Carousel.Item>
                </Carousel>
            </Container>
            </div>
    )
}


export default Notify;
