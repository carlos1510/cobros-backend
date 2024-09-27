'use strict';
import { Model, DataTypes, Sequelize } from 'sequelize';
export default (sequelize: Sequelize) => {
  class Credit extends Model {
    public id!: number;
    public creditDate!: Date;
    public amount!: number;
    public endDate!: Date;
    public interestAmount!: number;
    public totalAmount!: number;
    public serviceId!: number;
    public clientId!: number;
    public userId!: number;
    public state!: number;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  Credit.init({
    creditDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    interestAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Services',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Credit',
  });
  return Credit;
};