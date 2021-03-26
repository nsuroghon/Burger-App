// Import MySQL connection.
const connection = require('./connection.js');

// function createQmarks(num) {
//     var arr = [];
//     for (var i = 0; i < num; i++) {
//       arr.push("?");
//     }
//     return arr.toString();
//   }
  
//   function translateSql(ob) {
//     var arr = [];
//     for (var key in ob) {
//       var value = ob[key];
//       if (Object.hasOwnProperty.call(ob, key)) {
//         if (typeof value === "string" && value.indexOf(" ") >= 0) {
//           value = "'" + value + "'";
//         }
//         arr.push(key + "=" + value);
//       }
//     }
//     return arr.toString();
//   }

///   * In the `orm.js` file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.
// * `selectAll()`
// * `insertOne()`
// * `updateOne()`
function createQmarks(num) {
    const arr = [];
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
  }
  
  function translateSql(ob) {
    const arr = [];
    for (const key in ob) {
      var value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = `'${value}'`;
        }
        arr.push(`${key}=${value}`);
      }
    }
    return arr.toString();
  }
  
const orm = {
    selectAll(table, cb) {
        const dbQuery = `"SELECT * FROM ${table}`;
        connection.query(dbQuery, (err, res) => {
        if (err) {
          throw err;
        }
        cb(res);
      });
    },

    insertOne(table, cols, vals, cb) {
      let queryString = `INSERT INTO ${table}`;
  
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
  
      connection.query(queryString, vals, (err, result) => {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
    updateOne(table, objColVals, condition, cb) {
      let queryString = `UPDATE ${table}`;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      connection.query(queryString, (err, result) => {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
  };

module.exports = orm;