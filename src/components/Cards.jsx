import React from 'react';
import {
    Col, Card, CardImg, CardText, CardImgOverlay,
    CardTitle, CardSubtitle,
} from 'reactstrap';
import ModalUser from './ModalUser';
import LazyLoad from 'react-lazyload';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


export default class Cards extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false,
            collapse: false
        };

    }
    state = {
        performers: this.props.performers,
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen,
            collapse: !this.state.collapse
        });
    }

    render() {
        // console.log("props coming here", this.props)
        const performers = this.props.performers;

        //disabling the logic due to CORS Error on server
        // Access to fetch at 'https://images.gametime.co/cbbsdsu/hero@4x.jpg' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.If an opaque response serves your needs, set the request's mode to 'no- cors' to fetch the resource with CORS disabled.
        let imgChecker = function (url) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr && xhr.status === 200) {
                    console.log('DONE', xhr.status, "im loading image");
                    return url;
                } else {
                    console.log('DONE', xhr.status, "Sorry no image found, im loading default image");
                    return "https://i.pinimg.com/originals/4d/79/e4/4d79e45299ba276f530cbda84f5eca05.gif";

                }
            };

            xhr.send(null);
        }
        




        return (

            <div>
                <h1 className="banner">{performers && performers.length} Routers Found</h1>
                <div className="card-columns">
                    {performers && performers.map((performer, index) => {
                        let statusImage = (performer.upTime) ? "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Font_Awesome_5_regular_arrow-circle-up_green.svg/200px-Font_Awesome_5_regular_arrow-circle-up_green.svg.png" : "https://www.cetrom.net/wp-content/uploads/2016/03/zero-downtime.png";
                        // console.log(performer.upTime)
                        // console.log(index)
                        return (
                            <Col>

                                <Card id="photoCard" style={{
                                    fontFamily: 'Helvetica Neue',
                                    marginBottom: "1em"
                                }} >
                                    {/* <LazyLoad height={200} > */}
                                    <CardImg onClick={this.toggle} style={{ marginBottom: '1rem' }} className="photo" src={performer.avatar} alt="Card image cap" />
                                    {/* </LazyLoad> */}
                                    
                                    <CardImg onClick={this.toggle} style={{ marginBottom: '1rem' }} className="photo2" src={statusImage} alt="Card image cap" />
                                    <CardImgOverlay>
                                        <CardTitle>{performer.name}</CardTitle>
                                        <CardSubtitle>
                                            {performer.metro_city}
                                        </CardSubtitle>
                                        <CardText>{performer.product_name}
                                        </CardText>
                                        {/* <CardText>{performer.createdAt}
                                        </CardText> */}

                                    </CardImgOverlay>
                                </Card>
                            </Col>
                        )
                    })
                    }
                </div>
            </div>

        )
    }
}