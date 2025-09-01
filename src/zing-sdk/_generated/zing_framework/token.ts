/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import * as object from './deps/sui/object.js';
import * as vec_map from './deps/sui/vec_map.js';
import * as vec_set from './deps/sui/vec_set.js';
import * as type_name from './deps/std/type_name.js';
import * as balance from './deps/sui/balance.js';
const $moduleName = '@local-pkg/zing_framework::token';
export const MintEvent = new MoveStruct({ name: `${$moduleName}::MintEvent`, fields: {
        owner: bcs.Address,
        amount: bcs.u64()
    } });
export const BurnEvent = new MoveStruct({ name: `${$moduleName}::BurnEvent`, fields: {
        owner: bcs.Address,
        amount: bcs.u64()
    } });
export const TOKEN = new MoveStruct({ name: `${$moduleName}::TOKEN`, fields: {
        dummy_field: bcs.bool()
    } });
export const PlatformCap = new MoveStruct({ name: `${$moduleName}::PlatformCap`, fields: {
        id: object.UID
    } });
export const PlatFormPolicy = new MoveStruct({ name: `${$moduleName}::PlatFormPolicy`, fields: {
        id: object.UID,
        default_rules: vec_map.VecMap(bcs.string(), vec_set.VecSet(type_name.TypeName))
    } });
export const PolicyRulesKey = new MoveStruct({ name: `${$moduleName}::PolicyRulesKey`, fields: {
        dummy_field: bcs.bool()
    } });
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
export const Token = new MoveStruct({ name: `${$moduleName}::Token`, fields: {
        id: object.UID,
        balance: balance.Balance
    } });
export const ActionRequest = new MoveStruct({ name: `${$moduleName}::ActionRequest`, fields: {
        name: bcs.string(),
        /** Amount is present in all of the txs */
        amount: bcs.u64(),
        /** Sender is a permanent field always */
        sender: bcs.Address,
        /** Recipient is only available in `transfer` action. */
        recipient: bcs.option(bcs.Address),
        /**
         * Collected approvals (stamps) from completed `Rules`. They're matched against
         * `TokenPolicy.rules` to determine if the request can be confirmed.
         */
        approvals: vec_set.VecSet(type_name.TypeName)
    } });
export const RuleKey = new MoveStruct({ name: `${$moduleName}::RuleKey`, fields: {
        is_protected: bcs.bool()
    } });
