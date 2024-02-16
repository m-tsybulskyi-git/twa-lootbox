import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    TupleReader,
    ContractProvider,
    Sender,
    Contract,
    TupleBuilder,
} from "@ton/core";

export type UserStats = {
    counter: bigint;
    biggestWin: bigint;
    lastWin: bigint;
};

export function storeUserStats(src: UserStats) {
    return (builder: Builder) => {
        let builderUserStats = builder;
        builderUserStats.storeUint(src.counter, 32);
        builderUserStats.storeUint(src.biggestWin, 32);
        builderUserStats.storeUint(src.lastWin, 32);
    };
}

export function loadUserStats(slice: Slice) {
    let userStatsSlice = slice;
    let _counter = userStatsSlice.loadUintBig(32);
    let _biggestWin = userStatsSlice.loadUintBig(32);
    let _lastWin = userStatsSlice.loadUintBig(32);
    return { counter: _counter, biggestWin: _biggestWin, lastWin: _lastWin };
}

function loadTupleUserStats(source: TupleReader) {
    let _counter = source.readBigNumber();
    let _biggestWin = source.readBigNumber();
    let _lastWin = source.readBigNumber();
    return { counter: _counter, biggestWin: _biggestWin, lastWin: _lastWin };
}

export class LootBoxContract implements Contract {
    static fromAddress(address: Address) {
        return new LootBoxContract(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(
        provider: ContractProvider,
        via: Sender,
        args: { value: bigint; bounce?: boolean | null | undefined },
        message: "withdraw" | "withdraw_all" | "play"
    ) {
        let body: Cell | null = null;
        if (message === "withdraw") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "withdraw_all") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "play") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }

        if (body === null) {
            throw new Error("Invalid message type");
        }

        await provider.internal(via, { ...args, body: body });
    }

    async getUserStats(provider: ContractProvider, address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(address);
        let source = (await provider.get("userStats", builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleUserStats(result_p) : null;
        return result;
    }

    async getGlobalStats(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get("globalStats", builder.build())).stack;
        const result = loadTupleUserStats(source);
        return result;
    }

    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get("owner", builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
}
