import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const LogoutButton = ({ user, logout }) => (
  <Fragment>
    <Typography variant="body2" color="inherit">
      {`Hi, ${user.username}`}
    </Typography>
    <Button color="inherit" onClick={logout}>
      Logout
    </Button>
  </Fragment>
);

LogoutButton.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
  logout: PropTypes.func.isRequired,
};

LogoutButton.defaultProps = {
  user: null,
};

export default LogoutButton;
