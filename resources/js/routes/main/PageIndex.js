import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  IndexLayout ,
  PostCard,
  Layout } from '../../components/layouts/main'
import ImageSlider from '../../components/layouts/main/slider/ImageSlider'
import males from '../../components/layouts/main/slider/images/2.jpg'
import my_image from '../../images/dev.jpg'
import Calendar from 'react-calendar';

const styles = theme => ({
  post: {
    marginBottom: theme.spacing(3),
  }
});
let myDate = null;
const onChange = date =>{
  myDate = date;
  console.log(date);
} 
const text = "<h3>Hello world</h3>"
const date = new Date(); 
const PageIndex = ({ classes }) => (

  <IndexLayout>
    <ImageSlider />
    <Layout

    aside={
      <Calendar onChange={()=>onChange(myDate)} navigationAriaLabel='School Events'/>
    } >

    <PostCard
      className={classes.post}
      title="News feed"
      subtitle="@Admin 3 days ago"
      imageUrl={males}
      avatarUrl={my_image}
      body={text}
    />
    
    </Layout>
    </IndexLayout>
);

PageIndex.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};

export default withStyles(styles)(PageIndex);
