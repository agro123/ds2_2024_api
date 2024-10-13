export const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

const User = {
    getAllUsers: () => users,
    getUserById: (id) => users.find(user => user.id === id),
    createUser: (user) => {
        user.id = users.length + 1;
        users.push(user);
        return user;
    },
    updateUser: (id, updatedUser) => {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...updatedUser };
            return users[index];
        }
        return null;
    },
    deleteUser: (id) => {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            const deletedUser = users.splice(index, 1);
            return deletedUser[0];
        }
        return null;
    }
};

export default User;