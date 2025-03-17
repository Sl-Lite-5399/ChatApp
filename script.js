// 🔥 Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBim2PwtFrpHLMs5GqGSNauqhe2J0Kjj5k",
    authDomain: "test-web-chat-e5359.firebaseapp.com",
    projectId: "test-web-chat-e5359",
    storageBucket: "test-web-chat-e5359.appspot.com",
    messagingSenderId: "1008359389722",
    appId: "1:1008359389722:web:69ecc325ef753abbc56fa3"
};

// ✅ Firebase ইনিশিয়ালাইজ
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ✅ ইউজার আইডি তৈরি (যাতে দুইজন আলাদা হয়)
const userId = "user_" + Math.random().toString(36).substr(2, 9);
console.log("✅ User ID:", userId);

// ✅ মেসেজ পাঠানোর ফাংশন
function sendMessage() {
    let message = document.getElementById("message").value;
    if (message.trim() !== "") {
        db.collection("messages").add({
            text: message,
            user: userId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            console.log("✅ Message sent!");
        }).catch(error => {
            console.error("❌ Error:", error);
        });

        document.getElementById("message").value = "";
    }
}

// ✅ রিয়েল-টাইম চ্যাট আপডেট
db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";

    snapshot.forEach(doc => {
        let data = doc.data();
        let msg = document.createElement("p");
        msg.textContent = data.text;

        if (data.user === userId) {
            msg.classList.add("message", "sent");
        } else {
            msg.classList.add("message", "received");
        }

        chatBox.appendChild(msg);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
}, error => {
    console.error("❌ Error getting messages:", error);
});
