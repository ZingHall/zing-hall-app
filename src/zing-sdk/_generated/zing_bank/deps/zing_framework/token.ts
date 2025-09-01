/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct } from '../../../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import * as object from '../sui/object.js';
import * as balance from '../sui/balance.js';
const $moduleName = 'zing_framework::token';
export const TokenCap = new MoveStruct({ name: `${$moduleName}::TokenCap`, fields: {
        id: object.UID,
        /**
         * we should prevent any case that TokenCap transferred to the address where is not
         * owner
         */
        owner: bcs.Address,
        /** The current circulating supply */
        supply: balance.Supply,
        /**
         * The total max supply allowed to exist at any time that was issued upon creation
         * of Asset T
         */
        supply_limit: bcs.u64()
    } });