const db = require("../config/db");

// // SIGNUP + OLD USER CHECK
// exports.signup = (req, res) => {
//     const { email, username, first_name, last_name, password } = req.body;

//     if (!email || !username || !password) {
//         return res.json({ success: false, msg: "Required fields missing" });
//     }

//     const sqlCheck = "SELECT * FROM users WHERE email = ? LIMIT 1";

//     db.query(sqlCheck, [email], (err, rows) => {
//         if (err) return res.json({ success: false, msg: "Database error" });

//         // ========== OLD USER FOUND ==========
//         if (rows.length > 0) {
//             const oldUser = rows[0];

//             if (
//                 oldUser.first_name === first_name &&
//                 oldUser.last_name === last_name &&
//                 oldUser.username === username &&
//                 oldUser.password === password
//             ) {
//                 return res.json({
//                     success: true,
//                     msg: "Welcome again! You are already registered.",
//                     type: "old_user",
//                     user: oldUser      // ⭐ ADD THIS
//                 });
//             }

//             return res.json({
//                 success: false,
//                 msg: "Please enter the correct details of your existing account."
//             });
//         }

//         // ========== NEW USER INSERT ==========
//         const sqlInsert =
//             "INSERT INTO users (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)";

//         db.query(sqlInsert,
//             [first_name, last_name, username, email, password],
//             (err2, result) => {
//                 if (err2) {
//                     if (err2.code === "ER_DUP_ENTRY") {
//                         return res.json({
//                             success: false,
//                             msg: "Email or username already exists"
//                         });
//                     }
//                     return res.json({ success: false, msg: "Database error" });
//                 }

//                 // INSERT ke baad new user ki ID return karein
//                 return res.json({
//                     success: true,
//                     msg: "Account created successfully!",
//                     type: "new_user",
//                     user: {
//                         id: result.insertId,  // ⭐ ADD THIS
//                         email,
//                         first_name,
//                         last_name,
//                         username,
//                         password
//                     }
//                 });
//             }
//         );
//     });
// };

exports.signup = (req, res) => {
  const { email, username, first_name, last_name, password } = req.body;

  if (!email || !username || !password) {
    return res.json({ success: false, msg: "Required fields missing" });
  }

  const sqlCheck = "SELECT id FROM users WHERE email = ? OR username = ? LIMIT 1";

  db.query(sqlCheck, [email, username], (err, rows) => {
    if (err) {
      console.error("CHECK ERROR 👉", err);
      return res.status(500).json({
        success: false,
        msg: err.sqlMessage || err.message
      });
    }

    // USER EXISTS
    if (rows.length > 0) {
      return res.json({
        success: false,
        msg: "User already exists. Please login."
      });
    }

    // INSERT NEW USER
    const sqlInsert = `
      INSERT INTO users (first_name, last_name, username, email, password)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sqlInsert,
      [first_name, last_name, username, email, password],
      (err2, result) => {
        if (err2) {
          console.error("INSERT ERROR 👉", err2);
          return res.status(500).json({
            success: false,
            msg: err2.sqlMessage || err2.message
          });
        }

        return res.json({
          success: true,
          msg: "Account created successfully!",
          type: "new_user",
          user: {
            id: result.insertId,
            email,
            first_name,
            last_name,
            username
          }
        });
      }
    );
  });
};