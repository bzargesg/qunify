import React from 'react';
import '../assets/css/App.css';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './helpers';
import { alertActions } from './actions';
import { PrivateRoute } from './components';
import { HomePage, LoginPage,RegisterPage } from './components';


class App extends React.Component {
  constructor(props){
    super(props);
    history.listen((location, action) =>{
      this.props.clearAlerts();
    })
  }
    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}
function mapState(state) {
  const { alert } = state;
  return { alert };
}
const actionCreators = {
  clearAlerts: alertActions.clear
};
const connectedApp = connect(mapState, actionCreators)(App);

export { connectedApp as App};
