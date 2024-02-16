import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTonConnect } from "../hooks/useTonConnect";
import { CHAIN, TonConnectButton } from "@tonconnect/ui-react";

import "@twa-dev/sdk";

function Header() {
  const { network } = useTonConnect();

  return (
    <AppBar position="static">
      <Toolbar>
        <TonConnectButton />
        {
          network == null ? "" : 
          <Typography marginLeft={"10px"}>
            {network == CHAIN.MAINNET ? "mainnet" : "testnet"}
          </Typography>
        }
      </Toolbar>
    </AppBar>
  );
}

export default Header;
