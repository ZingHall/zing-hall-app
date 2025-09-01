/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export interface TimestampSecArguments {
}
export interface TimestampSecOptions {
    package?: string;
    arguments?: TimestampSecArguments | [
    ];
}
/** Get current clock timestamp in seconds. */
export function timestampSec(options: TimestampSecOptions = {}) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'util',
        function: 'timestamp_sec',
        arguments: normalizeMoveArguments(options.arguments ?? [], argumentsTypes, parameterNames),
    });
}
export interface MuldivArguments {
    a: RawTransactionArgument<number | bigint>;
    b: RawTransactionArgument<number | bigint>;
    c: RawTransactionArgument<number | bigint>;
}
export interface MuldivOptions {
    package?: string;
    arguments: MuldivArguments | [
        a: RawTransactionArgument<number | bigint>,
        b: RawTransactionArgument<number | bigint>,
        c: RawTransactionArgument<number | bigint>
    ];
}
export function muldiv(options: MuldivOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        'u64',
        'u64',
        'u64'
    ] satisfies string[];
    const parameterNames = ["a", "b", "c"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'util',
        function: 'muldiv',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface MuldivRoundUpArguments {
    a: RawTransactionArgument<number | bigint>;
    b: RawTransactionArgument<number | bigint>;
    c: RawTransactionArgument<number | bigint>;
}
export interface MuldivRoundUpOptions {
    package?: string;
    arguments: MuldivRoundUpArguments | [
        a: RawTransactionArgument<number | bigint>,
        b: RawTransactionArgument<number | bigint>,
        c: RawTransactionArgument<number | bigint>
    ];
}
export function muldivRoundUp(options: MuldivRoundUpOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_vault';
    const argumentsTypes = [
        'u64',
        'u64',
        'u64'
    ] satisfies string[];
    const parameterNames = ["a", "b", "c"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'util',
        function: 'muldiv_round_up',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}