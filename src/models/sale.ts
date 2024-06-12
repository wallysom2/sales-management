import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user';

class Sale extends Model {
  public id!: number;
  public customerName!: string;
  public product!: string;
  public amount!: number;
  public saleDate!: Date;
  public userId!: number;
}

Sale.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  saleDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Sale'
});

Sale.belongsTo(User, { foreignKey: 'userId' });

export default Sale;
