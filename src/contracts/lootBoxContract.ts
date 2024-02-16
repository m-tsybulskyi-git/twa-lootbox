import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type UserStats = {
    $$type: 'UserStats';
    counter: bigint;
    biggestWin: bigint;
    lastWin: bigint;
}

export function storeUserStats(src: UserStats) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.counter, 32);
        b_0.storeUint(src.biggestWin, 256);
        b_0.storeUint(src.lastWin, 256);
    };
}

export function loadUserStats(slice: Slice) {
    let sc_0 = slice;
    let _counter = sc_0.loadUintBig(32);
    let _biggestWin = sc_0.loadUintBig(256);
    let _lastWin = sc_0.loadUintBig(256);
    return { $$type: 'UserStats' as const, counter: _counter, biggestWin: _biggestWin, lastWin: _lastWin };
}

function loadTupleUserStats(source: TupleReader) {
    let _counter = source.readBigNumber();
    let _biggestWin = source.readBigNumber();
    let _lastWin = source.readBigNumber();
    return { $$type: 'UserStats' as const, counter: _counter, biggestWin: _biggestWin, lastWin: _lastWin };
}

function storeTupleUserStats(source: UserStats) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.counter);
    builder.writeNumber(source.biggestWin);
    builder.writeNumber(source.lastWin);
    return builder.build();
}

function dictValueParserUserStats(): DictionaryValue<UserStats> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUserStats(src)).endCell());
        },
        parse: (src) => {
            return loadUserStats(src.loadRef().beginParse());
        }
    }
}

 type LootBoxContract_init_args = {
    $$type: 'LootBoxContract_init_args';
    owner: Address;
}

function initLootBoxContract_init_args(src: LootBoxContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function LootBoxContract_init(owner: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initLootBoxContract_init_args({ $$type: 'LootBoxContract_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const LootBoxContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
}

const LootBoxContract_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UserStats","header":null,"fields":[{"name":"counter","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"biggestWin","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"lastWin","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
]

const LootBoxContract_getters: ABIGetter[] = [
    {"name":"userStats","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"UserStats","optional":true}},
    {"name":"globalStats","arguments":[],"returnType":{"kind":"simple","type":"UserStats","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const LootBoxContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"withdraw"}},
    {"receiver":"internal","message":{"kind":"text","text":"top_up_balance"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw_all"}},
    {"receiver":"internal","message":{"kind":"text","text":"play"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class LootBoxContract implements Contract {
    
    static async init(owner: Address) {
        return await LootBoxContract_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await LootBoxContract_init(owner);
        const address = contractAddress(0, init);
        return new LootBoxContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new LootBoxContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  LootBoxContract_types,
        getters: LootBoxContract_getters,
        receivers: LootBoxContract_receivers,
        errors: LootBoxContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'withdraw' | 'top_up_balance' | 'withdraw_all' | 'play' | Deploy) {
        
        let body: Cell | null = null;
        if (message === 'withdraw') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'top_up_balance') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'withdraw_all') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'play') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getUserStats(provider: ContractProvider, address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(address);
        let source = (await provider.get('userStats', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleUserStats(result_p) : null;
        return result;
    }
    
    async getGlobalStats(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('globalStats', builder.build())).stack;
        const result = loadTupleUserStats(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}