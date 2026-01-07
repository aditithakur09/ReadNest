const db = require("../config/db");

// ================= ADD BOOK =================
exports.addBook = (req, res) => {
  const {
    user_id,
    title,
    author,
    category,
    condition_level,
    original_price
  } = req.body;

  const sql = `
    INSERT INTO books_for_sell
    (user_id, title, author, category, condition_level, original_price, status)
    VALUES (?, ?, ?, ?, ?, ?, 'submitted')
  `;

  db.query(
    sql,
    [user_id, title, author, category, condition_level, original_price],
    (err, result) => {
      if (err) {
        console.error("ADD BOOK ERROR:", err);
        return res.status(500).json({ msg: "Error adding book" });
      }

      res.json({
        msg: "Book submitted",
        book_id: result.insertId
      });
    }
  );
};

// ================= UPLOAD IMAGE =================
exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No image uploaded" });
  }

  const { book_id } = req.body;
  const imagePath = req.file.path;

  const sql = `
    INSERT INTO book_images (book_id, image_path)
    VALUES (?, ?)
  `;

  db.query(sql, [book_id, imagePath], (err) => {
    if (err) {
      console.error("IMAGE SAVE ERROR:", err);
      return res.status(500).json({ msg: "Error saving image" });
    }

    res.json({ msg: "Image uploaded" });
  });
};

// ================= ADMIN APPROVE =================
exports.adminApprove = (req, res) => {
  const {
    book_id,
    offered_price,
    buyer_name,
    buyer_mobile,
    buyer_address,
    admin_id
  } = req.body;

  if (!book_id || !offered_price)
    return res.status(400).json({ msg: "book_id & offered_price required" });

  const sql = `
    UPDATE books_for_sell
    SET status='approved',
        offered_price=?,
        buyer_name=?, buyer_mobile=?, buyer_address=?,
        admin_id=?, rejection_reason=NULL
    WHERE id=?
  `;

  db.query(
    sql,
    [
      offered_price,
      buyer_name || null,
      buyer_mobile || null,
      buyer_address || null,
      admin_id || null,
      book_id
    ],
    (err) => {
      if (err) return res.status(500).json({ msg: "Error approving" });
      res.json({ msg: "Approved successfully" });
    }
  );
};

// ================= ADMIN REJECT =================
exports.adminReject = (req, res) => {
  const { book_id, rejection_reason, admin_id } = req.body;

  if (!book_id)
    return res.status(400).json({ msg: "book_id required" });

  const sql = `
    UPDATE books_for_sell
    SET status='rejected',
        rejection_reason=?, admin_id=?
    WHERE id=?
  `;

  db.query(
    sql,
    [rejection_reason || null, admin_id || null, book_id],
    (err) => {
      if (err) return res.status(500).json({ msg: "Error rejecting" });
      res.json({ msg: "Rejected successfully" });
    }
  );
};

// ================= USER BOOKS =================
exports.getBooksByUser = (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT b.*,
    (SELECT image_path FROM book_images WHERE book_id=b.id LIMIT 1) AS image
    FROM books_for_sell b
    WHERE b.user_id=?
    ORDER BY b.created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ msg: "Error fetching books" });
    res.json(results);
  });
};