import { Router } from 'express';
import UserController from '../../controllers/userController';
import { validateDto } from '~/middleware/validateDto';
import { CreateUserDto } from '~/dto/validator';

const router = Router();

router.get('/', UserController.findAll);
router.get('/:id', UserController.findById);
router.post('/', validateDto(CreateUserDto), UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

export default router;