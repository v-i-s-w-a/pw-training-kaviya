import { User } from "./user";

// create user with constructor
const user1 = new User("kaviya123", "pass123");
console.log(user1.loginInfo());

// create user with static factory method
const user2 = User.create("kaviya_admin", "admin123");
console.log(user2.loginInfo());
