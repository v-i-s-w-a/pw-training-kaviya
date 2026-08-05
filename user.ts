export class User {
  username: string;
  password: string;

  // constructor runs when we create a new User
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  // instance method - uses this user's data
  loginInfo(): string {
    return `Username: ${this.username}, Password: ${this.password}`;
  }

  // static factory method - another way to create a User
  static create(username: string, password: string): User {
    return new User(username, password);
  }
}
