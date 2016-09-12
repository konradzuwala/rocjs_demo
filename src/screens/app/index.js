// React Hot Reload does not support stateless function components as of now
/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import styles from './style.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    return (
      <div className={styles.main}>
        <Helmet
	  script = {[{

		src: 'http://js.api.here.com/v3/3.0/mapsjs-core.js',
		type: 'text/javascript'
	  }, {
		src: 'http://js.api.here.com/v3/3.0/mapsjs-service.js',
		type: 'text/javascript'
	  }]}
          link={[{
            
          }]}
        />
       <Navbar/>
       { this.props.children }
       <Footer/>
      </div>
    );
  }
}
