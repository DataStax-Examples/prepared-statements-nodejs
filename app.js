"use strict";
const cassandra = require('cassandra-driver');
const Uuid = cassandra.types.Uuid;
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'dc1' });
const videoId = Uuid.random();
const userId = Uuid.random();
/**
 * Creates a table with a Tuple type, inserts a row and selects a row.
 */
client.connect()
    .then(function () {
        const query = "CREATE KEYSPACE IF NOT EXISTS examples WITH replication =" +
            "{'class': 'SimpleStrategy', 'replication_factor': '1' }";
        return client.execute(query);
    })
    .then(function () {
        const query = 'CREATE TABLE IF NOT EXISTS examples.videos (videoid uuid, userid uuid, name varchar, description varchar, ' +
            ' location text, location_type int, preview_thumbnails map < text, text >, tags set < varchar >, added_date timestamp, ' +
            ' PRIMARY KEY(videoid))';
        return client.execute(query);
    })
    .then(function () {
        console.log('Inserting Data Using a Prepared Statement');
        const query = 'INSERT INTO examples.videos (videoid, userid, name, description)  VALUES (?, ?, ?, ?)';
        const params = [videoId, userId, "Test Movie", "Test Description"];
        //The { prepare: true } in the third parameter is what makes this a prepared statement
        return client.execute(query, params, { prepare: true });
    })
    .then(function () {
        console.log('Selecting Data Using a Prepared Statement');
        const query = 'SELECT videoid, userid, name, description FROM examples.videos where videoid = ?';
        //The { prepare: true } in the third parameter is what makes this a prepared statement
        return client.execute(query, [videoId], { prepare: true });
    })
    .then(function (result) {
        const row = result.first();
        console.log('Video Id: %s, User Id: %s, Name: %s, Description: %s', row['videoid'], row['userid'], row['name'], row['description']);
        return client.shutdown();
    })
    .catch(function (err) {
        console.error('There was an error', err);
        return client.shutdown().then(() => { throw err; });
    });