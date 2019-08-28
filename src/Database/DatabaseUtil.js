import firebase from "../firebase";

/**
 * Util class for retrieving data from the database
 */
class DatabaseUtil {

    /**
     * Adds a new transaction to the given account
     * 
     * @param {Object} account Account to add the transaction to
     * @param {Object} transaction New transaction to add
     */
    static addTransactionToDatabase(currentAccount, newTransaction) {
        
        //Gets the current user's id
        var userUid = firebase.auth().currentUser.uid;

        //Stores a reference to the database
        const db = firebase.firestore();

        //Stores a reference to the user's account document
        var accountDocRef = db.collection("users").doc(userUid);

        //Adds the transaction to the given account
        db.runTransaction(function(transaction) {
            
            return transaction.get(accountDocRef).then(function(accountDoc) {
                if (!accountDoc.exists) {
                    throw "Document does not exist!";
                }
    
                //Stores a copy of the accounts
                var accounts = accountDoc.data().Accounts;
                
                let account = null;
                let accountFound = false;

                if(accounts){

                    //Loops over the user's financial accounts to find the right account
                    for(account of accounts){
                        if(account.id === currentAccount.id && account.name === currentAccount.name){
                            account.transactions.push(newTransaction); 
                            accountFound = true;   
                        }
                    }
                }

                if(!accountFound){
                    throw "Given account not found"
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
        var userUid = firebase.auth().currentUser.uid;

        //Adds the account to the user's section of the database
        firebase.firestore().collection("users")
            .doc(userUid).update({
                Accounts: firebase.firestore.FieldValue.arrayUnion(account)
        });
    }

    /**
     * Creates a entry in the database for a new user
     */
    static createUserDatabaseEntry(){
        var userUid = firebase.auth().currentUser.uid;

        //Creates an empty Accounts array that will be used to store all the user's accounts
        let accountData = {
            Accounts: []
        }

        firebase.firestore().collection("users").doc(userUid).set(accountData);
    }
    
}

export default DatabaseUtil;