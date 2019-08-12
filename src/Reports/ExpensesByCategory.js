import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import 'bootstrap/dist/css/bootstrap.min.css';

const pieOptions = {
  title: "Expenses By Category",
  pieHole: 0,
  slices: [
    {
      color: "#2BB673"
    },
    {
      color: "#d91e48"
    },
    {
      color: "#007fad"
    },
    {
      color: "#e9a227"
    }
  ],
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 14
    }
  },
  tooltip: {
    showColorCode: true
  },
  chartArea: {
    left: 0,
    top: 0,
    width: "100%",
    height: "80%"
  },
};

class ExpensesByCategory extends Component {
  constructor() {
    super();
    this.state = {  };
  }
  render() {
    return (
		<div className={'border'}>
			<Chart
			  chartType="PieChart"
			  data={
				  [ ["Category", "Amount"],
					["Rent", 12], 
					["Utilities", 5.5],
					["Food", 20], 
					["Insurance", 8],
				  ]
				}
			  options={pieOptions}
			  graph_id="PieChart"
			  width={"100%"}
			  height={"400px"}
			  legend_toggle
			/>
		</div>	
	);
  }
}

export default ExpensesByCategory;



