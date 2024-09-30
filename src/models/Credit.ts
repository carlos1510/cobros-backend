
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Credit extends Model {
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

  static associate(models: any) {
    // define association here
  }
}
Credit.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
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
  tableName: 'credits',
});

export default Credit;