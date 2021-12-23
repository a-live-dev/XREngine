// Initializes the `wallet-token` service on path `/wallet-token`
import { Application } from '../../../declarations'
import { WalletToken } from './wallet-token.class'
import createModel from './wallet-token.model'
import hooks from './wallet-token.hooks'
import loginTokenDocs from './wallet-token.docs'

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'wallet-token': WalletToken
  }
}

export default (app: Application) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  /**
   * Initialize our service with any options it requires and docs
   *
   * @author Vyacheslav Solovjov
   */
  const event = new WalletToken(options, app)
  event.docs = loginTokenDocs
  app.use('wallet-token', event)

  /**
   * Get our initialized service so that we can register hooks
   *
   * @author Vyacheslav Solovjov
   */
  const service = app.service('wallet-token')

  service.hooks(hooks)
}
