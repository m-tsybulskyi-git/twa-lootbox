import { Box, Button, TextField, Typography } from "@mui/material";
import { useLootBoxContract } from "../hooks/useLootBoxContract";
import { useEffect, useState } from "react";
import { UserStats } from "../contracts/lootBoxContract";
import { fromNano } from "@ton/core";

function LootBox() {
  const { userStats, globalStats, sendPlay } = useLootBoxContract();

  const [amount, setAmount] = useState("");
  const [userStatsCache, setUserStatsCache] = useState<UserStats | null>(null);
  const [globalStatsCache, setGlobalStatsCache] = useState<UserStats | null>(
    null
  );

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handlePlayButtonClick = (_event: React.MouseEvent) => {
    sendPlay(amount);
  };

  useEffect(() => {
    if (globalStats != null) {
      setGlobalStatsCache(globalStats);
    }
    if (userStats != null) {
      setUserStatsCache(userStats);
    }
  }, [globalStats, userStats]);

  return (
    <>
      <Box paddingTop={10}>
        <TextField
          label="Amount"
          variant="outlined"
          type="number"
          onChange={handleAmountChange}
          style={{ marginRight: 10 }}
        />
        <Button variant="contained" onClick={handlePlayButtonClick}>
          Play!
        </Button>
      </Box>
      <Box paddingTop={2}>
        {userStatsCache != null ? (
          <Typography paddingBottom={2}>
            User Stats {userStatsCache.counter.toString()}: <tr />
            biggest win - {fromNano(userStatsCache.biggestWin)} TON <tr />
            last win - {fromNano(userStatsCache.lastWin)} TON
          </Typography>
        ) : (
          ""
        )}
        
        {globalStatsCache != null ? (
          <Typography >
            Global Stats {globalStatsCache.counter.toString()}: <tr />
            biggest win - {fromNano(globalStatsCache.biggestWin)} TON <tr />
            last win - {fromNano(globalStatsCache.lastWin)} TON
          </Typography>
        ) : (
          ""
        )}
      </Box>
    </>
  );
}

export default LootBox;
