import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import '../../common/App.css';
import Profile from './Profile'
import Admin from './Admin/Profile'
import { userActions } from '../../../redux/actions' 

class  Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  componentDidMount() {
    // this.props.dispatch(userActions.getAuth())
  }

  handleDrawerClose(){
    this.setState({open:true});
  }
  render(){
   
    return this.props.children;
  }
}


const mapStateToProps = (state)=> {
    const { user } = state.auth
    console.log({fly_state:user})

    return  {
      user
    } 
}

export default connect(mapStateToProps)(Dashboard)