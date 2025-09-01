/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import * as balance from './deps/sui/balance.js';
const $moduleName = '@local-pkg/zing_vault::time_locked_balance';
export const TimeLockedBalance = new MoveStruct({ name: `${$moduleName}::TimeLockedBalance`, fields: {
        locked_balance: balance.Balance,
        unlock_start_ts_sec: bcs.u64(),
        unlock_per_second: bcs.u64(),
        /** Balance that gets unlocked and is withdrawable is stored here. */
        unlocked_balance: balance.Balance,
        /** Time at which all of the balance will become unlocked. Unix timestamp. */
        final_unlock_ts_sec: bcs.u64(),
        previous_unlock_at: bcs.u64()
    } });
export interface UnlockStartTsSecArguments {
    self: RawTransactionArgument<string>;
}
export interface UnlockStartTsSecOptions {
    package?: string;
    arguments: UnlockStartTsSecArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function unlockStartTsSec(options: UnlockStartTsSecOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::time_locked_balance::TimeLockedBalance<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_locked_balance',
        function: 'unlock_start_ts_sec',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface UnlockPerSecondArguments {
    self: RawTransactionArgument<string>;
}
export interface UnlockPerSecondOptions {
    package?: string;
    arguments: UnlockPerSecondArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function unlockPerSecond(options: UnlockPerSecondOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::time_locked_balance::TimeLockedBalance<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_locked_balance',
        function: 'unlock_per_second',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface FinalUnlockTsSecArguments {
    self: RawTransactionArgument<string>;
}
export interface FinalUnlockTsSecOptions {
    package?: string;
    arguments: FinalUnlockTsSecArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function finalUnlockTsSec(options: FinalUnlockTsSecOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::time_locked_balance::TimeLockedBalance<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_locked_balance',
        function: 'final_unlock_ts_sec',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface GetValuesArguments {
    self: RawTransactionArgument<string>;
}
export interface GetValuesOptions {
    package?: string;
    arguments: GetValuesArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function getValues(options: GetValuesOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::time_locked_balance::TimeLockedBalance<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_locked_balance',
        function: 'get_values',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface CreateArguments {
    lockedBalance: RawTransactionArgument<string>;
    unlockStartTsSec: RawTransactionArgument<number | bigint>;
    unlockPerSecond: RawTransactionArgument<number | bigint>;
}
export interface CreateOptions {
    package?: string;
    arguments: CreateArguments | [
        lockedBalance: RawTransactionArgument<string>,
        unlockStartTsSec: RawTransactionArgument<number | bigint>,
        unlockPerSecond: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string
    ];
}
/**
 * Creates a new `TimeLockedBalance<T>` that will start unlocking at
 * `unlock_start_ts_sec` and unlock `unlock_per_second` of balance per second.
 */
export function create(options: CreateOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`,
        'u64',
        'u64'
    ] satisfies string[];
    const parameterNames = ["lockedBalance", "unlockStartTsSec", "unlockPerSecond"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_locked_balance',
        function: 'create',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface ExtraneousLockedAmountArguments {
    self: RawTransactionArgument<string>;
}
export interface ExtraneousLockedAmountOptions {
    package?: string;
    arguments: ExtraneousLockedAmountArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/**
 * Returns the value of extraneous balance. Since `locked_balance` amount might not
 * be evenly divisible by `unlock_per_second`, there will be some extraneous
 * balance. E.g. if `locked_balance` is 21 and `unlock_per_second` is 10, this
 * function will return 1. Extraneous balance can be withdrawn by calling
 * `skim_extraneous_balance` at any time. When `unlock_per_second` is 0, all
 * balance in `locked_balance` is considered extraneous. This makes it possible to
 * empty the `locked_balance` by setting `unlock_per_second` to 0 and then
 * skimming.
 */
export function extraneousLockedAmount(options: ExtraneousLockedAmountOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::time_locked_balance::TimeLockedBalance<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_locked_balance',
        function: 'extraneous_locked_amount',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface MaxWithdrawableArguments {
    self: RawTransactionArgument<string>;
}
export interface MaxWithdrawableOptions {
    package?: string;
    arguments: MaxWithdrawableArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/** Returns the max. available amount that can be withdrawn at this time. */
export function maxWithdrawable(options: MaxWithdrawableOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::time_locked_balance::TimeLockedBalance<${options.typeArguments[0]}>`,
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["self", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_locked_balance',
        function: 'max_withdrawable',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface RemainingUnlockArguments {
    self: RawTransactionArgument<string>;
}
export interface RemainingUnlockOptions {
    package?: string;
    arguments: RemainingUnlockArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/** Returns the total amount of balance that is yet to be unlocked. */
export function remainingUnlock(options: RemainingUnlockOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::time_locked_balance::TimeLockedBalance<${options.typeArguments[0]}>`,
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["self", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_locked_balance',
        function: 'remaining_unlock',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface WithdrawArguments {
    self: RawTransactionArgument<string>;
    amount: RawTransactionArgument<number | bigint>;
}
export interface WithdrawOptions {
    package?: string;
    arguments: WithdrawArguments | [
        self: RawTransactionArgument<string>,
        amount: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string
    ];
}
/**
 * Withdraws the specified (unlocked) amount. Errors if amount exceeds max.
 * withdrawable.
 */
export function withdraw(options: WithdrawOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::time_locked_balance::TimeLockedBalance<${options.typeArguments[0]}>`,
        'u64',
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["self", "amount", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_locked_balance',
        function: 'withdraw',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface WithdrawAllArguments {
    self: RawTransactionArgument<string>;
}
export interface WithdrawAllOptions {
    package?: string;
    arguments: WithdrawAllArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/** Withdraws all available (unlocked) balance. */
export function withdrawAll(options: WithdrawAllOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::time_locked_balance::TimeLockedBalance<${options.typeArguments[0]}>`,
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["self", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_locked_balance',
        function: 'withdraw_all',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface TopUpArguments {
    self: RawTransactionArgument<string>;
    balance: RawTransactionArgument<string>;
}
export interface TopUpOptions {
    package?: string;
    arguments: TopUpArguments | [
        self: RawTransactionArgument<string>,
        balance: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/**
 * Adds additional balance to be distributed (i.e. prolongs the duration of
 * distribution).
 */
export function topUp(options: TopUpOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::time_locked_balance::TimeLockedBalance<${options.typeArguments[0]}>`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`,
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["self", "balance", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_locked_balance',
        function: 'top_up',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface ChangeUnlockPerSecondArguments {
    self: RawTransactionArgument<string>;
    newUnlockPerSecond: RawTransactionArgument<number | bigint>;
}
export interface ChangeUnlockPerSecondOptions {
    package?: string;
    arguments: ChangeUnlockPerSecondArguments | [
        self: RawTransactionArgument<string>,
        newUnlockPerSecond: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string
    ];
}
/**
 * Changes `unlock_per_second` to a new value. New value is effective starting from
 * the current timestamp (unlocks up to and including the current timestamp are
 * based on the previous value).
 */
export function changeUnlockPerSecond(options: ChangeUnlockPerSecondOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::time_locked_balance::TimeLockedBalance<${options.typeArguments[0]}>`,
        'u64',
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["self", "newUnlockPerSecond", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_locked_balance',
        function: 'change_unlock_per_second',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface ChangeUnlockStartTsSecArguments {
    self: RawTransactionArgument<string>;
    newUnlockStartTsSec: RawTransactionArgument<number | bigint>;
}
export interface ChangeUnlockStartTsSecOptions {
    package?: string;
    arguments: ChangeUnlockStartTsSecArguments | [
        self: RawTransactionArgument<string>,
        newUnlockStartTsSec: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string
    ];
}
/**
 * Changes `unlock_start_ts_sec` to a new value. If the new value is in the past,
 * it will be set to the current time.
 */
export function changeUnlockStartTsSec(options: ChangeUnlockStartTsSecOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::time_locked_balance::TimeLockedBalance<${options.typeArguments[0]}>`,
        'u64',
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["self", "newUnlockStartTsSec", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_locked_balance',
        function: 'change_unlock_start_ts_sec',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface SkimExtraneousBalanceArguments {
    self: RawTransactionArgument<string>;
}
export interface SkimExtraneousBalanceOptions {
    package?: string;
    arguments: SkimExtraneousBalanceArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/**
 * Skims extraneous balance. Since `locked_balance` might not be evenly divisible
 * by, and balance is unlocked only in the multiples of `unlock_per_second`, there
 * might be some extra balance that will not be distributed (e.g. if
 * `locked_balance` is 20 `unlock_per_second` is 10, the extraneous balance will be
 * 1). This balance can be retrieved using this function. When `unlock_per_second`
 * is set to 0, all of the balance in `locked_balance` is considered extraneous.
 */
export function skimExtraneousBalance(options: SkimExtraneousBalanceOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::time_locked_balance::TimeLockedBalance<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_locked_balance',
        function: 'skim_extraneous_balance',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface DestroyEmptyArguments {
    self: RawTransactionArgument<string>;
}
export interface DestroyEmptyOptions {
    package?: string;
    arguments: DestroyEmptyArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/** Destroys the `TimeLockedBalance<T>` when its balances are empty. */
export function destroyEmpty(options: DestroyEmptyOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        `${packageAddress}::time_locked_balance::TimeLockedBalance<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_locked_balance',
        function: 'destroy_empty',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}