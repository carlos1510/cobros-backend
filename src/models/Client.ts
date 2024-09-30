
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Client extends Model {
  public id!: number;
  public numberDocument!: string;
  public fullName!: string;
  public address!: string;
  public reference!: string;
  public phone!: string;
  public state!: boolean;
  
  static associate(models: any) {
    // define association here
  }
}
Client.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  numberDocument: {
    type: DataTypes.STRING
  },
  fullName: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  reference: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'Client',
  tableName: 'clients',
});

export default Client;