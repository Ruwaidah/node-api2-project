const express = require("express");

const router = express.Router();

router.use(express.json());
const db = require("../data/db");

// Get All Posts
router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// Get Post
router.get("/:id", (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post.length > 0) res.status(200).json(post);
      else
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

// GET request to /api/posts/:id/comments

router.get("/:id/comments", (req, res) => {
  db.findCommentById(req.params.id)
    .then(commit => {
      if (commit.length > 0) res.status(200).json(commit);
      else
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

// POST request to /api/posts
router.post("/", (req, res) => {
  if (req.body.title && req.body.contents) {
    db.insert(req.body)
      .then(posts => res.status(201).json(req.body))
      .catch(error =>
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        })
      );
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

//  POST request to /posts/:id/comments
router.post("/:id/comments", (req, res) => {
  db.findById(req.params.id)
    .then(posts => {
      if (posts.length > 0) {
        if (req.body.text) {
          db.insertComment(req.body)
            .then(comment => res.status(201).json(comment))
            .catch(error =>
              res.status(500).json({
                error:
                  "There was an error while saving the comment to the data base"
              })
            );
        } else
          res
            .status(400)
            .json({ errorMessage: "Please provide text for the comment." });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error =>
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      })
    );
  db.insertComment();
});

//  DELETE request to /api/posts/:id

router.delete("/:id", (req, res) => {
  db.findById(req.params.id)
    .then(posts => {
      if (posts.length > 0) {
        db.remove(req.params.id)
          .then(remove => res.status(200).json({ message: "posts removed " }))
          .catch(error => {
            res.status(500).json({
              error:
                "There was an error while saving the comment to the database"
            });
          });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the comment to the data base"
      });
    });
});

// PUT request to /api/posts/:id
router.put("/:id", (req, res) => {
  db.findById(req.params.id)
    .then(posts => {
      if (posts.length > 0) {
        if (req.body.title && req.body.contents) {
          db.update(req.params.id, req.body)
            .then(added => res.status(200).json(req.body))
            .catch(error => {
              res
                .status(500)
                .json({
                  error:
                    "There was an error while saving the comment to the data base"
                });
            });
        } else {
          res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
          });
        }
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the comment to the data base"
      });
    });
});

module.exports = router;
