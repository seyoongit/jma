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

const test = function() {
    const db = init();
    gae = 0, a = "q"
    for (let i=492; i<497; i++) {
        gae += 1
        db.collection("alphabets").doc("info").update({
            [i]: {
                charactor: a,
                email: "admin",
                lastMoved: 1,
                x: Math.random()*80,
                y: Math.random()*80,
            }
        })
    }
    console.log(a, gae, "개")
}


test()