import { Service, SequelizeServiceOptions } from 'feathers-sequelize'
import { Application } from '../../../declarations'
import { Params, Paginated } from '@feathersjs/feathers'
import { extractLoggedInUserFromParams } from '../../user/auth-management/auth-management.utils'
import { Invite as InviteDataType } from '@xrengine/common/src/interfaces/Invite'

/**
 * A class for Invite service
 *
 * @author Vyacheslav Solovjov
 */
export class Invite<T = InviteDataType> extends Service<T> {
  app: Application
  docs: any

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options)
    this.app = app
  }

  /**
   * A method which get all invite
   *
   * @param params of query with type and userId
   * @returns invite data
   * @author Vyacheslav Solovjov
   */
  async find(params?: Params): Promise<T[] | Paginated<T>> {
    if (params && params.query) {
      const query = params.query
      if (params.query.type === 'received') {
        const identityProviders = await this.app.service('identity-provider').find({
          query: {
            userId: query.userId
          }
        })
        const identityProviderTokens = (identityProviders as any).data.map((provider) => provider.token)
        const result = await super.find({
          query: {
            $or: [
              { inviteeId: query.userId },
              {
                token: {
                  $in: identityProviderTokens
                }
              }
            ],
            $limit: query.$limit || 10,
            $skip: query.$skip || 0
          }
        })

        await Promise.all(
          (result as any).data.map(async (invite) => {
            if (invite.inviteType === 'group') {
              try {
                const group = await this.app.service('group').get(invite.targetObjectId)
                invite.groupName = group.name
              } catch (err) {
                invite.groupName = '<A deleted group>'
              }
            }
          })
        )

        return result
      } else if (query.type === 'sent') {
        const result = await super.find({
          query: {
            userId: query.userId,
            $limit: query.$limit || 10,
            $skip: query.$skip || 0
          }
        })

        await Promise.all(
          (result as any).data.map(async (invite) => {
            if (invite.inviteType === 'group') {
              try {
                const group = await this.app.service('group').get(invite.targetObjectId)
                invite.groupName = group.name
              } catch (err) {
                invite.groupName = '<A deleted group>'
              }
            }
          })
        )

        return result
      }
    }
    return super.find(params)
  }

  async remove(id: string, params?: Params): Promise<T> {
    const invite = await this.app.service('invite').get(id)
    if (invite.inviteType === 'friend' && invite.inviteeId != null && !params?.preventUserRelationshipRemoval) {
      const selfUser = extractLoggedInUserFromParams(params)
      const relatedUserId = invite.userId === selfUser.id ? invite.inviteeId : invite.userId
      await this.app.service('user-relationship').remove(relatedUserId, params)
    }
    return (await super.remove(id)) as T
  }
}
