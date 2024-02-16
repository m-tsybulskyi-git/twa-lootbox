import Container from "@mui/material/Container";

import Header from "./components/header";
import LootBox from "./components/lootbox";

function App() {
  return (
    <Container maxWidth="sm">
      <Header />
      <LootBox />
    </Container>
  );
}

export default App;
