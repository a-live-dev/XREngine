import config from '../../appconfig'
import crypto from 'crypto'
import moment from 'moment'
import { Service, SequelizeServiceOptions } from 'feathers-sequelize'
import { Application } from '../../../declarations'
import { LoginTokenInterface } from '@xrengine/common/src/dbmodels/LoginToken'

export type LoginTokenDataType = LoginTokenInterface & { identityProviderId: string }
/**
 * A class for Login Token service
 *
 * @author Vyacheslav Solovjov
 */

export class LoginToken<T = LoginTokenDataType> extends Service<T> {
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
  async create(data: any): Promise<T> {
    const { identityProviderId } = data
    const token = crypto.randomBytes(config.authentication.bearerToken.numBytes).toString('hex')
    const tokenData: any = {
      identityProviderId: identityProviderId,
      token: token,
      expiresAt: moment().utc().add(2, 'days').toDate()
    }
    return (await super.create({ ...tokenData }, {})) as T
  }
}
