const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

const init = function() {
    if(admin.apps.length === 0) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://project2426-3ab97.firebaseio.com",
            timestampsInSnapshots: true,
        });
        const firestore = admin.firestore();
        firestore.settings({ timestampsInSnapshots: true });
        return firestore
    }
    else {
        return admin.firestore();
    }
}

exports.onJmaUserCreated = functions.region("asia-northeast1").auth.user().onCreate((user) => {
    const db = init();
    return db.collection("jmaUser").doc(user.uid).set({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        leftMoves: 200,
    });
})

const HOW_MANY_ALPHABET = 500;
const atoz = "abcdefghijklmnopqrstuvwxyz"
exports.moveAlphabet = functions.region("asia-northeast1").https.onRequest((req, res) => {
    cors(req, res, () => {
        const db = init();
        let { id, x, y, uid, charactor } = req.query;
        id = parseInt(id); x = parseFloat(x); y = parseFloat(y);
        
        // 검증
        let validationError = false
        if (id < 0 || id > HOW_MANY_ALPHABET) validationError = true
        if (x < 0 || x > 100) validationError = true
        if (y < 0 || y > 100) validationError = true
        if (atoz.search(charactor) < 0) validationError = true
        if (validationError) throw new functions.https.HttpsError("Validation error", "Wrong [id, x, y] is included in request.");
        
        // 로직
        db.collection("jmaUser").doc(uid).get().then(doc => {
            let { name, email, leftMoves } = doc.data();
            if (leftMoves === 0) {
                console.log(`leftMoves is 0, so move request is denied. name: ${name} email: ${email}`)
                throw new functions.https.HttpsError("No Left Opportunity", "left opportunity to move alphabet are zero.");
            }
            leftMoves -= 1
            return Promise.all([
                leftMoves,
                db.collection("jmaUser").doc(uid).update({ leftMoves }),
                db.collection("alphabets").doc("info").update({
                    [id]: { x, y, email, charactor, lastMoved: Math.floor(Date.now() % 1234567890) } 
                })
            ])
        })
        .then(([leftMoves]) => {
            res.json({ message: `남은 횟수는 ${leftMoves} 번!`});
        });
    });
})