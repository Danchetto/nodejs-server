import DataBaseService from './dbService';

class UserService extends DataBaseService {

    constructor() {
        super();
    }
  
    async create(user) {

        const conflicts = await this.dataBase.manyOrNone(
            `SELECT * from users WHERE LOWER(login) = '${user.login}';`
        ).catch(reason => console.log(reason));

        if (conflicts.length !== 0) {
            if (conflicts.length === 2 && conflicts[0].login === conflicts[1].login) {
                conflicts.pop();
            }

            return [null, conflicts]
        }

        const newUser = await this.dataBase.one(
            `INSERT INTO users (login, email, fullname, about)
             VALUES ('${user.login}', '${user.email}', '${user.fullname}', '${user.about}') 
             RETURNING *`
        ).catch(reason => console.log(reason));

        return [newUser, null]
    }

    async get(login) {
        console.log(`SELECT * FROM users WHERE LOWER(users.login) = '${login}';`);
        const user = await this.dataBase.many(
            `SELECT * FROM users WHERE LOWER(users.login) = '${login}';`
        );
        // console.log(user);
        if (!user) {
            return [404, {message: 'No user found'}];
        }

        return [200, user];
    }

    async update(userData) {
        const user = await this.dataBase.oneOrNone(
            `SELECT * from users WHERE LOWER(login) = LOWER('${login}');`
        );

        if (!user) {
            return [404, {message: 'No user found'}];
        }

        if (!Object.keys(userData).length) {
            return [200, user];
        }

        if (userData.email) {
            const conflictUser = await this.dataBase.oneOrNone(
                `SELECT * from users WHERE LOWER(email) = LOWER('${userData.email}');`
            );

            if (conflictUser) {
                return [409, {message: 'User with this email exists'}]
            }
        }

        const updatedUser = await this.dataBase.one(this.createUpdateRequest(login, userData))

        return [200, updatedUser];
    }

    createUpdateRequest(login, user) {
        // console.log(user);

        let request = `UPDATE users SET 
                       ${user.about ? `about='${user.about}',` : ''} 
                       ${user.email ? `email='${user.email}',` : ''}
                       ${user.fullname ? `fullname='${user.fullname}',` : ''}`;

        // console.log(request)
        // console.log(request.lastIndexOf(','))
        request = request.substr(0, request.lastIndexOf(','));
        // console.log(request)
        request += ` WHERE LOWER(users.login) = LOWER('${login}') RETURNING *;`;
        // console.log(request);
        return request;
    }
}

const userService = new UserService();
export default userService;