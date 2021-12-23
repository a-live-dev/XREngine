/**
 * An object for swagger documentation configiration
 *
 * @author Kevin KIMENYI
 */
export default {
  definitions: {
    'magic-wallet': {
      type: 'object',
      properties: {}
    },
    'magic-wallet_list': {
      type: 'array',
      items: { $ref: '#/definitions/magic-wallet' }
    }
  }
}
