import userService from '../services/userService';

class UserController {

    async create(ctx) {
        const user = ctx.request.body;
        const nickname = ctx.params['nickname'];

        console.log(user);

        const [newUser, conflictUsers] = await userService.create(user);

        if (newUser === null) {
            ctx.body = conflictUsers;
            ctx.status = 409;
            return;
        }

        ctx.body = newUser;
        ctx.status = 201;
    }

    async update(ctx) {
        const user = ctx.request.body;
        const nickname = ctx.params['nickname'];

        const [status, updatedUser] = await userService.update(nickname, user);

        ctx.body = updatedUser;
        ctx.status = status;
    }

    async get(ctx) {
        const login = ctx.params['login'];

        const [status, result] = await userService.get(login);

        ctx.body = result;
        ctx.status = status;
    }
}

const userController = new UserController();
export default userController;