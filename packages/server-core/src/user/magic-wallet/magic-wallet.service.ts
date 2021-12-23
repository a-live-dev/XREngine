import { Application } from '../../../declarations'
import { MagicWallet } from './magic-wallet.class'
import magicLinkDocs from './magic-wallet.docs'
import hooks from './magic-wallet.hooks'

declare module '../../../declarations' {
  interface ServiceTypes {
    'magic-wallet': MagicWallet
  }
}

export default (app: Application): void => {
  const options = {
    paginate: app.get('paginate'),
    multi: true
  }

  /**
   * Initialize our service with any options it requires and docs
   *
   * @author Vyacheslav Solovjov
   */
  const event = new MagicWallet(options, app)
  event.docs = magicLinkDocs
  app.use('magic-wallet', event)

  /**
   * Get our initialized service so that we can register hooks
   *
   * @author Vyacheslav Solovjov
   */
  const service = app.service('magic-wallet')

  service.hooks(hooks)
}
