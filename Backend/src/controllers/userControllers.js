export function getUserId(req, res) {
    const id = req.params.id;
    res.send(`User ID is: ${id}`);
}

export function getAllUsers(req, res) {
    res.send('List of all users');
}
