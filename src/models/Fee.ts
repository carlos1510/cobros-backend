'use strict';
import { Model, DataTypes, Sequelize } from 'sequelize';
export default (sequelize: Sequelize) => {
  class Fee extends Model {
    public id!: number;
    public payDate!: Date;
    public amount!: number;
    public remainingAmount!: number;
    public creditId!: number;
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
  Fee.init({
    payDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    remainingAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    creditId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Credits',
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
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }, {
    sequelize,
    modelName: 'Fee',
  });
  return Fee;
};