import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract, address, toNano } from "@ton/core";

import { CHAIN } from "@tonconnect/protocol";
import { LootBoxContract } from "../contracts/lootBoxContract";

import { useQuery } from "@tanstack/react-query";

export function useLootBoxContract() {
  const { client } = useTonClient();
  const { sender, wallet, network } = useTonConnect();

  const lootBoxContract = useAsyncInitialize(async () => {
    if (!client) return;

    let contract_address = Address.parse(
      network == CHAIN.MAINNET
        ? "non-supported"
        : "EQBT3sMQIde-xWnAIQYiyCaRdDd19e_h6yQ7No7HNw741raf"
    );

    let contract = LootBoxContract.fromAddress(contract_address);
    return client.open(contract) as OpenedContract<LootBoxContract>;
  }, [client]);

  const { data, isFetching } = useQuery(
    ["stats"],
    async () => {
      if (!lootBoxContract) return null;
      return {
        owner: await lootBoxContract.getOwner(),
        globalStats: await lootBoxContract.getGlobalStats(),
        userStats: await lootBoxContract?.getUserStats(Address.parse(wallet!!)),
      };
    },
    { refetchInterval: 1000 }
  );

  let isOwner =
    wallet != null &&
    data?.owner.toString() == Address.parse(wallet!!).toString();

  return {
    isOwner: isFetching ? null : isOwner,
    globalStats: isFetching ? null : data?.globalStats,
    userStats: isFetching ? null : data?.userStats,
    sendPlay: (amount: string) => {
      lootBoxContract?.send(sender, { value: toNano(amount) }, "play");
    },
    sendTopUpBalance: (amount: string) => {
      lootBoxContract?.send(
        sender,
        { value: toNano(amount) },
        "top_up_balance"
      );
    },
    sendWithdraw: () => {
      lootBoxContract?.send(sender, { value: toNano(0.1) }, "withdraw");
    },
  };
}
