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
    const userUid = firebase.auth().currentUser.uid;

    //Adds a listener to the user's section of the database. Whenever the section is updated, the page will rerender
    firebase.firestore().collection("users").doc(userUid).onSnapshot(function (doc) {
      console.log("Current data: ", doc.data());
      self.setState({
        accounts: doc.data().Accounts
      });
    });
  }

  onAccountChange(selectedOption) {
    let defaultColor = "color: gray";
    //initialize each month to have a value of 0
    let data =[];

    if (selectedOption.label === "Monthly") {
      data =[[],["January"],
      ["February"],
      ["March"],
      ["April" ],
      ["May"],
      ["June" ],
      ["July" ],
      ["August"],
      ["September" ],
      ["October"],
      ["November"],
      ["December"]];
      let account;
      let accountNames = ["Accounts"];
      let transaction;
      let tempData = [["January"],
      ["February"],
      ["March"],
      ["April" ],
      ["May"],
      ["June" ],
      ["July" ],
      ["August"],
      ["September" ],
      ["October"],
      ["November"],
      ["December"]];
      for (account of this.state.accounts) {
        accountNames.push(account.name);
        for (transaction of account.transactions) {
          let amount = transaction.amount;
          let date = new Date(transaction.date);
          let month = date.getMonth();
          if (month !== NaN) {
            tempData[month + 1].push(parseFloat(amount));
          }
        }
        let tempDataItem;
        for(tempDataItem of tempData){
          if(tempDataItem.length === 1){
            tempDataItem.push(0.0);
          }
        }
        let j =1;
        for(j=1; j<=12;j++){
          data[j].push(tempData[j-1][1]);
        }
      }
      let j =1;
      for(j=1; j<=12;j++){
        data[j].push('');
      }
      accountNames.push({role: 'annotation'})
      data[0] = accountNames;
    }

    else if (selectedOption.label === "Daily"){
      data =[[],["SUN"],
      ["MON"],
      ["TUE"],
      ["WED" ],
      ["THR"],
      ["FRI" ],
      ["SAT" ]];

      let accounts = this.state.accounts;
      let account;
      let accountNames = ["Accounts"];
      let transaction;
      let tempData = [["SUN"],
      ["MON"],
      ["TUE"],
      ["WED" ],
      ["THR"],
      ["FRI" ],
      ["SAT" ]];
      for (account of this.state.accounts) {
        accountNames.push(account.name);
        for (transaction of account.transactions) {
          let amount = transaction.amount;
          let date = new Date(transaction.date);
          let day = date.getDay();
          if (day !== NaN) {
            tempData[day + 1].push(parseFloat(amount));
          }
        }
        let tempDataItem;
        for(tempDataItem of tempData){
          if(tempDataItem.length === 1){
            tempDataItem.push(0.0);
          }
        }
        let j =1;
        for(j=1; j<=7;j++){
          data[j].push(tempData[j-1][1]);
        }
      }
      let j =1;
      for(j=1; j<=7;j++){
        data[j].push('');
      }
      accountNames.push({role: 'annotation'})
      data[0] = accountNames;

    }

    else if (selectedOption.label === "Annually"){

    }

    else {
      data = [
        ["Month", "Amount", { role: "style" }],
        ["January", 0.0, defaultColor],
        ["February", 0.0, defaultColor],
        ["March", 0.0, defaultColor],
        ["April", 0.0, defaultColor],
        ["May", 0.0, defaultColor],
        ["June", 0.0, defaultColor],
        ["July", 0.0, defaultColor],
        ["August", 0.0, defaultColor],
        ["September", 0.0, defaultColor],
        ["October", 0.0, defaultColor],
        ["November", 0.0, defaultColor],
        ["December", 0.0, defaultColor],
      ];
      let account = selectedOption.value;
      if (account && account.transactions) {
        let transaction;

        for (transaction of account.transactions) {
          let amount = transaction.amount;
          var date = new Date(transaction.date);
          let month = date.getMonth();
          if (month !== NaN) {
            data[month + 1][1] += parseFloat(amount);
          }
        }
      }
      let minMonthIndex = 1;
      let minSpending = 1000;
      let maxMonthIndex = 12;
      let maxSpending = data[12][1];
      let i;
      for(i = 1; i< data.length;i++){
        let monthSpending = data[i][1];
        if(monthSpending < minSpending && monthSpending !== 0){
          minMonthIndex = i;
          minSpending = monthSpending;
        }
  
        if(monthSpending > maxSpending){
          maxMonthIndex = i;
          maxSpending = monthSpending;
        }
      }
  
  
      data[minMonthIndex][2] = "color: green";
      data[maxMonthIndex][2] = "color: red";
    }



    this.setState({
      chartData: data,
    });
  }

  render() {
    let account;
    let options = [];
   /*  for (account of this.state.accounts) {
      options.push({ value: account, label: account.name });
    } */

   

    ///Instead of having the accounts as options, do it over time (weekly, monthly, annual) for all accounts
    if (this.state.accounts.length >= 1) {

      options.push({ value: "daily", label: "Daily", });
      options.push({ value: "monthly", label: "Monthly" });
      options.push({ value: "annually", label: "Annually" });
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
              minValue:0,
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



