import * as pack from '../../package.json'
import { logger } from '../logger'


/**
 * Zbiór modułów i funkcji z namespaceu inject.
 * @module Index
 * @memberof popup
 * @see /src/typings/popup.d.ts
 */
const popup: popup.Index = {

  _v: pack.version,

  //
  // Tutaj wszystkie zaimportowanae moduły
  //

}


logger.debug.log('/src/popup/index.ts loaded!')


export default popup
