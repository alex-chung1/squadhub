import express from 'express';
import { generateTeams } from '../services/generateTeamService';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const playerIds: number[] = req.body.playerIds;

    if (!playerIds || playerIds.length < 2) {
      return res.status(400).json({
        message: 'At least 2 players are required.',
      });
    }

    const teams = await generateTeams(playerIds);

    return res.status(200).json(teams);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Failed to generate teams.',
    });
  }
});

export default router;
