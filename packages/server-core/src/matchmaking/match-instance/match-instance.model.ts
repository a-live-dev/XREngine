import { DataTypes, Sequelize, Model } from 'sequelize'
import { Application } from '../../../declarations'
import { MatchInstanceInterface } from '@xrengine/common/src/dbmodels/MatchInstance'
/**
 * This model contains matchmaking match
 */
export default (app: Application) => {
  const sequelizeClient: Sequelize = app.get('sequelizeClient')
  const MatchInstance = sequelizeClient.define<Model<MatchInstanceInterface>>(
    'match_instance',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true
      },
      connection: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      gamemode: {
        type: DataTypes.STRING,
        allowNull: true
      },
      gameserver: {
        type: DataTypes.UUID,
        allowNull: true
      }
    },
    {
      hooks: {
        beforeCount(options: any): void {
          options.raw = true
        }
      }
    }
  )

  // ;(MatchInstance as any).associate = (models: any): void => {
  //   ;(MatchInstance as any).belongsTo(models.user, { as: 'user', allowNull: false })
  // }

  return MatchInstance
}
