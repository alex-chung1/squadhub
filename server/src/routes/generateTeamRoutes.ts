import express from "express";
import { getSortedPlayers } from "../services/generateTeamService";
import { Player } from "../domain/Player";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const playerIds: number[] = req.body.playerIds;

    if (!playerIds || playerIds.length < 2) {
      return res.status(400).json({
        message: "At least 2 players are required.",
      });
    }

    const sortedPlayers: Player[] = await getSortedPlayers(playerIds);

    return res.status(200).json(sortedPlayers);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to sort players.",
    });
  }
});

export default router;
