import { Service, SequelizeServiceOptions } from 'feathers-sequelize'
import { Application } from '../../../declarations'
import { LocationAdmin as LocationAdminInterface } from '@xrengine/common/src/interfaces/LocationAdmin'

export type LocationAdminDataType = LocationAdminInterface
/**
 * A class for Location Admin service
 *
 * @author Vyacheslav Solovjov
 */
export class LocationAdmin<T = LocationAdminDataType> extends Service<T> {
  public docs: any

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options)
  }
}
