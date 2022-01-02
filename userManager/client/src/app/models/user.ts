enum Rights {
  User,
  Admin,
  SuperAdmin
}

export interface User {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  creationTime?: Date;
  rights?: Rights
}
