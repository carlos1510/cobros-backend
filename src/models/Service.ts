'use strict';
import { Model, DataTypes, Sequelize } from 'sequelize';
export default (sequelize: Sequelize) => {
  class Service extends Model {
    public id!: number;
    public serviceName!: string;
    public period!: string;
    public porcentage!: number;
    public numberPeriod!: number;
    public companyId!: number;
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
  Service.init({
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    period: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    porcentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    numberPeriod: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Companies',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};