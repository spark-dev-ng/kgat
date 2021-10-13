import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import '../../common/App.css';
import Profile from './Profile'
import { userActions } from '../../../redux/actions' 

class  Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  componentDidMount() {
    this.props.dispatch(userActions.getAuth())
  }

  handleDrawerClose(){
    this.setState({open:true});
  }
  render(){
    const { user } = this.props
    let parent = user && user.parent ? user.parent  : ''
    let profile_pix ='default.jpg'
    if(parent && parent.userable)
        profile_pix = parent && parent.userable ? user.parent.userable.profile_pix : ''
    return (
      <Profile user={parent} img={`/guardian_photo/${profile_pix}`} />
    );
  }
}


const mapStateToProps = (state)=> {
    const { parent } = state
    console.log({fly_state:parent})

    return  {
      user: parent.parent
    } 
}

export default connect(mapStateToProps)(Dashboard)