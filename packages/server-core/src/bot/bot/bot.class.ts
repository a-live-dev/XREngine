import { Service, SequelizeServiceOptions } from 'feathers-sequelize'
import { Application } from '../../../declarations'
import { Params, Paginated } from '@feathersjs/feathers'
import { AdminBot } from '@xrengine/common/src/interfaces/AdminBot'

export type AdminBotDataType = AdminBot

export class Bot<T = AdminBotDataType> extends Service<T> {
  app: Application
  docs: any

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options)
    this.app = app
  }

  async find(params: Params): Promise<T[] | Paginated<T>> {
    const bots = await (this.app.service('bot') as any).Model.findAll({
      include: [
        {
          model: (this.app.service('bot-command') as any).Model
        },
        {
          model: (this.app.service('location') as any).Model
        },
        {
          model: (this.app.service('instance') as any).Model
        }
      ]
    })
    return { data: bots } as Paginated<T>
  }

  async create(data): Promise<T> {
    data.instanceId = data.instanceId ? data.instanceId : null
    return (await super.create(data)) as T
  }
}
