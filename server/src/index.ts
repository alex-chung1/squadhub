import express from "express";
import playerRoutes from "./routes/playerRoutes";
import generateTeamRoutes from "./routes/generateTeamRoutes";

const app = express();

app.use(express.json());

app.use("/players", playerRoutes);
app.use("/teams", generateTeamRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
