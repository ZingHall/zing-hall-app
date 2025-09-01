/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import * as object from './deps/sui/object.js';
import * as token from './deps/zing_framework/token.js';
import * as balance from './deps/sui/balance.js';
import * as vec_set from './deps/sui/vec_set.js';
import * as type_name from './deps/std/type_name.js';
const $moduleName = '@local-pkg/zing_bank::patronage';
export const Patronage = new MoveStruct({ name: `${$moduleName}::Patronage`, fields: {
        id: object.UID
    } });
export const BalanceKey = new MoveStruct({ name: `${$moduleName}::BalanceKey`, fields: {
        dummy_field: bcs.bool()
    } });
export const PositionKey = new MoveStruct({ name: `${$moduleName}::PositionKey`, fields: {
        dummy_field: bcs.bool()
    } });
export const Position = new MoveStruct({ name: `${$moduleName}::Position`, fields: {
        id: object.UID,
        ptoken_cap: token.TokenCap,
        funds_available: balance.Balance,
        /** track the deposited asset token */
        deposited_token: bcs.u64(),
        asset: vec_set.VecSet(type_name.TypeName)
    } });
export const RecallReceipt = new MoveStruct({ name: `${$moduleName}::RecallReceipt`, fields: {
        withdrawal: bcs.u64()
    } });
