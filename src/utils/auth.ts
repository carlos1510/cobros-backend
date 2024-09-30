import bcrypt from 'bcryptjs';
const { SALT } = process.env;

function hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(Number(SALT));
    return bcrypt.hashSync(password, salt);
};

export {
    hashPassword,
}