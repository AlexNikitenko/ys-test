const express = require('express');
const router = express.Router();
const multer = require('multer');
const validator = require('./validator/index').validation;
const controllers = require('../controllers');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.name.toLowerCase()}-${req.body.surname.toLowerCase()}.${file.originalname.split('.').pop()}`)
  }
})

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb("Error: Only images are allowed to upload", false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: multerFilter
});


//***ROUTES***

router.get('/', controllers.showIndex);

router.get('/users', controllers.showAllUsers);

router.get('/user/:id', controllers.showUserById);

router.post('/addUser', upload.single('photo'), validator('register'), controllers.addNewUser);

router.put('/user/:id', upload.single('photo'), validator('register'), controllers.updateUser);

router.delete('/user/:id', upload.none(), controllers.delUser);

module.exports = router;
