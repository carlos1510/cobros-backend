
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Company extends Model {
  public id!: number;
  public companyName!: string;
  public numberDocument!: string;
  public address!: string;
  public phone!: string;
  public userId!: number;
  public state!: boolean;

  
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
  tableName: 'companies',
});

export default Company;