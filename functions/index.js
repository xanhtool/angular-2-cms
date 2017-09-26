"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions = require("firebase-functions");
var admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
var ref = admin.database().ref();
exports.createUserAccount = functions.auth.user().onCreate(function (event) {
    var uid = event.data.uid;
    var email = event.data.email;
    var displayName = event.data.displayName || email || uid;
    var photoURL = event.data.photoURL || null;
    var newUserRef = ref.child("/users/" + uid);
    return newUserRef.set({
        photoURL: photoURL,
        email: email,
        displayName: displayName,
        uid: uid
    });
});
exports.cleanupUserAccount = functions.auth.user().onDelete(function (event) {
    var uid = event.data.uid;
    var userRef = ref.child("/users/" + uid);
    return userRef.remove();
});
exports.changeDisplayname = functions.database.ref('/users/{uid}').onUpdate(function (event) {
    var eventSnapshot = event.data;
    var eventAuthor = event.auth.variable;
    var profileDisplaynameSnapshot = eventSnapshot.child('displayName');
    if (profileDisplaynameSnapshot.changed()) {
        var displayName = profileDisplaynameSnapshot.val();
        return admin.database().ref("posts")
            .orderByChild('authorUid').equalTo(eventAuthor.user_id).once('value')
            .then(function (posts) {
            var postsValue = posts.val();
            return Object.keys(postsValue).map(function (key) { return postsValue[key]; })
                .forEach(function (post) {
                post.postOption.author = displayName;
                return admin.database().ref('/posts/' + post.postOption.slug + '/postOption').update({ author: displayName });
            });
        });
    }
});
var express = require("express");
var cors = require("cors");
var SparkPost = require("sparkpost");
var client = new SparkPost('34c85e570d05fc0a1f0e200dc6d4103a6a666354');
var app = express();
app.use(cors({ origin: true }));
app.get('/api/v1/templates', function (req, res) {
    client.templates.list()
        .then(function (data) {
        res.status(200).send({ message: 'success', templates: data.results });
    })
        .catch(function (err) {
        res.status(400).send({ message: 'error', err: err });
    });
});
app.post('/api/v1/campain', function (req, res) {
    admin.database().ref("subscribers")
        .once('value', function (snapshot) {
        var recipients = Object.keys(snapshot.val()).map(function (key) { return snapshot.val()[key]; });
        var recipientsForm = {
            id: 'quyenanhkt',
            name: 'quyenanhkt',
            recipients: recipients
        };
        client.recipientLists.update('quyenanhkt', recipientsForm)
            .then(function (data) {
            var transmission = {
                campaign_id: req.body.campainID,
                content: { template_id: req.body.templateID },
                recipients: { list_id: 'quyenanhkt' }
            };
            var options = {
                num_rcpt_errors: 3
            };
            client.transmissions.send(transmission, options)
                .then(function (data) {
                res.status(200).send({ message: 'Done', data: data.results });
            })
                .catch(function (err) {
                res.status(400).send({ message: 'error', err: err });
            });
        })
            .catch(function (err) {
            res.status(400).send({ message: 'error', err: err });
        });
    });
});
exports.main = functions.https.onRequest(function (request, response) {
    if (!request.path) {
        request.url = "/" + request.url;
    }
    return app(request, response);
});
//# sourceMappingURL=index.js.map