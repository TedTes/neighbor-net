import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/database";

interface TokenAttributes {
  id: number;
  userId: number;
  refreshToken: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TokenCreationAttributes extends Optional<TokenAttributes, "id"> {}

class Token
  extends Model<TokenAttributes, TokenCreationAttributes>
  implements TokenAttributes
{
  public id!: number;
  public userId!: number;
  public accessToken!: string;
  public refreshToken!: string;
  public expiresAt!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Token",
    tableName: "tokens",
  }
);

export { Token };
