import config from '../../appconfig'
import crypto from 'crypto'
import moment from 'moment'
import { Service, SequelizeServiceOptions } from 'feathers-sequelize'
import { Application } from '../../../declarations'

/**
 * A class for Login Token service
 *
 * @author Vyacheslav Solovjov
 */
export class WalletToken extends Service {
  app: Application
  docs: any
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options)
    this.app = app
  }

  /**
   * A function which is used to create login token
   *
   * @param data with identityProviderId in it
   * @returns {@Object} contains token
   * @author Vyacheslav Solovjov
   */
  async create(data: any): Promise<any> {
    try {
      const result = await (this.app.service('login-token') as any).Model.findOne({
        where: {
          token: data.token
        }
      })
      if (result == null) {
        console.log('Invalid wallet token')
        return {
          error: 'invalid wallet token'
        }
      }
      if (moment().utc().toDate() > result.expiresAt) {
        console.log('Wallet Token has expired')
        return { error: 'Wallet link has expired' }
      }
      const identityProvider = await this.app.service('identity-provider').get(result.identityProviderId)
      let sign
      const token = await (this.app.service('authentication') as any).createAccessToken(
        {},
        { subject: identityProvider.id.toString() }
      )
      return {
        token: token
      }
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}
