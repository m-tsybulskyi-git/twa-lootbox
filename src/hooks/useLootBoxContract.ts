import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract, toNano } from "@ton/core";

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
        globalStats: await lootBoxContract.getGlobalStats(),
        userStats: await lootBoxContract?.getUserStats(Address.parse(wallet!!))
      };
    },
    { refetchInterval: 3000 }
  );

  return {
    globalStats: isFetching ? null : data?.globalStats,
    userStats: isFetching ? null : data?.userStats,
    sendPlay: (amount: string) => {
      return lootBoxContract?.send(sender, { value: toNano(amount) }, "play");
    },
  };
}
