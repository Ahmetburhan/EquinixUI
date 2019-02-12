import React, { Component, lazy, Suspense } from 'react';
import request from 'superagent';
//enabling lazy loading
//import Cards from './components/Cards';
import { Button, Form, Label, Input, Container, Row} from 'reactstrap';
import mockdata from './mockdata.json';

const Cards = lazy(() => import('./components/Cards'));
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            performers: [],
            query: "",
            deviceName: "",
            metroCity: "",
            status: "",
            filteredPerformers:[],
        }


    }

    componentDidMount() {
        request
            .get(`https://5c623b861325a20014976556.mockapi.io/api/v2/equinix_mock_data`).then(res => {
                if (res.ok) {
                    console.log(res.body)
                    window.performers = res.body;
                    // console.log(window.performers)
                    this.setState({
                        performers : res.body
                    })

                } else {

                    this.setState({
                        performers: mockdata
                    })

                    console.log('We found nothing so we are loading local data')

                }
            })
    };



    handleChange=(event)=> {
        this.setState({ query: event.target.value });
        console.log(this.state.query);
        console.log(event.target.value)

    }

    onSubmit = (event) =>{
        console.log('New search was submitted: ' + this.state.query);
        event.preventDefault();
        this.setState({
            query: event.target.value,
        })
            let filteredPerformers = window.performers.filter(performer => {
                console.log(performer.upTime)
                console.log("query",this.state.query)

                return performer.upTime === this.state.query && this.state.query;
                });
            // console.log(this.state.query.toLowerCase())
            console.log(filteredPerformers)
            this.setState({
                performers: filteredPerformers,
            });
             event.target.reset() 
        };
        
       
    onReset = () => {
        this.setState({
            performers: window.performers
        });
    }

    render() {

        return ( <div className = "App" >
            <div className="filter" >
            <h1 class="banner" id="filterBanner">Filter</h1>
            <Form id="filterForm" onSubmit={this.onSubmit}>
                <Label> 
                    <Input type="text" placeholder="Enter a Virtual Device Name" value={this.state.value} onChange={this.handleChange} name="deviceName"/>
                </Label>

                <Label>
                    <Input type="text" placeholder="Metro City" value={this.state.value} onChange={this.handleChange} name="metroCity" />
            
                </Label>

                <Input type="select" name="status" value={this.state.value} onChange={this.handleChange}>
                    <option value="" disabled placeholder="online/offline"></option>
                    <option value="true">Online</option>
                    <option value="false">Offline</option>
                </Input>

                <Button color="success" type="submit" value="Submit">Submit </Button>
                <Button type="button" onClick={this.onReset}>Reset </Button>

            </Form>
            </div>

            <Container fluid>
                <Row>
           <Suspense fallback={<div><h1 className="banner">Page is loading, Please Wait!...</h1></div>}>
            <Cards handleChange = {
                this.handleChange
            }
                performers = {
                    this.state.performers
            }
          />
            </Suspense>
          </Row>
            </Container>


            </div>
        )
    }
}
export default App;