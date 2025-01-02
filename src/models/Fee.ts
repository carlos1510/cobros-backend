import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Credit from './Credit';
import User from './User';

export class Fee extends Model {
  public id!: number;
  public payDate!: Date;
  public amount!: number;
  public remainingAmount!: number;
  public creditId!: number;
  public userId!: number;
  public state!: boolean;

  static associate(models: any) {
    // Define asociaciones aquí si es necesario
    Fee.belongsTo(models.Credit, { as: 'credit', foreignKey: 'creditId' });
    Fee.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  }
}

// Inicialización del modelo
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
      model: Credit, // Usa directamente el modelo importado
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Usa directamente el modelo importado
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  sequelize,
  modelName: 'Fee',
  tableName: 'fees',
  timestamps: true, // Asegura que `createdAt` y `updatedAt` estén habilitados
});

// Asociaciones
Fee.belongsTo(Credit, { as: 'credit', foreignKey: 'creditId' });
Fee.belongsTo(User, { as: 'user', foreignKey: 'userId' });

export default Fee;
