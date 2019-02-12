/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardText, CardImg } from 'reactstrap';

class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        let bgColor = this.props.performer.primary_color.substring(0, 6)
        // console.log(bgColor);
        return (
            <div>
                <Button color="info" onClick={this.toggle}>More info{this.props.buttonLabel}</Button>
                <Modal size="lg" isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 200 }}
                    toggle={this.toggle} className={this.props.className}>
                    <ModalHeader style={{
                        backgroundColor: `#${bgColor}`,
                    }} toggle={this.toggle}>Hi! Let's get tickets for {this.props.performer.name} </ModalHeader>
                    <ModalBody style={{
                        backgroundColor: `#${bgColor}`,
                    }}>
                        <h4> You can reach'em <i className="fab fa-instagram">   {this.props.performer.slug}</i></h4>
                        <CardImg style={{
                            fontFamily: 'Helvetica Neue',
                            marginBottom: "1em",
                            float: "right",
                            display: "inline-flex"
                        }} className="photo" src={this.props.performer.hero_image_url} alt="Card image cap" />
                        <CardText>Instagram: #{this.props.performer.slug}</CardText>
                        <CardText>ID# {this.props.performer.id}</CardText>

                      
          </ModalBody>
                    <ModalFooter style={{
                        backgroundColor: `#${bgColor}`,
                    }}>
                        <Button color="info" href={`mailto:${this.props.performer.category_group}?subject=Hi ${this.props.performer.category_group} Let's chat!&body=Thanks to GameTime Group, Lets schedule some time to meet up. Looking forward to talking to you.`}  onClick={this.toggle}>Send'em e-Mail</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalExample;

