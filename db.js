const path = require("path");
const fs = require("fs");
const sqlite = require("sqlite3").verbose();
const json2csv = require("json2csv");

const devFile = require("./spider/dev.json");
const trainFile = require("./spider/train_spider.json");

const arguments = process.argv.slice(2);

const flags = arguments.filter((arg) => arg.startsWith("--"));

const dontCreateScope =
  flags.includes("--dont-create-scope") || flags.includes("--dcs");

const noFlagsArgs = arguments.filter((arg) => !arg.startsWith("--"));

const columnarOrProvisioned = noFlagsArgs[0];
const isColumnar =
  columnarOrProvisioned === "columnar" || !columnarOrProvisioned;

const dbName = noFlagsArgs[1];

const destDbName = isColumnar ? noFlagsArgs[2] || "Default" : noFlagsArgs[2];

if (!isColumnar && !destDbName) {
  console.error(
    "Provisioned mode requires a database name as the second argument, as we can't do CREATE DATABASE like for Columnar."
  );
  process.exit(1);
}

const destScopeName = noFlagsArgs[3] || dbName;

const dbFolderPath = path.join(__dirname, "spider", "database", dbName);

// Read CREATE TABLE names from schema.sql into an array
const schemaFileLines = fs
  .readFileSync(path.join(dbFolderPath, "schema.sql"), "utf8")
  .split("\n");

const collectionNames = schemaFileLines
  .filter((line) => {
    return line.toLowerCase().includes("create table");
  })
  .map((line) => {
    return line.split(" ")[2].replace(/"/g, "");
  });

let currentDbDevData = devFile.filter((questionData) => {
  return questionData.db_id === dbName;
});

if (!currentDbDevData.length) {
  currentDbDevData = trainFile.filter((questionData) => {
    return questionData.db_id === dbName;
  });
}

if (!currentDbDevData.length) {
  console.error(
    `Questions for ${dbName} not found in dev.json nor train_spider.json. Please use another database or create your own questions for that DB.`
  );
  process.exit(1);
}

let formattedQuestionsJson = [];

let maxCollectionsUsedInQuery = 0;

currentDbDevData.forEach((questionData) => {
  const collectionsUsedInQuery = [
    ...new Set(
      questionData.query_toks
        .filter((tok) => {
          return collectionNames.some(
            (coll) => coll.toLowerCase() === tok.toLowerCase()
          );
        })
        .map((tok) => {
          return collectionNames.find(
            (coll) => coll.toLowerCase() === tok.toLowerCase()
          );
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

  // Some collections in the dataaset are uppercase which won't work. We
  // have to replcae them with actual names from the schema.sql file.
  const regex = new RegExp(
    collectionNames.map((name) => name.toUpperCase()).join("|"),
    "g"
  );
  query = query.replace(regex, (match) => {
    return collectionNames.find(
      (name) => name.toUpperCase() === match.toUpperCase()
    );
  });

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
if (isColumnar) {
  fs.writeFileSync(path.join(outputDbPath, dbName + "_columnar.sqlpp"), "");
} else {
  fs.writeFileSync(path.join(outputDbPath, dbName + "_provisioned.sqlpp"), "");
}

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

if (destDbName !== "Default" && isColumnar) {
  fs.appendFileSync(
    path.join(outputDbPath, dbName + "_columnar.sqlpp"),
    `CREATE DATABASE \`${destDbName}\`;\n\n`
  );
}

// Append create scope if it's non-default
if (destScopeName !== "Default" && !dontCreateScope) {
  if (isColumnar) {
    fs.appendFileSync(
      path.join(outputDbPath, dbName + "_columnar.sqlpp"),
      `CREATE SCOPE \`${destDbName}\`.\`${destScopeName}\`;\n\n`
    );
  } else {
    fs.appendFileSync(
      path.join(outputDbPath, dbName + "_provisioned.sqlpp"),
      `CREATE SCOPE \`${destDbName}\`.\`${destScopeName}\`;\n\n`
    );
  }
}

const collectionNamesAndPrimaryKeys = {};

const db = new sqlite.Database(path.join(dbFolderPath, `${dbName}.sqlite`));

collectionNames.forEach((collectionName) => {
  // Get primary key for the collection
  db.all(
    `SELECT l.name FROM pragma_table_info("Voting_record") as l WHERE l.pk = 1;`,
    [],
    (err, rows) => {
      if (err) {
        throw err;
      }

      if (!rows[0]?.name && isColumnar) {
        throw new Error(
          `For this database, primary key does not exist for ${collectionName} collection. Primary key is required for Columnar mode.`
        );
      }

      if (isColumnar) {
        collectionNamesAndPrimaryKeys[collectionName] = rows[0].name;
      }

      db.all(`SELECT * FROM ${collectionName}`, [], (err, rows) => {
        if (err) {
          throw err;
        }
        /**
         * Write JSON create and upsert statements
         */
        const sqlppPath = isColumnar
          ? path.join(outputDbPath, dbName + "_columnar" + ".sqlpp")
          : path.join(outputDbPath, dbName + "_provisioned" + ".sqlpp");
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
  if (isColumnar) {
    return `upsert into \`${destDbName}\`.\`${destScopeName}\`.\`${collectionName}\`(${JSON.stringify(
      rows
    )})`;
  }
  return (
    `INSERT INTO \`${destDbName}\`.\`${destScopeName}\`.\`${collectionName}\` VALUES ` +
    rows
      .map((row, i) => {
        return `("${collectionName}_${i}", ${JSON.stringify(row)})`;
      })
      .join(", ")
      .trim()
  );
}

function getCreateCollectionStatement(collectionName, primaryKeyName) {
  if (isColumnar) {
    return `CREATE COLLECTION \`${destDbName}\`.\`${destScopeName}\`.\`${collectionName}\` PRIMARY KEY (${primaryKeyName}: Int)`;
  }
  return `CREATE COLLECTION \`${destDbName}\`.\`${destScopeName}\`.\`${collectionName}\``;
}

db.close();
