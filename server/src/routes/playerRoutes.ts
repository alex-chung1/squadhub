import { Router } from 'express';
import { createPlayer, getPlayers } from '../services/playerService';

const router = Router();

router.post('/', async (req, res) => {
  const { name, rating } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({
      error: 'Name is required',
    });
  }

  const player = await createPlayer(name, rating);

  return res.status(201).json(player);
});

router.get('/', async (_req, res) => {
  const players = await getPlayers();

  return res.json(players);
});

export default router;
