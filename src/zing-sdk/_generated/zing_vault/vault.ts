/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import * as object from './deps/sui/object.js';
import * as balance from './deps/sui/balance.js';
import * as vec_map from './deps/sui/vec_map.js';
import * as time_locked_balance from './time_locked_balance.js';
import * as coin from './deps/sui/coin.js';
const $moduleName = '@local-pkg/zing_vault::vault';
export const DepositEvent = new MoveStruct({ name: `${$moduleName}::DepositEvent`, fields: {
        amount: bcs.u64(),
        lp_minted: bcs.u64()
    } });
export const WithdrawEvent = new MoveStruct({ name: `${$moduleName}::WithdrawEvent`, fields: {
        amount: bcs.u64(),
        lp_burned: bcs.u64()
    } });
export const StrategyProfitEvent = new MoveStruct({ name: `${$moduleName}::StrategyProfitEvent`, fields: {
        strategy_id: bcs.Address,
        profit: bcs.u64(),
        fee_amt_yt: bcs.u64()
    } });
export const StrategyLossEvent = new MoveStruct({ name: `${$moduleName}::StrategyLossEvent`, fields: {
        strategy_id: bcs.Address,
        to_withdraw: bcs.u64(),
        withdrawn: bcs.u64()
    } });
export const VaultAccess = new MoveStruct({ name: `${$moduleName}::VaultAccess`, fields: {
        id: object.UID
    } });
export const StrategyRemovalTicket = new MoveStruct({ name: `${$moduleName}::StrategyRemovalTicket`, fields: {
        access: VaultAccess,
        returned_balance: balance.Balance
    } });
export const StrategyWithdrawInfo = new MoveStruct({ name: `${$moduleName}::StrategyWithdrawInfo`, fields: {
        to_withdraw: bcs.u64(),
        withdrawn_balance: balance.Balance,
        has_withdrawn: bcs.bool()
    } });
export const WithdrawTicket = new MoveStruct({ name: `${$moduleName}::WithdrawTicket`, fields: {
        to_withdraw_from_free_balance: bcs.u64(),
        strategy_infos: vec_map.VecMap(bcs.Address, StrategyWithdrawInfo),
        lp_to_burn: balance.Balance
    } });
export const RebalanceInfo = new MoveStruct({ name: `${$moduleName}::RebalanceInfo`, fields: {
        /**
           * The target amount the strategy should repay. The strategy shouldn't repay more
           * than this amount.
           */
        to_repay: bcs.u64(),
        /**
         * The target amount the strategy should borrow. There's no guarantee though that
         * this amount is available in vault's free balance. The strategy shouldn't borrow
         * more than this amount.
         */
        can_borrow: bcs.u64()
    } });
export const RebalanceAmounts = new MoveStruct({ name: `${$moduleName}::RebalanceAmounts`, fields: {
        inner: vec_map.VecMap(bcs.Address, RebalanceInfo)
    } });
export const StrategyState = new MoveStruct({ name: `${$moduleName}::StrategyState`, fields: {
        borrowed: bcs.u64(),
        target_alloc_weight_bps: bcs.u64(),
        max_borrow: bcs.option(bcs.u64())
    } });
export const Vault = new MoveStruct({ name: `${$moduleName}::Vault`, fields: {
        id: object.UID,
        /** balance that's not allocated to any strategy */
        free_balance: balance.Balance,
        /** slowly distribute profits over time to avoid sandwich attacks on rebalance */
        time_locked_profit: time_locked_balance.TimeLockedBalance,
        /** treasury of the vault's yield-bearing token */
        lp_treasury: coin.TreasuryCap,
        /** strategies */
        strategies: vec_map.VecMap(bcs.Address, StrategyState),
        /** performance fee balance */
        performance_fee_balance: balance.Balance,
        /** priority order for withdrawing from strategies */
        strategy_withdraw_priority_order: bcs.vector(bcs.Address),
        /** only one withdraw ticket can be active at a time */
        withdraw_ticket_issued: bcs.bool(),
        /** deposits are disabled above this threshold */
        tvl_cap: bcs.option(bcs.u64()),
        /** duration of profit unlock in seconds */
        profit_unlock_duration_sec: bcs.u64(),
        /** performance fee in basis points (taken from all profits) */
        performance_fee_bps: bcs.u64(),
        version: bcs.u64()
    } });
