const Users = require('../model/Users');
const sharp = require('sharp');
const fsPromises = require('fs').promises;

//Show Index Route
const showIndex = (req, res) => {
  res.render('index');
};

//Show all users from DB
const showAllUsers = async (req, res) => {
  const usersArr = await Users.find({});
  res.json(usersArr);
};

//Add new User
const addNewUser = async (req, res) => {
  const image = await fsPromises.readFile(`tmp/${req.file.filename}`);
  
  try {
    await sharp(image)
          .resize(200, 200)
          .toFile(`photos/${req.file.filename}`);
  } catch(err) {
    console.log('Error', err);
  }

  const newUser = new Users(req.body);
  newUser.photoUrl = `${req.file.filename}`

    let tempId = '';
    newUser.save(function (err, data) {
    console.log('DB data >>>', data);
    if (err) {
      res.send(`Your data is incorrect`);
      console.log('ERROR>>>>', err);
    } else {
      tempId = data._id;
      res.json({ userID: tempId })
    }
  });
};

//Find User by ID and show json
const showUserById = async (req, res) => {
  const { id } = req.params;
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    res.json({
      message: 'missing id in DB'
    });
  } else {
    try {
      const user = await Users.findById(id);
      console.log('user>>>', user);
      if (!user) {
        res.json({
          message: "user not found"
        });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.json({
        message: `id ${err.value} not found`
      });
      console.log('ERROR>>>', err);
    }
  };
};


//Delete user by Id
const delUser = async (req, res) => {
  const { id } = req.params;
  Users.findByIdAndDelete(id, (err, data) => {
    if (err) {
      res.json({ message: 'error!'});
      console.log('ERR>>>, err');
    } else {
      console.log('id>>>>', id);
    }
  });

  res.send({deletedId: id})
  
};

//Update user by Id

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, surname, email } = req.body;

  const image = await fsPromises.readFile(`tmp/${req.file.filename}`, () => {});

  try {
    await sharp(image)
          .resize(200, 200)
          .toFile(`photos/${req.file.filename}`);
  } catch(err) {
    console.log('Error', err);
  }

  photoUrl = `${req.file.filename}`;

  let tempId = '';
  console.log('UserID>>>>', id);

  Users.findByIdAndUpdate(id, { name: `${name}`, surname: `${surname}`, email: `${email}`, photoUrl: `${photoUrl}` }, (err, data) => {
    if (err) {
      res.json({ message: 'error!'});
      console.log('ERR>>>, err');
    } else {
      console.log('id>>>>', id);
      tempId = data._id;
      res.send({updatedId: tempId})
      }
  });
};



module.exports = {
  showIndex,
  showAllUsers,
  addNewUser,
  showUserById,
  delUser,
  updateUser,
};
