const express = require('express');
const User = require('./users-model');
const Post = require('../posts/posts-model');

const {
  validateUserId,
  validateUser,
  validatePost
} = require('../middleware/middleware')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then(users => {
      res.status(200).json(users)
    }).catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});


router.post('/', validateUser, (req, res, next) => {
  User.insert({ name: req.name })
    .then(newUser => {
      res.status(201).json(newUser);
    }).catch(next)
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid

});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, req.body)
    .then(newUser => {
      res.status(201).json(newUser);
    }).catch(next)
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    await User.remove(req.params.id)
    res.json(req.user);
  } catch (err) {
    next(err)
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
    const result = await User.getUserPosts(req.params.id);
    res.json(result)
  } catch (err) {
    next(err)
  }
  console.log(req.user);

});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const result = await Post.insert({
      user_id: req.params.id,
      text: req.text
    })
    res.status(201).json(result)
  } catch (err) {
    next(err);
  }

});


// do not forget to export the router
module.exports = router;
