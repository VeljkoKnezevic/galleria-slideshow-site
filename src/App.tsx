import { useState } from "react";
import "./styles/styles.scss";
import { DataTypes } from "./DataTypes";
import Header from "./components/Header";
import Painting from "./components/Painting";

const App = () => {
  const [data, setData] = useState<DataTypes>();

  return (
    <>
      <Header />
      <main className="main">
        <Painting data={data} setData={setData} />
      </main>
    </>
  );
};

export default App;
