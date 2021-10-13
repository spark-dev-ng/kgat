import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import '../../common/App.css';
import TerminalReport from './TerminalReport'
import PrintReportSheet from './PrintReportSheet'
import { userActions } from '../../../redux/actions' 

class  Terminal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      params: {},
      open:false
    }
  }

  componentDidMount() {
    let { id, term, session } = this.props.match.params
    this.props.dispatch(userActions.getChild(id))
  }

  handleDrawerClose(){
    this.setState({open:true})
  }

  render(){
    const { child  } = this.props
    let { id, term, session } = this.props.match.params
    let parent = child  && child.child  ? child .child   : ''
    let profile_pix ='default.jpg'
    if(child && child.userable)
        profile_pix = child && child.userable ? child.userable.profile_pix : ''
    return (
      <PrintReportSheet student={child} term={term} session={session} />
    );
    return <div/>
  }
}

const mapStateToProps = (state)=> {
    const { child } = state.parent

    if(child){
      return  { child } 
    }
    return {}
}

export default connect(mapStateToProps)(Terminal)