/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import * as object from './deps/sui/object.js';
import * as table from './deps/sui/table.js';
import * as balance from './deps/sui/balance.js';
const $moduleName = '@local-pkg/zing_framework::profile';
export const PROFILE = new MoveStruct({ name: `${$moduleName}::PROFILE`, fields: {
        dummy_field: bcs.bool()
    } });
export const MemberReg = new MoveStruct({ name: `${$moduleName}::MemberReg`, fields: {
        id: object.UID,
        registry: table.Table
    } });
export const ProfileEligibility = new MoveStruct({ name: `${$moduleName}::ProfileEligibility`, fields: {
        id: object.UID,
        supply: balance.Supply
    } });
export const Profile = new MoveStruct({ name: `${$moduleName}::Profile`, fields: {
        id: object.UID,
        owner: bcs.Address
    } });
export interface OwnerArguments {
    self: RawTransactionArgument<string>;
}
export interface OwnerOptions {
    package?: string;
    arguments: OwnerArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function owner(options: OwnerOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::profile::Profile<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'profile',
        function: 'owner',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface ApplyEligibilityArguments<P extends BcsType<any>> {
    witness: RawTransactionArgument<P>;
}
export interface ApplyEligibilityOptions<P extends BcsType<any>> {
    package?: string;
    arguments: ApplyEligibilityArguments<P> | [
        witness: RawTransactionArgument<P>
    ];
    typeArguments: [
        string
    ];
}
export function applyEligibility<P extends BcsType<any>>(options: ApplyEligibilityOptions<P>) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${options.typeArguments[0]}`
    ] satisfies string[];
    const parameterNames = ["witness"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'profile',
        function: 'apply_eligibility',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface RegisterArguments {
    memberReg: RawTransactionArgument<string>;
    eligibility: RawTransactionArgument<string>;
}
export interface RegisterOptions {
    package?: string;
    arguments: RegisterArguments | [
        memberReg: RawTransactionArgument<string>,
        eligibility: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function register(options: RegisterOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::profile::MemberReg`,
        `${packageAddress}::profile::ProfileEligibility<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["memberReg", "eligibility"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'profile',
        function: 'register',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}