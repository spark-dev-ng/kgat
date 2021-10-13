import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { FormSignUp, ParentRegister, StudentRegister } from '../../components/layouts/main'
import { useParams } from 'react-router-dom';

const styles = theme => ({
  root: {
    padding: '50px 20px',
  },
  form: {
    width: '100%',
    maxWidth: 360,
    margin: '0 auto',
  },
  
  form2: {
    width: '100%',
    maxWidth: 600,
    margin: '0 auto',
  },
});

const PageSignUp = ({ classes, history }) => {
  const { type } = useParams();
  const handleSubmit = (values) => {
    console.log('submitting formValues', values);
    history.push('/');
  };

  return (
    <div className={classes.root}>
      {type === 'Teacher' ? (
        <FormSignUp
          user='Teacher'
          className={classes.form}
          onSubmit={handleSubmit}
        />
      ) : type === 'Guardian' ?
        (
          <ParentRegister
            className={classes.form2}
            onSubmit={handleSubmit}
            user='Guardian'
          />
        ) : (
          <StudentRegister
            user='Student'
            className={classes.form2}
            onSubmit={handleSubmit}
          />)
      }
    </div>
  );
};

PageSignUp.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  history: PropTypes.object,
};

export default withStyles(styles)(PageSignUp);
