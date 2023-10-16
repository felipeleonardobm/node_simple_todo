import { Router } from 'express';
import * as ToDoController from '../controllers/todoController';

const router = Router();

router.get('/todo', ToDoController.todos);
router.post('/create', ToDoController.createTodo);
router.put('/update/:id', ToDoController.updateTodo);
router.delete('/delete/:id', ToDoController.deleteTodo);

export default router;