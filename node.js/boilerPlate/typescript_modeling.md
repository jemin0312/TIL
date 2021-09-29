### config.ts
```typescript
import * as dotenv from 'dotenv'
dotenv.config()


type Config = {
  username: string,
  password: string,
  database: string,
  host: string,
  [key: string]: string
}

interface IConfigGroup {
  development: Config;
  test: Config;
  production: Config;
}

const config: IConfigGroup = {
  "development": {
    "username": "root",
    "password": process.env.DB_PASSWORD!,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.DB_PASSWORD!,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.DB_PASSWORD!,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}



export default config
```

### sequelize.ts
```typescript
import {Sequelize} from 'sequelize'

import config from '../config/config';

const env = process.env.NODE_ENV as ('production' | 'test' | 'development') || 'development'
const {database, username, password} = config[env];
const sequelize = new Sequelize(database, username, password, config[env] )

export {sequelize}
export default sequelize;
```

### index.ts
```typescript
import User from './user';
import {associate as associateUser} from './user'

export * from './sequelize'

const db = {
  User,
}

export type dbType = typeof db;

associateUser(db);
```

### user.js
```typescript
import { DataTypes, Model } from "sequelize";
import { dbType } from ".";
import {sequelize} from './sequelize'

class User extends Model {
  public readonly id!: number;
  public nickname!: string;
  public userId!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

User.init({
  nickname : {
    type : DataTypes.STRING(20)
  },
  userId: {
    type : DataTypes.STRING(20),
    allowNull : false,
    unique : true
  },
  password : {
    type : DataTypes.STRING(100),
    allowNull : false
  }
},{
  sequelize,
  modelName : 'User',
  tableName : 'users',
  charset : 'utf8',
  collate : 'utf8_general_ci'
})

export const associate = (db: dbType) => {

}

export default User;
```
