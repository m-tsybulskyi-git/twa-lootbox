import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTonConnect } from "../hooks/useTonConnect";
import { CHAIN, TonConnectButton } from "@tonconnect/ui-react";

import "@twa-dev/sdk";

function Header() {
  const { network } = useTonConnect();

  return (
    <AppBar>
      <Toolbar style={{display: "flex", justifyContent: "flex-end" }}>
        {network == null ? (
          ""
        ) : (
          <Typography>
            {network == CHAIN.MAINNET ? "mainnet" : "testnet"}
          </Typography>
        )}
        <TonConnectButton style={{paddingLeft: 20}}/>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
