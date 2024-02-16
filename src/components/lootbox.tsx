import {
  Box,
  Button,
  CardContent,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useLootBoxContract } from "../hooks/useLootBoxContract";
import { useEffect, useState } from "react";
import { UserStats } from "../contracts/lootBoxContract";
import { fromNano } from "@ton/core";

function LootBox() {
  const {
    isOwner,
    userStats,
    globalStats,
    sendPlay,
    sendTopUpBalance,
    sendWithdraw,
  } = useLootBoxContract();

  const [amount, setAmount] = useState("");
  const [userStatsCache, setUserStatsCache] = useState<UserStats | null>(null);
  const [isOwnerCache, setIsOwnerCache] = useState<boolean>();
  const [globalStatsCache, setGlobalStatsCache] = useState<UserStats | null>(
    null
  );

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handlePlayButtonClick = (_event: React.MouseEvent) => {
    sendPlay(amount);
  };

  const handleWithdrawButtonClick = (_event: React.MouseEvent) => {
    sendWithdraw();
  };

  const handleTopUpBalanceButtonClick = (_event: React.MouseEvent) => {
    sendTopUpBalance(amount);
  };

  useEffect(() => {
    if (globalStats != null) {
      setGlobalStatsCache(globalStats);
    }
    if (userStats != null) {
      setUserStatsCache(userStats);
    }
    if (isOwner != null) {
      setIsOwnerCache(isOwner);
    }
  }, [globalStats, userStats, isOwnerCache]);

  return (
    <>
      <Box paddingTop={10}>
        <TextField
          label="Amount"
          variant="outlined"
          type="number"
          onChange={handleAmountChange}
          sx={{ input: { color: "var(--tg-theme-text-color)" } }}
          style={{ marginRight: 10, height: 50  }}
          focused
        />
        <Button
          variant="contained"
          onClick={handlePlayButtonClick}
          style={{ marginRight: 10, height: 50  }}
        >
          Play
        </Button>
        <Button
          variant="contained"
          onClick={handleTopUpBalanceButtonClick}
          disabled={!isOwnerCache}
          style={{ marginRight: 10, height: 50  }}
        >
          Top up
        </Button>
        <Button
          variant="contained"
          onClick={handleWithdrawButtonClick}
          disabled={!isOwnerCache}
          style={{ marginRight: 10, height: 50 }}
        >
          Withdraw
        </Button>
      </Box>

      <Grid container spacing={4} padding={5}>
        {userStatsCache != null ? (
          <Grid item>
            <Paper style={{ width: 200, textAlign: "center", padding: 10 }}>
              <Typography variant="h6" color="secondary">
                User
              </Typography>

              <Typography>
                Biggest Win: {fromNano(userStatsCache.biggestWin)} TON{" "}
              </Typography>
              <Typography>
                #{userStatsCache.counter.toString()} Last Win:{" "}
                {fromNano(userStatsCache.lastWin)} TON
              </Typography>
            </Paper>
          </Grid>
        ) : (
          ""
        )}

        {globalStatsCache != null ? (
          <Grid item>
            <Paper style={{ width: 200, textAlign: "center", padding: 10 }}>
              <Typography variant="h6" color="secondary">
                Global
              </Typography>
              <Typography>
                Biggest Win: {fromNano(globalStatsCache.biggestWin)} TON
              </Typography>
              <Typography>
                #{globalStatsCache.counter.toString()} Last Win:{" "}
                {fromNano(globalStatsCache.lastWin)} TON
              </Typography>
            </Paper>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
}

export default LootBox;