export interface DecimalOptions {
    package?: string;
    arguments?: [
    ];
}
export function decimal(options: DecimalOptions = {}) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'decimal',
    });
}
export interface SpendActionOptions {
    package?: string;
    arguments?: [
    ];
}
export function spendAction(options: SpendActionOptions = {}) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'spend_action',
    });
}
export interface TransferActionOptions {
    package?: string;
    arguments?: [
    ];
}
export function transferAction(options: TransferActionOptions = {}) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'transfer_action',
    });
}
export interface DefaultRulesArguments {
    platformPolicy: RawTransactionArgument<string>;
}
export interface DefaultRulesOptions {
    package?: string;
    arguments: DefaultRulesArguments | [
        platformPolicy: RawTransactionArgument<string>
    ];
}
export function defaultRules(options: DefaultRulesOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::PlatFormPolicy`
    ] satisfies string[];
    const parameterNames = ["platformPolicy"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'default_rules',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface PolicyRulesOfArguments {
    platformPolicy: RawTransactionArgument<string>;
}
export interface PolicyRulesOfOptions {
    package?: string;
    arguments: PolicyRulesOfArguments | [
        platformPolicy: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function policyRulesOf(options: PolicyRulesOfOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::PlatFormPolicy`
    ] satisfies string[];
    const parameterNames = ["platformPolicy"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'policy_rules_of',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface OwnerArguments {
    tokenCap: RawTransactionArgument<string>;
}
export interface OwnerOptions {
    package?: string;
    arguments: OwnerArguments | [
        tokenCap: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function owner(options: OwnerOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::TokenCap<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["tokenCap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'owner',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface SupplyArguments {
    tokenCap: RawTransactionArgument<string>;
}
export interface SupplyOptions {
    package?: string;
    arguments: SupplyArguments | [
        tokenCap: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function supply(options: SupplyOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::TokenCap<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["tokenCap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'supply',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface SupplyMutArguments {
    tokenCap: RawTransactionArgument<string>;
}
export interface SupplyMutOptions {
    package?: string;
    arguments: SupplyMutArguments | [
        tokenCap: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function supplyMut(options: SupplyMutOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::TokenCap<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["tokenCap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'supply_mut',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface TotalSupplyArguments {
    tokenCap: RawTransactionArgument<string>;
}
export interface TotalSupplyOptions {
    package?: string;
    arguments: TotalSupplyArguments | [
        tokenCap: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function totalSupply(options: TotalSupplyOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::TokenCap<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["tokenCap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'total_supply',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface UpdateSupplyLimitArguments {
    tokenCap: RawTransactionArgument<string>;
    value: RawTransactionArgument<number | bigint>;
}
export interface UpdateSupplyLimitOptions {
    package?: string;
    arguments: UpdateSupplyLimitArguments | [
        tokenCap: RawTransactionArgument<string>,
        value: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string
    ];
}
export function updateSupplyLimit(options: UpdateSupplyLimitOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::TokenCap<${options.typeArguments[0]}>`,
        'u64'
    ] satisfies string[];
    const parameterNames = ["tokenCap", "value"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'update_supply_limit',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface AddPolicyArguments {
    platformPolicy: RawTransactionArgument<string>;
    Cap: RawTransactionArgument<string>;
}
export interface AddPolicyOptions {
    package?: string;
    arguments: AddPolicyArguments | [
        platformPolicy: RawTransactionArgument<string>,
        Cap: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function addPolicy(options: AddPolicyOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::PlatFormPolicy`,
        `${packageAddress}::token::PlatformCap`
    ] satisfies string[];
    const parameterNames = ["platformPolicy", "Cap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'add_policy',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface TransferArguments {
    t: RawTransactionArgument<string>;
    recipient: RawTransactionArgument<string>;
}
export interface TransferOptions {
    package?: string;
    arguments: TransferArguments | [
        t: RawTransactionArgument<string>,
        recipient: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/**
 * Transfer a `Token` to a `recipient`. Creates an `ActionRequest` for the
 * "transfer" action. The `ActionRequest` contains the `recipient` field to be used
 * in verification.
 */
export function transfer(options: TransferOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::Token<${options.typeArguments[0]}>`,
        'address'
    ] satisfies string[];
    const parameterNames = ["t", "recipient"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'transfer',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface JoinArguments {
    token: RawTransactionArgument<string>;
    another: RawTransactionArgument<string>;
}
export interface JoinOptions {
    package?: string;
    arguments: JoinArguments | [
        token: RawTransactionArgument<string>,
        another: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/** Join two `Token`s into one, always available. */
export function join(options: JoinOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::Token<${options.typeArguments[0]}>`,
        `${packageAddress}::token::Token<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["token", "another"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'join',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface SplitArguments {
    token: RawTransactionArgument<string>;
    amount: RawTransactionArgument<number | bigint>;
}
export interface SplitOptions {
    package?: string;
    arguments: SplitArguments | [
        token: RawTransactionArgument<string>,
        amount: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string
    ];
}
/**
 * Split a `Token` with `amount`. Aborts if the `Token.balance` is lower than
 * `amount`.
 */
export function split(options: SplitOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::Token<${options.typeArguments[0]}>`,
        'u64'
    ] satisfies string[];
    const parameterNames = ["token", "amount"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'split',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface ZeroOptions {
    package?: string;
    arguments?: [
    ];
    typeArguments: [
        string
    ];
}
/** Create a zero `Token`. */
export function zero(options: ZeroOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'zero',
        typeArguments: options.typeArguments
    });
}
export interface DestroyZeroArguments {
    token: RawTransactionArgument<string>;
}
export interface DestroyZeroOptions {
    package?: string;
    arguments: DestroyZeroArguments | [
        token: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/**
 * Destroy an empty `Token`, fails if the balance is non-zero. Aborts if the
 * `Token.balance` is not zero.
 */
export function destroyZero(options: DestroyZeroOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::Token<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["token"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'destroy_zero',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface KeepArguments {
    token: RawTransactionArgument<string>;
}
export interface KeepOptions {
    package?: string;
    arguments: KeepArguments | [
        token: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/** Transfer the `Token` to the transaction sender. */
export function keep(options: KeepOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::Token<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["token"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'keep',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface NewRequestArguments {
    name: RawTransactionArgument<string>;
    amount: RawTransactionArgument<number | bigint>;
    recipient: RawTransactionArgument<string | null>;
}
export interface NewRequestOptions {
    package?: string;
    arguments: NewRequestArguments | [
        name: RawTransactionArgument<string>,
        amount: RawTransactionArgument<number | bigint>,
        recipient: RawTransactionArgument<string | null>
    ];
    typeArguments: [
        string
    ];
}
/**
 * Create a new `ActionRequest`. Publicly available method to allow for custom
 * actions.
 */
export function newRequest(options: NewRequestOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        '0x0000000000000000000000000000000000000000000000000000000000000001::ascii::String',
        'u64',
        '0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<address>'
    ] satisfies string[];
    const parameterNames = ["name", "amount", "recipient"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'new_request',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface ConfirmRequestArguments {
    platformPolicy: RawTransactionArgument<string>;
    request: RawTransactionArgument<string>;
}
export interface ConfirmRequestOptions {
    package?: string;
    arguments: ConfirmRequestArguments | [
        platformPolicy: RawTransactionArgument<string>,
        request: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/**
 * Confirm the request against the `TokenPolicy` and return the parameters of the
 * request: (Name, Amount, Sender, Recipient).
 *
 * Cannot be used for `spend` and similar actions that deliver `spent_balance` to
 * the `TokenPolicy`. For those actions use `confirm_request_mut`.
 *
 * Aborts if:
 *
 * - the action is not allowed (missing record in `rules`)
 * - action contains `spent_balance` (use `confirm_request_mut`)
 * - the `ActionRequest` does not meet the `TokenPolicy` rules for the action
 */
export function confirmRequest(options: ConfirmRequestOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::PlatFormPolicy`,
        `${packageAddress}::token::ActionRequest<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["platformPolicy", "request"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'confirm_request',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface ConfirmRequestMutArguments {
    platformPolicy: RawTransactionArgument<string>;
    request: RawTransactionArgument<string>;
}
export interface ConfirmRequestMutOptions {
    package?: string;
    arguments: ConfirmRequestMutArguments | [
        platformPolicy: RawTransactionArgument<string>,
        request: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function confirmRequestMut(options: ConfirmRequestMutOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::PlatFormPolicy`,
        `${packageAddress}::token::ActionRequest<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["platformPolicy", "request"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'confirm_request_mut',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface AddApprovalArguments<W extends BcsType<any>> {
    T: RawTransactionArgument<W>;
    request: RawTransactionArgument<string>;
}
export interface AddApprovalOptions<W extends BcsType<any>> {
    package?: string;
    arguments: AddApprovalArguments<W> | [
        T: RawTransactionArgument<W>,
        request: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function addApproval<W extends BcsType<any>>(options: AddApprovalOptions<W>) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${options.typeArguments[1]}`,
        `${packageAddress}::token::ActionRequest<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["T", "request"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'add_approval',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface AddRuleConfigArguments<Rule extends BcsType<any>, Config extends BcsType<any>> {
    Rule: RawTransactionArgument<Rule>;
    self: RawTransactionArgument<string>;
    Cap: RawTransactionArgument<string>;
    config: RawTransactionArgument<Config>;
}
export interface AddRuleConfigOptions<Rule extends BcsType<any>, Config extends BcsType<any>> {
    package?: string;
    arguments: AddRuleConfigArguments<Rule, Config> | [
        Rule: RawTransactionArgument<Rule>,
        self: RawTransactionArgument<string>,
        Cap: RawTransactionArgument<string>,
        config: RawTransactionArgument<Config>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function addRuleConfig<Rule extends BcsType<any>, Config extends BcsType<any>>(options: AddRuleConfigOptions<Rule, Config>) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${options.typeArguments[0]}`,
        `${packageAddress}::token::PlatFormPolicy`,
        `${packageAddress}::token::PlatformCap`,
        `${options.typeArguments[1]}`
    ] satisfies string[];
    const parameterNames = ["Rule", "self", "Cap", "config"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'add_rule_config',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface RuleConfigArguments<Rule extends BcsType<any>> {
    Rule: RawTransactionArgument<Rule>;
    self: RawTransactionArgument<string>;
}
export interface RuleConfigOptions<Rule extends BcsType<any>> {
    package?: string;
    arguments: RuleConfigArguments<Rule> | [
        Rule: RawTransactionArgument<Rule>,
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function ruleConfig<Rule extends BcsType<any>>(options: RuleConfigOptions<Rule>) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${options.typeArguments[0]}`,
        `${packageAddress}::token::PlatFormPolicy`
    ] satisfies string[];
    const parameterNames = ["Rule", "self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'rule_config',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface RuleConfigMutArguments<Rule extends BcsType<any>> {
    Rule: RawTransactionArgument<Rule>;
    self: RawTransactionArgument<string>;
    Cap: RawTransactionArgument<string>;
}
export interface RuleConfigMutOptions<Rule extends BcsType<any>> {
    package?: string;
    arguments: RuleConfigMutArguments<Rule> | [
        Rule: RawTransactionArgument<Rule>,
        self: RawTransactionArgument<string>,
        Cap: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function ruleConfigMut<Rule extends BcsType<any>>(options: RuleConfigMutOptions<Rule>) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${options.typeArguments[0]}`,
        `${packageAddress}::token::PlatFormPolicy`,
        `${packageAddress}::token::PlatformCap`
    ] satisfies string[];
    const parameterNames = ["Rule", "self", "Cap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'rule_config_mut',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface RemoveRuleConfigArguments {
    self: RawTransactionArgument<string>;
    Cap: RawTransactionArgument<string>;
}
export interface RemoveRuleConfigOptions {
    package?: string;
    arguments: RemoveRuleConfigArguments | [
        self: RawTransactionArgument<string>,
        Cap: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function removeRuleConfig(options: RemoveRuleConfigOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::PlatFormPolicy`,
        `${packageAddress}::token::PlatformCap`
    ] satisfies string[];
    const parameterNames = ["self", "Cap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'remove_rule_config',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface HasRuleConfigArguments {
    self: RawTransactionArgument<string>;
}
export interface HasRuleConfigOptions {
    package?: string;
    arguments: HasRuleConfigArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/**
 * Check if a config for a `Rule` is set in the `TokenPolicy` without checking the
 * type of the `Config`.
 */
export function hasRuleConfig(options: HasRuleConfigOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::PlatFormPolicy`
    ] satisfies string[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'has_rule_config',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface HasRuleConfigWithTypeArguments {
    self: RawTransactionArgument<string>;
}
export interface HasRuleConfigWithTypeOptions {
    package?: string;
    arguments: HasRuleConfigWithTypeArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
/**
 * Check if a `Config` for a `Rule` is set in the `TokenPolicy` and that it matches
 * the type provided.
 */
export function hasRuleConfigWithType(options: HasRuleConfigWithTypeOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::PlatFormPolicy`
    ] satisfies string[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'has_rule_config_with_type',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface AllowDefaultActipnArguments {
    platformPolicy: RawTransactionArgument<string>;
    Cap: RawTransactionArgument<string>;
    action: RawTransactionArgument<string>;
}
export interface AllowDefaultActipnOptions {
    package?: string;
    arguments: AllowDefaultActipnArguments | [
        platformPolicy: RawTransactionArgument<string>,
        Cap: RawTransactionArgument<string>,
        action: RawTransactionArgument<string>
    ];
}
export function allowDefaultActipn(options: AllowDefaultActipnOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::PlatFormPolicy`,
        `${packageAddress}::token::PlatformCap`,
        '0x0000000000000000000000000000000000000000000000000000000000000001::ascii::String'
    ] satisfies string[];
    const parameterNames = ["platformPolicy", "Cap", "action"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'allow_default_actipn',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface AllowActionArguments {
    platformPolicy: RawTransactionArgument<string>;
    Cap: RawTransactionArgument<string>;
    action: RawTransactionArgument<string>;
}
export interface AllowActionOptions {
    package?: string;
    arguments: AllowActionArguments | [
        platformPolicy: RawTransactionArgument<string>,
        Cap: RawTransactionArgument<string>,
        action: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function allowAction(options: AllowActionOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::PlatFormPolicy`,
        `${packageAddress}::token::PlatformCap`,
        '0x0000000000000000000000000000000000000000000000000000000000000001::ascii::String'
    ] satisfies string[];
    const parameterNames = ["platformPolicy", "Cap", "action"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'allow_action',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface DisallowDefaultActipnArguments {
    platformPolicy: RawTransactionArgument<string>;
    Cap: RawTransactionArgument<string>;
    action: RawTransactionArgument<string>;
}
export interface DisallowDefaultActipnOptions {
    package?: string;
    arguments: DisallowDefaultActipnArguments | [
        platformPolicy: RawTransactionArgument<string>,
        Cap: RawTransactionArgument<string>,
        action: RawTransactionArgument<string>
    ];
}
export function disallowDefaultActipn(options: DisallowDefaultActipnOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::PlatFormPolicy`,
        `${packageAddress}::token::PlatformCap`,
        '0x0000000000000000000000000000000000000000000000000000000000000001::ascii::String'
    ] satisfies string[];
    const parameterNames = ["platformPolicy", "Cap", "action"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'disallow_default_actipn',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface DisallowActionArguments {
    platformPolicy: RawTransactionArgument<string>;
    Cap: RawTransactionArgument<string>;
    action: RawTransactionArgument<string>;
}
export interface DisallowActionOptions {
    package?: string;
    arguments: DisallowActionArguments | [
        platformPolicy: RawTransactionArgument<string>,
        Cap: RawTransactionArgument<string>,
        action: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function disallowAction(options: DisallowActionOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::PlatFormPolicy`,
        `${packageAddress}::token::PlatformCap`,
        '0x0000000000000000000000000000000000000000000000000000000000000001::ascii::String'
    ] satisfies string[];
    const parameterNames = ["platformPolicy", "Cap", "action"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'disallow_action',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface AddDefaultRuleForActionArguments {
    platformPolicy: RawTransactionArgument<string>;
    Cap: RawTransactionArgument<string>;
    action: RawTransactionArgument<string>;
}
export interface AddDefaultRuleForActionOptions {
    package?: string;
    arguments: AddDefaultRuleForActionArguments | [
        platformPolicy: RawTransactionArgument<string>,
        Cap: RawTransactionArgument<string>,
        action: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function addDefaultRuleForAction(options: AddDefaultRuleForActionOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::PlatFormPolicy`,
        `${packageAddress}::token::PlatformCap`,
        '0x0000000000000000000000000000000000000000000000000000000000000001::ascii::String'
    ] satisfies string[];
    const parameterNames = ["platformPolicy", "Cap", "action"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'add_default_rule_for_action',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface AddRuleForActionArguments {
    platformPolicy: RawTransactionArgument<string>;
    Cap: RawTransactionArgument<string>;
    action: RawTransactionArgument<string>;
}
export interface AddRuleForActionOptions {
    package?: string;
    arguments: AddRuleForActionArguments | [
        platformPolicy: RawTransactionArgument<string>,
        Cap: RawTransactionArgument<string>,
        action: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function addRuleForAction(options: AddRuleForActionOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::PlatFormPolicy`,
        `${packageAddress}::token::PlatformCap`,
        '0x0000000000000000000000000000000000000000000000000000000000000001::ascii::String'
    ] satisfies string[];
    const parameterNames = ["platformPolicy", "Cap", "action"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'add_rule_for_action',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface RemoveDefaultRuleForActionArguments {
    platformPolicy: RawTransactionArgument<string>;
    Cap: RawTransactionArgument<string>;
    action: RawTransactionArgument<string>;
}
export interface RemoveDefaultRuleForActionOptions {
    package?: string;
    arguments: RemoveDefaultRuleForActionArguments | [
        platformPolicy: RawTransactionArgument<string>,
        Cap: RawTransactionArgument<string>,
        action: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function removeDefaultRuleForAction(options: RemoveDefaultRuleForActionOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::PlatFormPolicy`,
        `${packageAddress}::token::PlatformCap`,
        '0x0000000000000000000000000000000000000000000000000000000000000001::ascii::String'
    ] satisfies string[];
    const parameterNames = ["platformPolicy", "Cap", "action"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'remove_default_rule_for_action',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface RemoveRuleForActionArguments {
    platformPolicy: RawTransactionArgument<string>;
    Cap: RawTransactionArgument<string>;
    action: RawTransactionArgument<string>;
}
export interface RemoveRuleForActionOptions {
    package?: string;
    arguments: RemoveRuleForActionArguments | [
        platformPolicy: RawTransactionArgument<string>,
        Cap: RawTransactionArgument<string>,
        action: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function removeRuleForAction(options: RemoveRuleForActionOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::PlatFormPolicy`,
        `${packageAddress}::token::PlatformCap`,
        '0x0000000000000000000000000000000000000000000000000000000000000001::ascii::String'
    ] satisfies string[];
    const parameterNames = ["platformPolicy", "Cap", "action"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'remove_rule_for_action',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface MintArguments {
    cap: RawTransactionArgument<string>;
    amount: RawTransactionArgument<number | bigint>;
}
export interface MintOptions {
    package?: string;
    arguments: MintArguments | [
        cap: RawTransactionArgument<string>,
        amount: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string
    ];
}
/** Mint a `Token` with a given `amount` using the `TokenCap`. */
export function mint(options: MintOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::TokenCap<${options.typeArguments[0]}>`,
        'u64'
    ] satisfies string[];
    const parameterNames = ["cap", "amount"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'mint',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface BurnArguments {
    cap: RawTransactionArgument<string>;
    token: RawTransactionArgument<string>;
}
export interface BurnOptions {
    package?: string;
    arguments: BurnArguments | [
        cap: RawTransactionArgument<string>,
        token: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/** Burn a `Token` using the `TokenCap`. */
export function burn(options: BurnOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::TokenCap<${options.typeArguments[0]}>`,
        `${packageAddress}::token::Token<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["cap", "token"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'burn',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface ValueArguments {
    t: RawTransactionArgument<string>;
}
export interface ValueOptions {
    package?: string;
    arguments: ValueArguments | [
        t: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function value(options: ValueOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::Token<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["t"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'value',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface ActionArguments {
    self: RawTransactionArgument<string>;
}
export interface ActionOptions {
    package?: string;
    arguments: ActionArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/** The Action in the `ActionRequest`. */
export function action(options: ActionOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::ActionRequest<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'action',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface AmountArguments {
    self: RawTransactionArgument<string>;
}
export interface AmountOptions {
    package?: string;
    arguments: AmountArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/** Amount of the `ActionRequest`. */
export function amount(options: AmountOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::ActionRequest<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'amount',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface SenderArguments {
    self: RawTransactionArgument<string>;
}
export interface SenderOptions {
    package?: string;
    arguments: SenderArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/** Sender of the `ActionRequest`. */
export function sender(options: SenderOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::ActionRequest<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'sender',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface RecipientArguments {
    self: RawTransactionArgument<string>;
}
export interface RecipientOptions {
    package?: string;
    arguments: RecipientArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/** Recipient of the `ActionRequest`. */
export function recipient(options: RecipientOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::ActionRequest<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'recipient',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface ApprovalsArguments {
    self: RawTransactionArgument<string>;
}
export interface ApprovalsOptions {
    package?: string;
    arguments: ApprovalsArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/** Approvals of the `ActionRequest`. */
export function approvals(options: ApprovalsOptions) {
    const packageAddress = options.package ?? '@local-pkg/zing_framework';
    const argumentsTypes = [
        `${packageAddress}::token::ActionRequest<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'token',
        function: 'approvals',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}