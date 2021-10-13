import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { Grid, Paper, Avatar,Typography,  CardContent } from '@material-ui/core'
import { connect } from 'react-redux'
import { userActions } from '../../../../redux/actions' 
import logo from '../../../../images/logo.png'
import PostCard from '../PostCard'
import ProfileHeader from '../ProfileHeader'
import AppBar from '../AuthBar'

class UserProfile extends React.Component{
    constructor(props) {
        super(props)
        
          this.state = {
             authenticated: false
         }
    }   
    
   componentDidMount() {
        this.props.dispatch(userActions.getAll())
        this.props.dispatch(userActions.getAuth())
    }

    render(){
      const { get_user, get_users, className, classes } = this.props
      let user = {}
      let users = {}
      if(get_user.item){
        user = get_user.item.user
      }
      if(get_users.items){
        users = get_users.items.users
      }
      return (<div> 
          <AppBar />
          <Paper className={className}> 
            <CardContent>
              <div className={classes.root}>
                <div className={classes.main}>
                  <ProfileHeader
                    className={classes.header}
                    displayName={user.username}
                    bio="Professional photographer"
                    coverUrl="https://source.unsplash.com/collection/841904"
                    avatarUrl={logo}
                    stats={{
                      teachers:312,
                      students:233,
                      parents:354
                    }}
                  />

            </div>
          </div>
        </CardContent>
      </Paper>
    </div>)
    }   
}
const styles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    submitButton: {
        marginTop: 24,
    },
    container: {
        width: '100%'
    },
    logo: {
        width: 100,
        height:100
    },
    logoContainer:{
        textAlign:'center',
    },
    clearBtn:{
        float:'right'
    }
})

UserProfile.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
}

const mapStateToProps = (state)=> {
    const { user } = state
    const { users } = state
    console.log({fly_state:state})

    return  {
        get_user:user,
        get_users:users
    } 
}

const connectedUserProfile = connect(mapStateToProps)(UserProfile);

export default withStyles(styles)(connectedUserProfile)
