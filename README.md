# file-upload
a test project that uploads and fetchs different types of files from the Mongo database
![image of UI](https://github.com/juhaj77/file-upload/blob/main/screenshot.png)    
## prerequisites

* MongoDB [installation](https://docs.mongodb.com/manual/installation/)
* npm [get npm](https://www.npmjs.com/get-npm)

## installation

1. run `npm install` in folder `client`
1. run `npm install` in folder `server`
1. create _.env_ file with content:
   ```
    PORT=8001
    MONGODB_URI=mongodb://127.0.0.1:27017/files
    NODE_ENV=developtment
   ```
    into folder `server`

## usage

1. `node index.js` in **server** folder.
1. `npm run dev` in **client** folder.
