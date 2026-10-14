import { Router } from "express";
import {
  createPlayer,
  getPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
} from "../services/playerService";

const router = Router();

// GET ALL PLAYERS
router.get("/", async (_req, res) => {
  try {
    const players = await getPlayers();

    return res.status(200).json(players);
  } catch (error) {
    console.error("Error fetching players:", error);

    return res.status(500).json({
      error: "Failed to fetch players",
    });
  }
});

// GET PLAYER BY ID
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "Invalid player ID",
    });
  }

  try {
    const player = await getPlayerById(id);

    if (!player) {
      return res.status(404).json({
        error: "Player not found",
      });
    }

    return res.status(200).json(player);
  } catch (error) {
    console.error("Error fetching player:", error);

    return res.status(500).json({
      error: "Failed to fetch player",
    });
  }
});

// CREATE PLAYER
router.post("/", async (req, res) => {
  const { name, rating } = req.body ?? {};

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      error: "Player name is required",
    });
  }

  if (
    typeof rating !== "number" ||
    !Number.isInteger(rating) ||
    rating < 0 ||
    rating > 99
  ) {
    return res.status(400).json({
      error: "Rating must be an integer between 0 and 99",
    });
  }

  try {
    const player = await createPlayer(name.trim(), rating);

    return res.status(201).json(player);
  } catch (error) {
    console.error("Error creating player:", error);

    return res.status(500).json({
      error: "Failed to create player",
    });
  }
});

// UPDATE PLAYER
router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "Invalid player ID",
    });
  }

  const { name, rating } = req.body ?? {};

  if (name === undefined && rating === undefined) {
    return res.status(400).json({
      error: "Provide a name or rating to update",
    });
  }

  if (name !== undefined && (typeof name !== "string" || !name.trim())) {
    return res.status(400).json({
      error: "Player name must be a non-empty string",
    });
  }

  if (
    rating !== undefined &&
    (typeof rating !== "number" ||
      !Number.isInteger(rating) ||
      rating < 0 ||
      rating > 99)
  ) {
    return res.status(400).json({
      error: "Rating must be an integer between 0 and 99",
    });
  }

  try {
    const existingPlayer = await getPlayerById(id);

    if (!existingPlayer) {
      return res.status(404).json({
        error: "Player not found",
      });
    }

    const player = await updatePlayer(id, {
      ...(name !== undefined && { name: name.trim() }),
      ...(rating !== undefined && { rating }),
    });

    return res.status(200).json(player);
  } catch (error) {
    console.error("Error updating player:", error);

    return res.status(500).json({
      error: "Failed to update player",
    });
  }
});

// DELETE PLAYER
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "Invalid player ID",
    });
  }

  try {
    const existingPlayer = await getPlayerById(id);

    if (!existingPlayer) {
      return res.status(404).json({
        error: "Player not found",
      });
    }

    await deletePlayer(id);

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting player:", error);

    return res.status(500).json({
      error: "Failed to delete player",
    });
  }
});

export default router;
