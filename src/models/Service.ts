
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Service extends Model {
  public id!: number;
  public serviceName!: string;
  public period!: string;
  public porcentage!: number;
  public numberPeriod!: number;
  public companyId!: number;
  public state!: boolean;
  
  static associate(models: any) {
    // define association here
  }
}
Service.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
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
  tableName:'services',
});

export default Service;