import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import '../../common/App.css';
import DashboardOld from './DashboardOld'
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
    console.log({state:this.props})
    return (
      <DashboardOld user={user ? user.user: user} />
    );
  }
}


const mapStateToProps = (state)=> {
    const { user } = state
    console.log({fly_state:state})

    return  {
      user: user.item
    } 
}

export default connect(mapStateToProps)(Dashboard)