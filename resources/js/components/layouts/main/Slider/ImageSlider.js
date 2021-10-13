import React from 'react';
import Carousel from 'react-material-ui-carousel';
import autoBind from 'auto-bind';
import  {
    FormLabel,
    FormControlLabel,
    Checkbox,
    Radio,
    RadioGroup,
    Paper,
    Button
} from '@material-ui/core';
// import  imgOne from './public/images/1.jpg'
// import  imgThree from './public/images/2.jpg'
// import  imgTwo from './public/images/3.jpg'
import "./style.scss";

function Project(props)
{
    return (
        <Paper 
            className="Project"
            style={{
                backgroundImage: `url(${props.item.src})` , 
                textShadow: '2px, 3px, gray'
            }}
            elevation={10}
        >
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>
           
            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

const items = [
    {
        name: "KGAT Academy",
        description: "Internet Base Academy",
        color: "#9CD81D",
        src:'./public/images/1.jpg'
    },
    {
        name: "KGAT Academy Version 0.1",
        description: "Ishaq Ibrahim Academy Project 2020",
        color: "#",
        src:'./public/images/2.jpg'
    },
    {
        name: "School Management System",
        description: "School Admin with full controle",
        color: "#CE7E78",
        src:'./public/images/3.jpg'
    },
    {
        name: "3x Faster with JWT Oauth2 Authentication",
        description: "Assyncronious Web App with full API, Easy integratable with Android App",
        color: "#000000",
        src:'./public/images/1.jpg'
    }
]

export default class ImageSlider extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            autoPlay: true,
            timer: 500,
            animation: "fade",
            indicators: true
        }

        autoBind(this);
    }

    toggleAutoPlay()
    {
        this.setState({
            autoPlay: !this.state.autoPlay
        })
    }

    toggleIndicators()
    {
        this.setState({
            indicators: !this.state.indicators
        })
    }

    changeAnimation(event)
    {
        this.setState({
            animation: event.target.value
        })
    }

    render()
    {
        return (
            <div style={{marginTop: "50px", color: "#494949"}}>
                <h2 style={{textAlign:'center', color:'green'}}>Welcome to KGAT Academy (School Management Sestem)</h2>

                <Carousel 
                    className="SecondExample"
                    autoPlay={this.state.autoPlay}
                    timer={this.state.timer}
                    animation={this.state.animation}
                    indicators={this.state.indicators}
                >
                    {
                        items.map( (item, index) => {
                            return <Project item={item} key={index}/>
                        })
                    }
                </Carousel>            
            </div>
        )
    }
}