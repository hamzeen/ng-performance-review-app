# performance review app - backend

  - Get MongoDB (before you install mongoose!): https://treehouse.github.io/installation-guides/mac/mongo-mac.html


### MongoDB CLI commands
  - https://www.dineshonjava.com/mongodb-hello-world-example/
  - https://dzone.com/articles/top-10-most-common-commands-for-beginners
  - setting up auth/roles: https://medium.com/mongoaudit/how-to-enable-authentication-on-mongodb-b9e8a924efac
  
```shell
# list dbs
$/>show dbs
# creates if the db is not found
$/>use chocodb
#show collections
$/>show collections
# show all records in a collection
$/>db.users.find()
# pretty print
$/>db.users.find().pretty()
# clear a collection (deletes all docs)
$/>db.users.remove({});

# insert a record => creates a collection called employees and inserts 'the new document'
$/>db.employees.insert({empName:"Dinesh", age:"26", salary:"50000"})

#search
$/>db.find({empName: "Dinesh"})

# size of a collection
$/>db.collectionName.dataSize()
```
### Connect from a NodeJS app
```js
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true,  useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("successfully connected");
});
```

### Sample Requests
  - [POST] http://localhost:4201/api/v1/users body: { "name": "arthur", "password": "andreas"}
  - [POST] http://localhost:4201/api/v1/login body: { "name": "arthur", "password": "andreas"}
  - [GET]  http://localhost:4201/api/v1/users header: { "authorization", "Bearer signedjwt"}

