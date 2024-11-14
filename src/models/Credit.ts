
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Client from './Client';
import Service from './Service';

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
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
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

// Aquí definimos la relación entre Credit y Client
Credit.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
//Client.hasMany(Credit, { foreignKey: 'clientId' });*/

Credit.belongsTo(Service, { as: 'service', foreignKey: 'serviceId' });

export default Credit;