import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
  render() {
    const { token, component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={() => {
          const Component = component;
          if (token) return <Component />;
          else {
            return (
              <Redirect
                to={{
                  pathname: '/login'
                }}
              />
            );
          }
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.jwt
  };
};

const mapDispatchToProps = (dispatch) => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);