export interface PositionArguments {
    self: RawTransactionArgument<string>;
}
export interface PositionOptions {
    package?: string;
    arguments: PositionArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function position(options: PositionOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_bank';
    const argumentsTypes = [
        `${packageAddress}::patronage::Patronage<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'patronage',
        function: 'position',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface FundsAvailableArguments {
    position: RawTransactionArgument<string>;
}
export interface FundsAvailableOptions {
    package?: string;
    arguments: FundsAvailableArguments | [
        position: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function fundsAvailable(options: FundsAvailableOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_bank';
    const argumentsTypes = [
        `${packageAddress}::patronage::Position<${options.typeArguments[0]}, ${options.typeArguments[1]}>`
    ] satisfies string[];
    const parameterNames = ["position"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'patronage',
        function: 'funds_available',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface DepositedTokenArguments {
    position: RawTransactionArgument<string>;
}
export interface DepositedTokenOptions {
    package?: string;
    arguments: DepositedTokenArguments | [
        position: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function depositedToken(options: DepositedTokenOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_bank';
    const argumentsTypes = [
        `${packageAddress}::patronage::Position<${options.typeArguments[0]}, ${options.typeArguments[1]}>`
    ] satisfies string[];
    const parameterNames = ["position"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'patronage',
        function: 'deposited_token',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface PositionBalanceOfArguments {
    position: RawTransactionArgument<string>;
}
export interface PositionBalanceOfOptions {
    package?: string;
    arguments: PositionBalanceOfArguments | [
        position: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string,
        string
    ];
}
export function positionBalanceOf(options: PositionBalanceOfOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_bank';
    const argumentsTypes = [
        `${packageAddress}::patronage::Position<${options.typeArguments[0]}, ${options.typeArguments[1]}>`
    ] satisfies string[];
    const parameterNames = ["position"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'patronage',
        function: 'position_balance_of',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface IsPositionBalanceExistsArguments {
    position: RawTransactionArgument<string>;
}
export interface IsPositionBalanceExistsOptions {
    package?: string;
    arguments: IsPositionBalanceExistsArguments | [
        position: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string,
        string
    ];
}
export function isPositionBalanceExists(options: IsPositionBalanceExistsOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_bank';
    const argumentsTypes = [
        `${packageAddress}::patronage::Position<${options.typeArguments[0]}, ${options.typeArguments[1]}>`
    ] satisfies string[];
    const parameterNames = ["position"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'patronage',
        function: 'is_position_balance_exists',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface PositionValueArguments {
    position: RawTransactionArgument<string>;
    vault: RawTransactionArgument<string>;
}
export interface PositionValueOptions {
    package?: string;
    arguments: PositionValueArguments | [
        position: RawTransactionArgument<string>,
        vault: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string,
        string
    ];
}
export function positionValue(options: PositionValueOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_bank';
    const argumentsTypes = [
        `${packageAddress}::patronage::Position<${options.typeArguments[0]}, ${options.typeArguments[1]}>`,
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[2]}>`,
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["position", "vault", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'patronage',
        function: 'position_value',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface NewArguments {
    Cap: RawTransactionArgument<string>;
}
export interface NewOptions {
    package?: string;
    arguments: NewArguments | [
        Cap: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function _new(options: NewOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_bank';
    const argumentsTypes = [
        `${packageAddress}::token::PlatformCap`
    ] satisfies string[];
    const parameterNames = ["Cap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'patronage',
        function: 'new',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface DefaultArguments {
    Cap: RawTransactionArgument<string>;
}
export interface DefaultOptions {
    package?: string;
    arguments: DefaultArguments | [
        Cap: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function _default(options: DefaultOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_bank';
    const argumentsTypes = [
        `${packageAddress}::token::PlatformCap`
    ] satisfies string[];
    const parameterNames = ["Cap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'patronage',
        function: 'default',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface OpenPositionArguments {
    self: RawTransactionArgument<string>;
    ptokenCap: RawTransactionArgument<string>;
}
export interface OpenPositionOptions {
    package?: string;
    arguments: OpenPositionArguments | [
        self: RawTransactionArgument<string>,
        ptokenCap: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function openPosition(options: OpenPositionOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_bank';
    const argumentsTypes = [
        `${packageAddress}::patronage::Patronage<${options.typeArguments[0]}>`,
        `${packageAddress}::token::TokenCap<${options.typeArguments[1]}>`
    ] satisfies string[];
    const parameterNames = ["self", "ptokenCap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'patronage',
        function: 'open_position',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface ClosePositionArguments {
    self: RawTransactionArgument<string>;
    profile: RawTransactionArgument<string>;
}
export interface ClosePositionOptions {
    package?: string;
    arguments: ClosePositionArguments | [
        self: RawTransactionArgument<string>,
        profile: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function closePosition(options: ClosePositionOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_bank';
    const argumentsTypes = [
        `${packageAddress}::patronage::Patronage<${options.typeArguments[0]}>`,
        `${packageAddress}::profile::Profile<${options.typeArguments[1]}>`
    ] satisfies string[];
    const parameterNames = ["self", "profile"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'patronage',
        function: 'close_position',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface DepositArguments {
    self: RawTransactionArgument<string>;
    deposit: RawTransactionArgument<string>;
}
export interface DepositOptions {
    package?: string;
    arguments: DepositArguments | [
        self: RawTransactionArgument<string>,
        deposit: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function deposit(options: DepositOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_bank';
    const argumentsTypes = [
        `${packageAddress}::patronage::Patronage<${options.typeArguments[0]}>`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["self", "deposit"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'patronage',
        function: 'deposit',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface BurnArguments {
    self: RawTransactionArgument<string>;
    ptoken: RawTransactionArgument<string>;
}
export interface BurnOptions {
    package?: string;
    arguments: BurnArguments | [
        self: RawTransactionArgument<string>,
        ptoken: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function burn(options: BurnOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_bank';
    const argumentsTypes = [
        `${packageAddress}::patronage::Patronage<${options.typeArguments[0]}>`,
        `${packageAddress}::token::Token<${options.typeArguments[1]}>`
    ] satisfies string[];
    const parameterNames = ["self", "ptoken"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'patronage',
        function: 'burn',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface DonateArguments {
    self: RawTransactionArgument<string>;
    donation: RawTransactionArgument<string>;
}
export interface DonateOptions {
    package?: string;
    arguments: DonateArguments | [
        self: RawTransactionArgument<string>,
        donation: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function donate(options: DonateOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_bank';
    const argumentsTypes = [
        `${packageAddress}::patronage::Patronage<${options.typeArguments[0]}>`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["self", "donation"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'patronage',
        function: 'donate',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface DeployToVaultArguments {
    self: RawTransactionArgument<string>;
    vault: RawTransactionArgument<string>;
    amountToDeploy: RawTransactionArgument<number | bigint>;
}
export interface DeployToVaultOptions {
    package?: string;
    arguments: DeployToVaultArguments | [
        self: RawTransactionArgument<string>,
        vault: RawTransactionArgument<string>,
        amountToDeploy: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string,
        string,
        string
    ];
}
export function deployToVault(options: DeployToVaultOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_bank';
    const argumentsTypes = [
        `${packageAddress}::patronage::Patronage<${options.typeArguments[0]}>`,
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[2]}>`,
        'u64',
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["self", "vault", "amountToDeploy", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'patronage',
        function: 'deploy_to_vault',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface StartRecallArguments {
    self: RawTransactionArgument<string>;
    vault: RawTransactionArgument<string>;
    amountToRecall: RawTransactionArgument<number | bigint>;
}
export interface StartRecallOptions {
    package?: string;
    arguments: StartRecallArguments | [
        self: RawTransactionArgument<string>,
        vault: RawTransactionArgument<string>,
        amountToRecall: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string,
        string,
        string
    ];
}
export function startRecall(options: StartRecallOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_bank';
    const argumentsTypes = [
        `${packageAddress}::patronage::Patronage<${options.typeArguments[0]}>`,
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[2]}>`,
        'u64',
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["self", "vault", "amountToRecall", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'patronage',
        function: 'start_recall',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface SettleRecallArguments {
    self: RawTransactionArgument<string>;
    receipt: RawTransactionArgument<string>;
    withdrawalBal: RawTransactionArgument<string>;
}
export interface SettleRecallOptions {
    package?: string;
    arguments: SettleRecallArguments | [
        self: RawTransactionArgument<string>,
        receipt: RawTransactionArgument<string>,
        withdrawalBal: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string,
        string
    ];
}
export function settleRecall(options: SettleRecallOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_bank';
    const argumentsTypes = [
        `${packageAddress}::patronage::Patronage<${options.typeArguments[0]}>`,
        `${packageAddress}::patronage::RecallReceipt<${options.typeArguments[0]}, ${options.typeArguments[1]}, ${options.typeArguments[2]}>`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["self", "receipt", "withdrawalBal"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'patronage',
        function: 'settle_recall',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface CollectRewardArguments {
    self: RawTransactionArgument<string>;
    Profile: RawTransactionArgument<string>;
    vault: RawTransactionArgument<string>;
}
export interface CollectRewardOptions {
    package?: string;
    arguments: CollectRewardArguments | [
        self: RawTransactionArgument<string>,
        Profile: RawTransactionArgument<string>,
        vault: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string,
        string
    ];
}
export function collectReward(options: CollectRewardOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_bank';
    const argumentsTypes = [
        `${packageAddress}::patronage::Patronage<${options.typeArguments[0]}>`,
        `${packageAddress}::profile::Profile<${options.typeArguments[1]}>`,
        `${packageAddress}::vault::Vault<${options.typeArguments[0]}, ${options.typeArguments[2]}>`,
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["self", "Profile", "vault", "clock"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'patronage',
        function: 'collect_reward',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}