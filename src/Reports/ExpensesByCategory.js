import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import Select from "react-select"
import firebase from "../firebase";
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
    this.state = {
      accounts: [],
      chartData: [["Category", "Amount"],]
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
    let data = [["Category", "Amount"],];
    if (selectedOption.label === "All Accounts") {
      let accounts = selectedOption.value;
      let account;
      for (account of accounts) {
        if (account.transactions) {
          let transaction;

          for (transaction of account.transactions) {
            let amount = transaction.amount;
            let category = transaction.category;
            let existingItem;
            let categoryExists = false;
            for (existingItem of data) {
              if (existingItem[0] === category) {
                existingItem[1] += amount;
                categoryExists = true;
                break;
              }
            }

            if (!categoryExists) {
              data.push([category, amount]);
            }
          }
        }
      }
    }
    else {
      let account = selectedOption.value;

      if (account && account.transactions) {
        let transaction;

        for (transaction of account.transactions) {
          let amount = transaction.amount;
          let category = transaction.category;
          let existingItem;
          let categoryExists = false;
          for (existingItem of data) {
            if (existingItem[0] === category) {
              existingItem[1] += amount;
              categoryExists = true;
              break;
            }
          }

          if (!categoryExists) {
            data.push([category, amount]);
          }
        }
      }
    }
    this.setState({
      chartData: data,
    });
  }


  render() {

    //Query the database for all accounts
    //Fill the dropdown with the different accounts as well as an "All Accounts" option
    //When an option is selected, get all transactions for that account, calculate the percentage for each category, and pass the category names and percentages to the Chart
    let account;
    let options = [];
    for (account of this.state.accounts) {
      options.push({ value: account, label: account.name });
    }
    if (options.length >= 1) {
      options.push({ value: this.state.accounts, label: "All Accounts" })
    }


    return (
      <div>
        <div className={'border'}>
          <Select placeholder="Select Account..." className="w-25" options={options} onChange={this.onAccountChange} />
        </div>
        {this.state.chartData.length > 1 && <Chart
          chartType="PieChart"
          data={this.state.chartData}
          options={pieOptions}
          graph_id="PieChart"
          width={"100%"}
          height={"400px"}
          legend_toggle
        />}

      </div>
    );
  }
}

export default ExpensesByCategory;



