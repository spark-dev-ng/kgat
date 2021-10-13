import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import '../../common/App.css';
import StudentProfile from './StudentProfile'
import { userActions } from '../../../redux/actions' 

class  Session extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  componentDidMount() {
    const  id = this.props.match.params.id
    const  session = this.props.match.params.session
    console.log({params:this.props.match.params});
    this.props.dispatch(userActions.getChild(id))
    this.props.dispatch(userActions.getSessionsFrom(session))
  }

  handleDrawerClose(){
    this.setState({open:true});
  }
  render(){
    const { child, sessions  } = this.props
    let parent = child  && child.child  ? child .child   : ''
    let profile_pix ='default.jpg'
    if(child && child.userable)
        profile_pix = child && child.userable ? child.userable.profile_pix : ''
    return (
      <StudentProfile sessions={sessions} child={child} no_reports={true} img={`/student_photo/${profile_pix}`} />
    );
  }
}


const mapStateToProps = (state)=> {
  const { child, sessions } = state.parent
  
  if(child){
    return  { child, sessions } 
  }
  return {}
}

export default connect(mapStateToProps)(Session)