import { DataTypes, Sequelize, Model } from 'sequelize'
import { Application } from '../../../declarations'
import { MatchUserInterface } from '@xrengine/common/src/dbmodels/MatchUser'

/**
 * This model contains connection of user to open match tickets and connection
 */
export default (app: Application) => {
  const sequelizeClient: Sequelize = app.get('sequelizeClient')
  const MatchUser = sequelizeClient.define<Model<MatchUserInterface>>(
    'match_user',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true
      },
      ticketId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: true
      },
      gamemode: {
        type: DataTypes.STRING,
        allowNull: true
      },
      connection: {
        type: DataTypes.STRING,
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

  ;(MatchUser as any).associate = (models: any): void => {
    ;(MatchUser as any).belongsTo(models.user, { as: 'user', required: true })
  }

  return MatchUser
}
