import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();

router.get('/users', UserController.findMany);
router.get('/users/:id', UserController.findById);
router.post('/users', UserController.create);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

export default router;