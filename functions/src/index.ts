import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);
const ref = admin.database().ref();

export let createUserAccount = functions.auth.user().onCreate(event => {
    const uid = event.data.uid;
    const email = event.data.email;
    const displayName = event.data.displayName || email || uid;
    const photoURL = event.data.photoURL || null;
    const newUserRef = ref.child(`/users/${uid}`);
    return newUserRef.set({
        photoURL: photoURL,
        email: email,
        displayName: displayName,
        uid: uid
    });
});

export let cleanupUserAccount = functions.auth.user().onDelete(event => {
    const uid = event.data.uid;
    const userRef = ref.child(`/users/${uid}`)
    return userRef.remove();
})

export let changeDisplayname = functions.database.ref('/users/{uid}').onUpdate((event:any) => {
    var eventSnapshot = event.data;
    var eventAuthor = event.auth.variable;
    var profileDisplaynameSnapshot = eventSnapshot.child('displayName');
    if (profileDisplaynameSnapshot.changed()) {
        var displayName = profileDisplaynameSnapshot.val();
        return admin.database().ref(`posts`)
        .orderByChild('authorUid').equalTo(eventAuthor.user_id).once('value')
        .then(posts => {
            var postsValue = posts.val();
            return Object.keys(postsValue).map(key => postsValue[key])
            .forEach((post) =>{
                post.postOption.author = displayName;
                return admin.database().ref('/posts/'+post.postOption.slug+'/postOption').update({ author:displayName})
            })  
        })
    }
})


import * as express from 'express';
import * as cors from 'cors';
import * as SparkPost from 'sparkpost';
import * as path from 'path';

const client = new SparkPost('34c85e570d05fc0a1f0e200dc6d4103a6a666354');
const app = express();
app.use(cors({origin: true}))

app.get('/api/v1/templates',(req, res) => {
    client.templates.list()
    .then(data => {
        res.status(200).send({message:'success',templates:data.results})
    })
    .catch(err => {
        res.status(400).send({message:'error',err})
    });
})

app.post('/api/v1/campain',(req, res) => {

    admin.database().ref(`subscribers`)
    .once('value', (snapshot) => {
        let recipients = Object.keys(snapshot.val()).map(key => snapshot.val()[key]);
        let recipientsForm = {
            id: 'quyenanhkt', 
            name: 'quyenanhkt', 
            recipients:recipients
        };
        client.recipientLists.update('quyenanhkt',recipientsForm)
        .then(data => {
            let transmission = {
                campaign_id: req.body.campainID,
                content: {template_id: req.body.templateID},
                recipients: {list_id: 'quyenanhkt'}
            }

            let options = {
                num_rcpt_errors: 3
            };

            client.transmissions.send(transmission, options)
            .then(data => {
                res.status(200).send({message:'Done',data:data.results})
            })
            .catch(err => {
                res.status(400).send({message:'error',err})
            });
        })
        .catch(err => {
            res.status(400).send({message:'error',err})
        });
    })
})

export let main = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}` // prepend '/' to keep query params if any
  }
  return app(request, response)
})


