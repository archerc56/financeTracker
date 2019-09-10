import firebase from "../firebase";
	
/**
 * Util class for retrieving data from the database
 */
class DatabaseUtil {
	
	/**
	 * DatabaseException definition
	 * 
	 * @param {String} message - message for the exception
	 */
	DatabaseException(message) {
	   this.message = message;
	   this.name = 'DatabaseException';
	   console.log(`${this.name}: ${this.message}`);
	}

    /**
     * Adds a new transaction to the given account
     * 
     * @param {Object} account Account to add the transaction to
     * @param {Object} transaction New transaction to add
     */
    static addTransactionToDatabase(currentAccount, newTransaction) {
        
        //Gets the current user's id
        const userUid = firebase.auth().currentUser.uid;

        //Stores a reference to the database
        const db = firebase.firestore();

        //Stores a reference to the user's account document
        const accountDocRef = db.collection("users").doc(userUid);

        //Adds the transaction to the given account
        db.runTransaction(function(transaction) {
            
            return transaction.get(accountDocRef).then(function(accountDoc) {
                if (!accountDoc.exists) {
                    throw new this.DatabaseException("Document does not exist!");
                }
    
                //Stores a copy of the accounts
                const accounts = accountDoc.data().Accounts;
                
                let accountFound = false;

                if(accounts){

                    //Loops over the user's financial accounts to find the right account
                    accounts.forEach((account) => {
                        if(account.id === currentAccount.id && account.name === currentAccount.name){
                            account.transactions.push(newTransaction); 
                            accountFound = true;   
                        }
                    });
                }

                if(!accountFound){
                    throw new this.DatabaseException("Given account not found");
                }

                //Overwrites the existing Accounts with the updated version
                transaction.set(accountDocRef, { Accounts: accounts });
            });
        }).then(function() {
            console.log("Transaction successfully committed!");
        }).catch(function(error) {
            console.log("Transaction failed: ", error);
        });
    }

    /**
     * Adds a new account to the database
     * 
     * @param {String} name name of the new account
     * @param {String} id id of the new account
     */
    static addAccountToDatabase(name, id) {
        
        //Creates an account object from the given name and id
        let account =  {
            name: name,
            id: id,
            transactions:[],
        }
        
        //Current user's id
        const userUid = firebase.auth().currentUser.uid;

        //Adds the account to the user's section of the database
        firebase.firestore().collection("users")
            .doc(userUid).update({
                Accounts: firebase.firestore.FieldValue.arrayUnion(account)
        });
    }
	
	/**
     * Adds a new goal to the database
     * 
     * @param {String} description - description of the goal
     * @param {int} id - id of the goal
     */
    static addGoalToDatabase(description, id) {
        
        //Creates an goal object from the given description
        const goal =  {
            description: description,
            id: id,
			complete: false,
        }
        
        //Current user's id
        const userUid = firebase.auth().currentUser.uid;

        //Adds the goal to the user's section of the database
        firebase.firestore().collection("users")
            .doc(userUid).update({
                Goals: firebase.firestore.FieldValue.arrayUnion(goal)
        });
    }
	
	/**
     * Update a goal list in the database with the passed in goals
     * Adds a new budget to the database
     * 
     * @param {String} month - month of the budget
	 * @param {String} year - year of the budget
	 * @param {Object} budgetCategories - array of objects showing category and amount allotted
     */
    static addBudgetToDatabase(month, year, budgetCategories) {
        
        //Creates an budget object from the given month, year, and budgetCategories
        const budget =  {
            month: month,
			year: year,
			budgetCategories: budgetCategories,
        }
        
        //Current user's id
        const userUid = firebase.auth().currentUser.uid;

        //Adds the goal to the user's section of the database
        firebase.firestore().collection("users")
            .doc(userUid).update({
                Budgets: firebase.firestore.FieldValue.arrayUnion(budget)
        });
    }
	
	/**
     * Update a goal in the database
     * 
     * @param {Object[]} goals - Goals to replace the existing goals
     */
    static updateGoalsInDatabase(goals) {
        
        //Current user's id
        const userUid = firebase.auth().currentUser.uid;

        //Replaces the Goals in the database with the passed in list of goals
        firebase.firestore().collection("users")
            .doc(userUid).update({
                Goals: goals
        });
    }

    /**
     * Creates a entry in the database for a new user
     */
    static createUserDatabaseEntry(){
        const userUid = firebase.auth().currentUser.uid;

        //Creates an Accounts array that will be used to store all the user's accounts that
		//comes with default Checking Account
		//Also comes with an empty Goals array
        const accountData = {
            Accounts: [
				{
					name: 'Checking',
					id: '1',
					transactions:[],
				},
			],
			Budgets:[],
			Goals: [],
        };

        firebase.firestore().collection("users").doc(userUid).set(accountData);
			
    }
    
}

export default DatabaseUtil;