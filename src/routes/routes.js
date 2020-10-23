import Router from 'koa-router';
import userController from '../controllers/UserController';

const router = new Router();

router.post('/api/user/create', userController.create);
router.post('/api/user/:nickname/profile', userController.update);
router.get('/api/user/:nickname/profile', userController.get);
router.get('/', (ctx) => {
    ctx.body = {lol: 'kek'};
    ctx.status = 200;
});

export default router;