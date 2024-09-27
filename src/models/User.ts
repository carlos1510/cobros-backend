'use strict';
import { Model, DataTypes, Sequelize } from 'sequelize';
export default (sequelize: Sequelize) => {
  class User extends Model {
    public id!: number;
    public userName!: string;
    public numberDocument!: string;
    public fullName!: string;
    public phone!: string;
    public password!: string;
    public role!: string;
    public isActive!: boolean;
    public state!: boolean;


    static associate(models: any) {
      // define association here
    }
  }
  
  User.init({
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
      allowNull: false,
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

  return User;
};