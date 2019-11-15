# Prepared Statements in Node.js
This example demonstrates how to use the prepared statements in Node.js to insert and retrieve data from a Cassandra cluster.

Contributors: [Dave Bechberger](https://github.com/bechbd)

## Objectives

* To provides a singular example of how to insert and retrieve data using prepared statements in Node.js
  
## Project Layout

* app.js - The main application file which contains the example code for using prepared statements

## How this Sample Works
This example starts by first, creates a `videos` table in the `examples` keyspace.

Once this table is created the code runs through an insert and an select using a prepared statement.  To create a statement as a prepared statement in Node.js you use a command like:

`client.execute(query, params, { prepare: true })`

The critical part of that command is the third parameter `{ prepare: true }`.  Adding this parameter makes this a prepared statement.  Prepared statements are beneficial for several reasons:

* Prepared statements are parsed and stored on the Cassandra nodes which increase the performance of subsequent queries by preparing them once and executing them many times with bound parameters
* Prepared statements allow for proper mapping of Javascript types to Cassandra types


## Setup and Running

### Prerequisites

* Node.Js version 8
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

