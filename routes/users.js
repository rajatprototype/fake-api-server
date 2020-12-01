const { Router } = require('express');

/**
 * @type {Array<object>}
 */
let users = require('../data/users.json');

const routes = Router();

// Helper functions
function userExists(id) {
    return users.findIndex(user => user.id === id) !== -1;
}

/**
 * @route GET /
 */
routes.get('/', (req, res) => {
    res.status(200).json(users);
});

/**
 * @route GET /:userId
 */
routes.get('/:userId', (req, res) => {
    let { userId } = req.params;

    userId = Number(userId);

    const user = users.find(user => user.id === userId);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    res.status(200).json(user);
});

/**
 * @route POST /
 */
routes.post('/', (req, res) => {
    const payload = req.body || {};

    payload['id'] = payload['id'] || Date.now();

    // User existence
    if (userExists(payload['id'])) {
        return res.status(409).json({
            message: "User already exists"
        })
    }

    users.push(payload);

    return res.status(201).json({
        message: "User created",
        data: payload
    });
})

/**
 * @route PUT /:userId
 */
routes.put('/:userId', (req, res) => {
    const payload = req.body || {};

    let { userId } = req.params;

    userId = Number(userId);

    // User existence
    if (!userExists(userId)) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    // Assign updated properties
    users.find(user => {
        if (user.id === userId) {
            for (const prop in payload) {
                user[prop] = payload[prop];
            }
        }
    })

    return res.status(201).json({
        message: "User updated",
        data: payload
    });
})

/**
 * @route DELETE /:userId
 */
routes.delete('/:userId', (req, res) => {
    let { userId } = req.params;

    userId = Number(userId);

    if (!userExists(userId)) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    users = users.filter(user => user.id !== userId);

    res.status(200).json({
        message: "User has been deleted"
    })
})

module.exports  = routes;