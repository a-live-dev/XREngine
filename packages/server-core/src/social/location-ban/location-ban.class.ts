import { Service, SequelizeServiceOptions } from 'feathers-sequelize'
import { Application } from '../../../declarations'
import { LocationBan as LocationBanInterface } from '@xrengine/common/src/interfaces/LocationBan'

export type LocationBanDataType = LocationBanInterface

/**
 * A class for Location Ban service
 *
 * @author Vyacheslav Solovjov
 */
export class LocationBan<T = LocationBanDataType> extends Service<T> {
  public docs: any
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options)
  }
}
