import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import '../../common/App.css';
import StudentProfile from './StudentProfile'
import { userActions } from '../../../redux/actions' 

class  Student extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  componentDidMount() {
    const  id = this.props.match.params.id
    this.props.dispatch(userActions.getChild(id))
  }

  handleDrawerClose(){
    this.setState({open:true});
  }
  render(){
    const { child  } = this.props
    let parent = child  && child.child  ? child .child   : ''
    let profile_pix ='default.jpg'
    if(child && child.userable)
        profile_pix = child && child.userable ? child.userable.profile_pix : ''
    return (
      <StudentProfile child={child} img={`/student_photo/${profile_pix}`} />
    );
  }
}


const mapStateToProps = (state)=> {
    const { child } = state.parent

    if(child){
      return  { child } 
    }
    return {}
}

export default connect(mapStateToProps)(Student)