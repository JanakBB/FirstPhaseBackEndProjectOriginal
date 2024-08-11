import bcrypt from "bcryptjs";

const users = [
  {
    name: "Janak Bahadur Bohara",
    email: "janakcustomx@gmail.com",
    password: bcrypt.hashSync("password", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("password1", 10),
  },
  {
    name: "Jahn Doe",
    email: "Jahn@example.com",
    password: bcrypt.hashSync("password2", 10),
  },
];

export default users;
