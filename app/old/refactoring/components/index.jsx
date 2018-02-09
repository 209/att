import React, { Component } from 'react';
import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';
import Sidebar from 'common/sidebar';
import Header from 'common/dashboard_header';
import Footer from 'common/footer';
import Body from './body';

@SidebarMixin
class App extends Component {
  componentDidMount() {
    const token = window.localStorage.getItem('token');
    if (!token) {
      window.location = '/login';
    }
  }

  render() {
    const classes = classNames({
      'container-open': this.props.open,
    });

    return (
      <Container id="container" className={classes}>
        <Header />
        <Sidebar open={this.props.open} />
        <Body />
        <Footer />
      </Container>
    );
  }
}

export default App;
