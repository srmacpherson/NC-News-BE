const db = require("../db/connection.js");

function isValidColumn(columnName) {
    const validArticleColumns = ["created_at", "votes", "comment_count", "author", "title", "article_id", "topic",
     ]
  
    if (!validArticleColumns.includes(columnName)) {
      const err = new Error("Invalid input");
      err.status = 400;
      throw err;
    } else {
        return true;
    }
}

module.exports = { isValidColumn };
