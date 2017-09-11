var functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase);

const ref = admin.database().ref();

exports.createUserAccount = functions.auth.user().onCreate(event => {
    const uid = event.data.uid;
    const email = event.data.email;
    const displayName = event.data.displayName || email || uid;
    const photoURL = event.data.photoURL || 'https://apt-port-161714.firebaseapp.com/assets/images/avatar.png';
    const newUserRef = ref.child(`/users/${uid}`)
    return newUserRef.set({
        photoURL: photoURL,
        email: email,
        displayName: displayName,
        uid: uid
    })
})

exports.cleanupUserAccount = functions.auth.user().onDelete(event => {
    const uid = event.data.uid;
    const userRef = ref.child(`/users/${uid}`)
    return userRef.remove();
})

exports.changeDisplayname = functions.database.ref('/users/{uid}').onUpdate(event => {
    var eventSnapshot = event.data;
    var eventAuthor = event.auth.variable;
    var profileDisplaynameSnapshot = eventSnapshot.child('displayName');
    if (profileDisplaynameSnapshot.changed()) {
        var displayName = profileDisplaynameSnapshot.val();
        console.log('lần thử thứ:',displayName)
        return admin.database().ref(`posts`)
        .orderByChild('authorUid').equalTo(eventAuthor.user_id).once('value')
        .then(posts => {
            var postsValue = posts.val();
            return Object.keys(postsValue).map(key => postsValue[key])
            .forEach((post) =>{
                console.log('nội dung bài post là gì',post,typeof(post))
                console.log('post.postOption',post.postOption)
                console.log("Tên tác giả cũ và mới",post.postOption.author,displayName)
                post.postOption.author = displayName;
                return admin.database().ref('/posts/'+post.postOption.slug+'/postOption').update({ author:displayName})
            })  
        })
    }
})

exports.generateFeatureType = functions.database.ref('/posts/{postSlug}').onUpdate(event => {
    var eventSnapshot = event.data;
    var eventAuthor = event.auth.variable;
    var featureSnapshot = eventSnapshot.child('postMark/isFeatured');
    if (featureSnapshot.changed()) {
        var postValue = eventSnapshot.val();
        var category = postValue.postOption.category;
        if (postValue.postMark.isFeatured) return admin.database().ref(`/posts/${postValue.postOption.slug}/postMark`)
        .update({featureType:category}) 
        else return admin.database().ref(`/posts/${postValue.postOption.slug}/postMark`)
        .update({featureType:null})
    }
})

exports.generatePublishType = functions.database.ref('/posts/{postSlug}').onUpdate(event => {
    var eventSnapshot = event.data;
    var eventAuthor = event.auth.variable;
    var publishSnapshot = eventSnapshot.child('postMark/isPublished');
    if (publishSnapshot.changed()) {
        var postValue = eventSnapshot.val();
        var category = postValue.postOption.category;
        if (postValue.postMark.isPublished) return admin.database().ref(`/posts/${postValue.postOption.slug}/postMark`)
        .update({publishType:category}) 
        else return admin.database().ref(`/posts/${postValue.postOption.slug}/postMark`)
        .update({publishType:null})
    }
})
