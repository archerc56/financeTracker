import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import 'bootstrap/dist/css/bootstrap.min.css';

const data = [
  ["Month", "Expenses", { role: "style" }],
  ["January", 10, "color: gray"],
  ["February", 14, "color: gray"],
  ["March", 16, "color: gray"],
  ["April", 22, "color: gray"],
  ["May", 28, "color: gray"],
  ["June", 10, "color: gray"],
  ["July", 14, "color: gray"],
  ["August", 16, "color: gray"],
  ["September", 22, "color: gray"],
  ["October", 28, "color: gray"],
  ["November", 10, "color: gray"],
  ["December", 14, "color: gray"],
];

class ExpensesOverTime extends Component {
  constructor() {
    super();
    this.state = {  };
  }
  render() {
    return (
		<div className={'border'}>
			<Chart
				chartType="BarChart"
				options={{
					title: 'Expenses Over Time',
					chartArea: { width: '50%' },
					hAxis: {
					  title: 'Expenses',
					  minValue: 0,
					},
					vAxis: {
					  title: 'Month',
					},
				}}
				width="100%"
				height="400px"
				data={data}
			/>
		</div>
	);
  }
}

export default ExpensesOverTime;



