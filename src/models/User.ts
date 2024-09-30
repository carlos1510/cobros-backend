
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class User extends Model {
  public id!: number;
    public userName!: string;
    public numberDocument!: string;
    public fullName!: string;
    public phone!: string;
    public password!: string;
    public role!: string;
    public isActive!: boolean;
    public state!: boolean;


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  numberDocument: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
});

export default User;