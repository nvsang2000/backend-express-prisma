
import { Router } from 'express';
import AuthController from '../../controllers/authController'

const router = Router();

router.get('/login', AuthController.login);


export default router;