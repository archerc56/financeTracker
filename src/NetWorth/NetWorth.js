import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class NetWorth extends Component {
  constructor() {
    super();
    this.state = {  };
  }
  render() {
    return (
		<p> This will be a calculation of net worth. Probably could be a table of some sort.  It will contain the current value of each account and sum them at the bottom.
		If we decide to get fancy we could have tabs across the top for each month showing the change over time.</p>
    );
  }
}

export default NetWorth;



