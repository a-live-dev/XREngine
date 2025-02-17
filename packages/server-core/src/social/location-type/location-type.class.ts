import { Service, SequelizeServiceOptions } from 'feathers-sequelize'
import { Application } from '../../../declarations'
import { LocationType as LocationTypeInterface } from '@xrengine/common/src/interfaces/LocationType'

export type LocationTypeDataType = LocationTypeInterface

/**
 * A class for Location Type  service
 *
 * @author Vyacheslav Solovjov
 */
export class LocationType<T = LocationTypeDataType> extends Service<T> {
  public docs: any
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options)
  }
}