export interface VaultAccessIdArguments {
    access: RawTransactionArgument<string>;
}
export interface VaultAccessIdOptions {
    package?: string;
    arguments: VaultAccessIdArguments | [
        access: RawTransactionArgument<string>
    ];
}
export function vaultAccessId(options: VaultAccessIdOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::VaultAccess`
    ] satisfies string[];
    const parameterNames = ["access"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'vault_access_id',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface NewStrategyRemovalTicketArguments {
    access: RawTransactionArgument<string>;
    returnedBalance: RawTransactionArgument<string>;
}
export interface NewStrategyRemovalTicketOptions {
    package?: string;
    arguments: NewStrategyRemovalTicketArguments | [
        access: RawTransactionArgument<string>,
        returnedBalance: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function newStrategyRemovalTicket(options: NewStrategyRemovalTicketOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::VaultAccess`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["access", "returnedBalance"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'new_strategy_removal_ticket',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface WithdrawTicketToWithdrawArguments {
    ticket: RawTransactionArgument<string>;
    access: RawTransactionArgument<string>;
}
export interface WithdrawTicketToWithdrawOptions {
    package?: string;
    arguments: WithdrawTicketToWithdrawArguments | [
        ticket: RawTransactionArgument<string>,
        access: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function withdrawTicketToWithdraw(options: WithdrawTicketToWithdrawOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::WithdrawTicket<${options.typeArguments[0]}, ${options.typeArguments[1]}>`,
        `${packageAddress}::vault::VaultAccess`
    ] satisfies string[];
    const parameterNames = ["ticket", "access"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'withdraw_ticket_to_withdraw',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface RebalanceAmountsGetArguments {
    amounts: RawTransactionArgument<string>;
    access: RawTransactionArgument<string>;
}
export interface RebalanceAmountsGetOptions {
    package?: string;
    arguments: RebalanceAmountsGetArguments | [
        amounts: RawTransactionArgument<string>,
        access: RawTransactionArgument<string>
    ];
}
export function rebalanceAmountsGet(options: RebalanceAmountsGetOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::RebalanceAmounts`,
        `${packageAddress}::vault::VaultAccess`
    ] satisfies string[];
    const parameterNames = ["amounts", "access"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'rebalance_amounts_get',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface NewArguments {
    Cap: RawTransactionArgument<string>;
    lpTreasury: RawTransactionArgument<string>;
}
export interface NewOptions {
    package?: string;
    arguments: NewArguments | [
        Cap: RawTransactionArgument<string>,
        lpTreasury: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function _new(options: NewOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::token::PlatformCap`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::coin::TreasuryCap<${options.typeArguments[1]}>`
    ] satisfies string[];
    const parameterNames = ["Cap", "lpTreasury"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'new',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface FreeBalanceArguments {
    vault: RawTransactionArgument<string>;
}
export interface FreeBalanceOptions {
    package?: string;
    arguments: FreeBalanceArguments | [
        vault: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function freeBalance(options: FreeBalanceOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[1]}>`
    ] satisfies string[];
    const parameterNames = ["vault"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'free_balance',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface TvlCapArguments {
    vault: RawTransactionArgument<string>;
}
export interface TvlCapOptions {
    package?: string;
    arguments: TvlCapArguments | [
        vault: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function tvlCap(options: TvlCapOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[1]}>`
    ] satisfies string[];
    const parameterNames = ["vault"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'tvl_cap',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface TotalAvailableBalanceArguments {
    vault: RawTransactionArgument<string>;
}
export interface TotalAvailableBalanceOptions {
    package?: string;
    arguments: TotalAvailableBalanceArguments | [
        vault: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function totalAvailableBalance(options: TotalAvailableBalanceOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[1]}>`,
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["vault", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'total_available_balance',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface TotalYtSupplyArguments {
    vault: RawTransactionArgument<string>;
}
export interface TotalYtSupplyOptions {
    package?: string;
    arguments: TotalYtSupplyArguments | [
        vault: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function totalYtSupply(options: TotalYtSupplyOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[1]}>`
    ] satisfies string[];
    const parameterNames = ["vault"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'total_yt_supply',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface WithdrawPerformanceFeeArguments {
    Cap: RawTransactionArgument<string>;
    vault: RawTransactionArgument<string>;
    amount: RawTransactionArgument<number | bigint>;
}
export interface WithdrawPerformanceFeeOptions {
    package?: string;
    arguments: WithdrawPerformanceFeeArguments | [
        Cap: RawTransactionArgument<string>,
        vault: RawTransactionArgument<string>,
        amount: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function withdrawPerformanceFee(options: WithdrawPerformanceFeeOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::token::PlatformCap`,
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[1]}>`,
        'u64'
    ] satisfies string[];
    const parameterNames = ["Cap", "vault", "amount"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'withdraw_performance_fee',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface AddStrategyArguments {
    Cap: RawTransactionArgument<string>;
    vault: RawTransactionArgument<string>;
}
export interface AddStrategyOptions {
    package?: string;
    arguments: AddStrategyArguments | [
        Cap: RawTransactionArgument<string>,
        vault: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function addStrategy(options: AddStrategyOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::token::PlatformCap`,
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[1]}>`
    ] satisfies string[];
    const parameterNames = ["Cap", "vault"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'add_strategy',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface RemoveStrategyArguments {
    cap: RawTransactionArgument<string>;
    vault: RawTransactionArgument<string>;
    ticket: RawTransactionArgument<string>;
    idsForWeights: RawTransactionArgument<string[]>;
    weightsBps: RawTransactionArgument<number | bigint[]>;
}
export interface RemoveStrategyOptions {
    package?: string;
    arguments: RemoveStrategyArguments | [
        cap: RawTransactionArgument<string>,
        vault: RawTransactionArgument<string>,
        ticket: RawTransactionArgument<string>,
        idsForWeights: RawTransactionArgument<string[]>,
        weightsBps: RawTransactionArgument<number | bigint[]>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function removeStrategy(options: RemoveStrategyOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::token::PlatformCap`,
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[1]}>`,
        `${packageAddress}::vault::StrategyRemovalTicket<${options.typeArguments[0]}, ${options.typeArguments[1]}>`,
        'vector<0x0000000000000000000000000000000000000000000000000000000000000002::object::ID>',
        'vector<u64>',
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["cap", "vault", "ticket", "idsForWeights", "weightsBps", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'remove_strategy',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface WithdrawalsDisabledArguments {
    vault: RawTransactionArgument<string>;
}
export interface WithdrawalsDisabledOptions {
    package?: string;
    arguments: WithdrawalsDisabledArguments | [
        vault: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function withdrawalsDisabled(options: WithdrawalsDisabledOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[1]}>`
    ] satisfies string[];
    const parameterNames = ["vault"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'withdrawals_disabled',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface DepositArguments {
    vault: RawTransactionArgument<string>;
    balance: RawTransactionArgument<string>;
}
export interface DepositOptions {
    package?: string;
    arguments: DepositArguments | [
        vault: RawTransactionArgument<string>,
        balance: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function deposit(options: DepositOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[1]}>`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`,
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["vault", "balance", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'deposit',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface WithdrawArguments {
    vault: RawTransactionArgument<string>;
    balance: RawTransactionArgument<string>;
}
export interface WithdrawOptions {
    package?: string;
    arguments: WithdrawArguments | [
        vault: RawTransactionArgument<string>,
        balance: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function withdraw(options: WithdrawOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[1]}>`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[1]}>`,
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["vault", "balance", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'withdraw',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface RedeemWithdrawTicketArguments {
    vault: RawTransactionArgument<string>;
    ticket: RawTransactionArgument<string>;
}
export interface RedeemWithdrawTicketOptions {
    package?: string;
    arguments: RedeemWithdrawTicketArguments | [
        vault: RawTransactionArgument<string>,
        ticket: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function redeemWithdrawTicket(options: RedeemWithdrawTicketOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[1]}>`,
        `${packageAddress}::vault::WithdrawTicket<${options.typeArguments[0]}, ${options.typeArguments[1]}>`
    ] satisfies string[];
    const parameterNames = ["vault", "ticket"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'redeem_withdraw_ticket',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface WithdrawTAmtArguments {
    vault: RawTransactionArgument<string>;
    tAmt: RawTransactionArgument<number | bigint>;
    balance: RawTransactionArgument<string>;
}
export interface WithdrawTAmtOptions {
    package?: string;
    arguments: WithdrawTAmtArguments | [
        vault: RawTransactionArgument<string>,
        tAmt: RawTransactionArgument<number | bigint>,
        balance: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function withdrawTAmt(options: WithdrawTAmtOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[1]}>`,
        'u64',
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[1]}>`,
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["vault", "tAmt", "balance", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'withdraw_t_amt',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface ToUnderlyingAmountArguments {
    vault: RawTransactionArgument<string>;
    tAmount: RawTransactionArgument<number | bigint>;
}
export interface ToUnderlyingAmountOptions {
    package?: string;
    arguments: ToUnderlyingAmountArguments | [
        vault: RawTransactionArgument<string>,
        tAmount: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function toUnderlyingAmount(options: ToUnderlyingAmountOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[1]}>`,
        'u64',
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["vault", "tAmount", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'to_underlying_amount',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface FromUnderlyingAmountArguments {
    vault: RawTransactionArgument<string>;
    ytAmount: RawTransactionArgument<number | bigint>;
}
export interface FromUnderlyingAmountOptions {
    package?: string;
    arguments: FromUnderlyingAmountArguments | [
        vault: RawTransactionArgument<string>,
        ytAmount: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function fromUnderlyingAmount(options: FromUnderlyingAmountOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[1]}>`,
        'u64',
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["vault", "ytAmount", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'from_underlying_amount',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface StrategyWithdrawToTicketArguments {
    ticket: RawTransactionArgument<string>;
    access: RawTransactionArgument<string>;
    balance: RawTransactionArgument<string>;
}
export interface StrategyWithdrawToTicketOptions {
    package?: string;
    arguments: StrategyWithdrawToTicketArguments | [
        ticket: RawTransactionArgument<string>,
        access: RawTransactionArgument<string>,
        balance: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
/** Makes the strategy deposit the withdrawn balance into the `WithdrawTicket`. */
export function strategyWithdrawToTicket(options: StrategyWithdrawToTicketOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::WithdrawTicket<${options.typeArguments[0]}, ${options.typeArguments[1]}>`,
        `${packageAddress}::vault::VaultAccess`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["ticket", "access", "balance"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'strategy_withdraw_to_ticket',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface CalcRebalanceAmountsArguments {
    vault: RawTransactionArgument<string>;
}
export interface CalcRebalanceAmountsOptions {
    package?: string;
    arguments: CalcRebalanceAmountsArguments | [
        vault: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
/**
 * Get the target rebalance amounts the strategies should repay or can borrow. It
 * takes into account strategy target allocation weights and max borrow limits and
 * calculates the values so that the vault's balance allocations are kept at the
 * target weights and all of the vault's balance is allocated. This function is
 * idempotent in the sense that if you rebalance the pool with the returned amounts
 * and call it again, the result will require no further rebalancing. The
 * strategies are not expected to repay / borrow the exact amounts suggested as
 * this may be dictated by their internal logic, but they should try to get as
 * close as possible. Since the strategies are trusted, there are no explicit
 * checks for this within the vault.
 */
export function calcRebalanceAmounts(options: CalcRebalanceAmountsOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[1]}>`,
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["vault", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'calc_rebalance_amounts',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface StrategyRepayArguments {
    vault: RawTransactionArgument<string>;
    access: RawTransactionArgument<string>;
    balance: RawTransactionArgument<string>;
}
export interface StrategyRepayOptions {
    package?: string;
    arguments: StrategyRepayArguments | [
        vault: RawTransactionArgument<string>,
        access: RawTransactionArgument<string>,
        balance: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
/** Strategies call this to repay loaned amounts. */
export function strategyRepay(options: StrategyRepayOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[1]}>`,
        `${packageAddress}::vault::VaultAccess`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["vault", "access", "balance"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'strategy_repay',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface StrategyBorrowArguments {
    vault: RawTransactionArgument<string>;
    access: RawTransactionArgument<string>;
    amount: RawTransactionArgument<number | bigint>;
}
export interface StrategyBorrowOptions {
    package?: string;
    arguments: StrategyBorrowArguments | [
        vault: RawTransactionArgument<string>,
        access: RawTransactionArgument<string>,
        amount: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string,
        string
    ];
}
/**
 * Strategies call this to borrow additional funds from the vault. Always returns
 * exact amount requested or aborts.
 */
export function strategyBorrow(options: StrategyBorrowOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[1]}>`,
        `${packageAddress}::vault::VaultAccess`,
        'u64'
    ] satisfies string[];
    const parameterNames = ["vault", "access", "amount"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'strategy_borrow',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface StrategyHandOverProfitArguments {
    vault: RawTransactionArgument<string>;
    access: RawTransactionArgument<string>;
    profit: RawTransactionArgument<string>;
}
export interface StrategyHandOverProfitOptions {
    package?: string;
    arguments: StrategyHandOverProfitArguments | [
        vault: RawTransactionArgument<string>,
        access: RawTransactionArgument<string>,
        profit: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function strategyHandOverProfit(options: StrategyHandOverProfitOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[1]}>`,
        `${packageAddress}::vault::VaultAccess`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`,
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["vault", "access", "profit", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'vault',
        function: 'strategy_hand_over_profit',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}