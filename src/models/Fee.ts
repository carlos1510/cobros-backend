import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Credit from './Credit';

export class Fee extends Model {
  public id!: number;
  public payDate!: Date;
  public amount!: number;
  public remainingAmount!: number;
  public creditId!: number;
  public userId!: number;
  public state!: boolean;

  static associate(models: any) {
    // define association here
  }
}
Fee.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  payDate: {
    type: DataTypes.DATEONLY,
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
  tableName: 'fees',
});

Fee.belongsTo(Credit, { as: 'credit', foreignKey: 'creditId' });

export default Fee;
