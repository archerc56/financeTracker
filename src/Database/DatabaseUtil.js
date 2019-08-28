import firebase from "../firebase";

class DatabaseUtil {

    /**
     * 
     * @param {Object} account 
     * @param {Object} transaction 
     */
    static addTransactionToDatabase(account, transaction) {
        var userUid = firebase.auth().currentUser.uid;
        firebase
            .firestore()
            .collection("users")
            .doc(userUid)
            .collection(account.name)
            .doc(transaction.name)
            .set(transaction);
    }

    /**
     * 
     * @param {Object} account 
     */
    static getTransactionsFromAccountPromise(account) {
        var userUid = firebase.auth().currentUser.uid;
        return firebase.firestore().collection("users").doc(userUid)
            .collection(account.name).get();/* .then(function (querySnapshot) {
                var doc = null;
                for(doc of querySnapshot.docs){

                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                }
            }); */
    }
}

export default DatabaseUtil;