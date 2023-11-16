# Spider dataset into Couchbase util tool

First, run `npm i`.

You might need to make the script executable with `chmod+ x db.js` or
something else on Windows.

**Usage**:

- `node ./db.js <<spider_db>> <<destination_db>> <<destination_scope>>`
  - If <<destination_db>> is not provided, it's equal to "Default",
  - If <<destination_scope>> is not provided, it defaults to <<spider_db>>.

E.g.:

- `./db.js concert_singer MyDatabase MyScope`,
- `.db.js concert_singer MyDatabase` -> Creates `CREATE` and `UPSERT` statements for `MyDatabase`.`concert_singer`,
- `./db.js concert_singer` -> Creates `CREATE` and `UPSERT` statements for `Default`.`concert_singer`.

**Output**:

- Use the .csv files inside `output/<<spider_db>>/csv` to import data with
  Mongo Compass,
- Use `output/<<spider_db>>.sqlpp` file in the Query Editor to create needed
  database, scope and insert the data.,
- Use `output/<<spider_db>>_questions.(json|md)` files for testing iQ.

Note: soccer_1 database didn't fit here due to GH filesize limit. You
can download it separately
[here](https://drive.google.com/uc?export=download&id=1TqleXec_OykOYFREKKtschzY29dUcVAQ)
if you wish.
