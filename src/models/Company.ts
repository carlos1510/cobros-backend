'use strict';
import { Model, DataTypes, Sequelize } from 'sequelize';
export default (sequelize: Sequelize) => {
  class Company extends Model {
    public id!: number;
    public companyName!: string;
    public numberDocument!: string;
    public address!: string;
    public phone!: string;
    public userId!: number;
    public state!: boolean;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  Company.init({
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    numberDocument: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};