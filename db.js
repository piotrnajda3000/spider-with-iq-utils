const path = require("path");
const fs = require("fs");
const sqlite = require("sqlite3").verbose();
const json2csv = require("json2csv");

const devFile = require("./spider/dev.json");

const arguments = process.argv.slice(2);

const dbName = arguments[0];

const destDbName = arguments[1] || "Default";

const destScopeName = arguments[2] || dbName;

const dbFolderPath = path.join(__dirname, "spider", "database", dbName);

console.log(dbFolderPath);

// Read CREATE TABLE names from schema.sql into an array
const schemaFileLines = fs
  .readFileSync(path.join(dbFolderPath, "schema.sql"), "utf8")
  .split("\n");

const collectionNames = schemaFileLines
  .filter((line) => {
    return line.includes("CREATE TABLE");
  })
  .map((line) => {
    return line.split(" ")[2].replace(/"/g, "");
  });

const currentDbDevData = devFile.filter((questionData) => {
  return questionData.db_id === dbName;
});

let formattedQuestionsJson = [];

let maxCollectionsUsedInQuery = 0;

currentDbDevData.forEach((questionData) => {
  const collectionsUsedInQuery = [
    ...new Set(
      questionData.query_toks.filter((tok) => {
        return collectionNames.some((coll) => coll === tok);
      })
    ),
  ]
    .filter(Boolean)
    .sort();

  let { db_id, query, question } = questionData;

  question = question
    .replace(/ \?/g, "?")
    .replace(/ \./g, ".")
    .replace(/ ,/g, ",")
    .replace(/  /g, " ");

  query = query
    .replace(/ \?/g, "?")
    .replace(/ \./g, ".")
    .replace(/ ,/g, ",")
    .replace(/  /g, " ");

  maxCollectionsUsedInQuery = Math.max(
    maxCollectionsUsedInQuery,
    collectionsUsedInQuery.length
  );

  formattedQuestionsJson.push({
    db_id,
    question,
    query,
    collection_count_used_in_query: collectionsUsedInQuery.length,
    collections_used_in_query: collectionsUsedInQuery,
  });
});

const sortedFormattedQuestionsJson = formattedQuestionsJson.sort((a, b) => {
  return a.collection_count_used_in_query - b.collection_count_used_in_query;
});

const outputDbPath = path.join(__dirname, "output", dbName);

// Create needed folders
fs.mkdirSync(path.join(outputDbPath, "csv"), { recursive: true });

// Write the JSON file
fs.writeFileSync(
  path.join(outputDbPath, dbName + "_questions.json"),
  JSON.stringify(sortedFormattedQuestionsJson, null, 2)
);

// Clear the .sqlpp file
fs.writeFileSync(path.join(outputDbPath, dbName + ".sqlpp"), "");

const prettyPrintedJsonFile = `
# Questions for ${dbName}:

${Array.from(Array(maxCollectionsUsedInQuery).keys()).map((i) => {
  return `## ${i + 1} collection(s) used in query:

${sortedFormattedQuestionsJson
  .filter((questionData) => {
    return questionData.collection_count_used_in_query === i + 1;
  })
  .map((questionData, i) => {
    return `-------------------------------------------------------------------------------

### ${questionData.collection_count_used_in_query}.${i + 1}:

#### Question

${questionData.question}

#### Query

${questionData.query}

#### Collections

${questionData.collections_used_in_query.join(", ")}
`;
  })
  .join("\n")}
`;
})}
`;

fs.writeFileSync(
  path.join(outputDbPath, dbName + "_questions.md"),
  prettyPrintedJsonFile
);

if (destDbName !== "Default") {
  fs.appendFileSync(
    path.join(outputDbPath, dbName + ".sqlpp"),
    `CREATE DATABASE \`${destDbName}\`;\n\n`
  );
}

// Append create scope if it's non-default
if (destScopeName !== "Default") {
  fs.appendFileSync(
    path.join(outputDbPath, dbName + ".sqlpp"),
    `CREATE SCOPE \`${destDbName}\`.\`${destScopeName}\`;\n\n`
  );
}

const collectionNamesAndPrimaryKeys = {};

const db = new sqlite.Database(path.join(dbFolderPath, `${dbName}.sqlite`));

collectionNames.forEach((collectionName) => {
  // Get primary key for the collection
  db.all(
    `SELECT l.name FROM pragma_table_info("${collectionName}") as l WHERE l.pk = 1;`,
    [],
    (err, rows) => {
      if (err) {
        throw err;
      }
      collectionNamesAndPrimaryKeys[collectionName] = rows[0].name;

      db.all(`SELECT * FROM ${collectionName}`, [], (err, rows) => {
        if (err) {
          throw err;
        }
        /**
         * Write JSON create and upsert statements
         */
        const sqlppPath = path.join(outputDbPath, dbName + ".sqlpp");
        // Write this collection's create statement
        fs.appendFileSync(
          sqlppPath,
          getCreateCollectionStatement(
            collectionName,
            collectionNamesAndPrimaryKeys[collectionName]
          ) + ";\n\n"
        );

        fs.appendFileSync(
          sqlppPath,
          getUpsertCollectionStatement(collectionName, rows) + ";\n\n"
        );

        /**
         * Write CSV
         */
        const csvPath = path.join(outputDbPath, "csv", `${collectionName}.csv`);
        // Generate csv from the json rows, while retaining types:
        const csv = json2csv.parse(rows, {
          fields: Object.keys(rows[0]),
          header: true,
        });
        // Write to file
        fs.writeFile(csvPath, csv, (err) => {
          if (err) {
            throw err;
          }
        });
      });
    }
  );
});

function getUpsertCollectionStatement(collectionName, rows) {
  return `upsert into \`${destDbName}\`.\`${destScopeName}\`.\`${collectionName}\`(${JSON.stringify(
    rows
  )})`;
}

function getCreateCollectionStatement(collectionName, primaryKeyName) {
  return `CREATE COLLECTION \`${destDbName}\`.\`${destScopeName}\`.\`${collectionName}\` PRIMARY KEY (${primaryKeyName}: Int)`;
}

db.close();
