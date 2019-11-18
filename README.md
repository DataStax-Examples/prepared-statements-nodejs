# Prepared Statements in Node.js
This example shows how to use the [prepared statements](https://docs.datastax.com/en/devapp/doc/devapp/driversBestPractices.html#driversBestPractices__usePreparedStatements) in the Node.js DataStax Driver to write and read data from a Cassandra database.

Contributors: [Dave Bechberger](https://github.com/bechbd)

## Objectives

* Learn how to use prepared statements in Node.js
  
## Project Layout

* [app.js](app.js) - The main application file, contains the example code for using prepared statements

## How this Sample Works
This example first creates a `videos` table in the `examples` keyspace.

Once this table is created the code runs an `INSERT` and `SELECT` CQL query using a prepared statement. To create a statement as a prepared statement in Node.js you use a command like:

`client.execute(query, params, { prepare: true })`

The critical part of that command is the third parameter `{ prepare: true }`.  Adding this parameter makes this a prepared statement.  Prepared statements are beneficial for several reasons:

* Prepared statements are parsed and stored on the Cassandra nodes which increase the performance of subsequent queries by preparing them once and executing them many times with bound parameters
* Prepared statements allow for proper mapping of Javascript types to Cassandra types


## Setup and Running

### Prerequisites

* Node.Js version 8 ( [download](https://nodejs.org/en/download/) )
* A Cassandra cluster

**Note** This application defaults to connecting to a cluster on localhost with a local data center of `dc1`.  These parameters can be changed on line 4 of [app.js](app.js).

### Running
To run this application use the following command:

`node app.js`

This will produce the following output:

```
Inserting Data Using a Prepared Statement
Selecting Data Using a Prepared Statement
Video Id: 1665ffe0-77eb-4047-8791-f043accda4dd, User Id: 98462781-327b-40dc-9036-91702afdeb77, Name: Test Movie, Description: Test Description
```

