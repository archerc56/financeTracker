import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import Select from "react-select"
import firebase from "../firebase";
import 'bootstrap/dist/css/bootstrap.min.css';

class ExpensesOverTime extends Component {
  constructor() {
    super();

    this.state = {
      accounts: [],
      chartData: [["Month", "Amount", { role: "annotation" }]]
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.onAccountChange = this.onAccountChange.bind(this);
  }

  componentDidMount() {
    const self = this;
    var userUid = firebase.auth().currentUser.uid;

    //Adds a listener to the user's section of the database. Whenever the section is updated, the page will rerender
    firebase.firestore().collection("users").doc(userUid).onSnapshot(function (doc) {
      console.log("Current data: ", doc.data());
      self.setState({
        accounts: doc.data().Accounts
      });
    });
  }

  /**
   * Handles when the account is changed from the drop down
   * @param {Object} selectedOption 
   */
  onAccountChange(selectedOption) {
    let foundMonths = [];

    let data = [
      ["Month", selectedOption.label, { role: "style" }],
      ["January", 0.0, ''],
      ["February", 0.0, ''],
      ["March", 0.0, ''],
      ["April", 0.0, ''],
      ["May", 0.0, ''],
      ["June", 0.0, ''],
      ["July", 0.0, ''],
      ["August", 0.0, ''],
      ["September", 0.0, ''],
      ["October", 0.0, ''],
      ["November", 0.0, ''],
      ["December", 0.0, ''],
    ];
    let account = selectedOption.value;
    if (account && account.transactions) {
      let transaction;

      for (transaction of account.transactions) {
        let amount = transaction.amount;
        var date = new Date(transaction.date);
        let month = date.getMonth();
        let category = transaction.category;
        if (!isNaN(month) && category !== 'Deposit') {
          data[month + 1][1] += parseFloat(amount);
          if (!foundMonths.includes(month) ) {
            foundMonths.push(month);
          }
        }
      }
    }

    this.setState({
      chartData: data,
    });
  }

  render() {
    let account;
    let options = [];
    for (account of this.state.accounts) {
      options.push({ value: account, label: account.name });
    }

    return (
      <div>
        <div className={'border'}>
          <Select placeholder="Select Account..." className="w-25" options={options} onChange={this.onAccountChange} />
        </div>
        {this.state.chartData.length > 1 && <Chart
          chartType="BarChart"
          options={{
            title: 'Expenses Over Time',
            chartArea: { width: '50%' },
            vAxis: {
              title: 'Month',
            },
            hAxis: {
              title: 'Amount',
              minValue: 0,
            },

            isStacked: true,
          }}
          width="100%"
          height="400px"

          data={this.state.chartData}
        />}
      </div>
    );
  }
}

export default ExpensesOverTime;



