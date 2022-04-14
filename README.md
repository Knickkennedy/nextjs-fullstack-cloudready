## Example app using MongoDB

[MongoDB](https://www.mongodb.com/) is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. This example will show you how to connect to and use MongoDB as your backend for your Next.js app.

If you want to learn more about MongoDB, visit the following pages:

- [MongoDB Atlas](https://mongodb.com/atlas)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Configuration

### Set up a MongoDB database

Set up a MongoDB database either locally or with [MongoDB Atlas for free](https://mongodb.com/atlas).

### Set up environment variables

Copy the `env.example` file in this directory to `.env` (which will be ignored by Git):

```bash
cp .env.example .env
```

Set each variable on `.env`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster. Note: When clicking connect you'll need to select a version of node.js to compare against. If you are planning on containerizing this application then you'll need the mongodb uri for node version >= 2.2.

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)!

You will either see a message stating "You are connected to MongoDB" or "You are NOT connected to MongoDB". Ensure that you have provided the correct `MONGODB_URI` environment variable.

When you are successfully connected, you can refer to the [MongoDB Node.js Driver docs](https://mongodb.github.io/node-mongodb-native/3.4/tutorials/collections/) for further instructions on how to query your database.

An example query has been provided in pages/api/airbnb to signify the dynamic querying of next.js. This uses the example data provided by MongoDB when creating a new database and is intended to showcase how the url query links to a database.
This particular setup means if you query <base_url>/api/airbnb/<name_to_query_against> it will return a json object containing the name and summary of that airbnb location.