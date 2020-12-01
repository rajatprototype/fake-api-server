#!/usr/bin/env node

const express = require('express');
const cli = require('./cli.js');

const PORT = Number(cli.get('port')) || 3000;

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// cors setup
if (!cli.isKeyExists("disable-cors")) {
    const options = {};

    // Set origin
    if (cli.isKeyExists('allow-origin')) {
        options['origin'] = cli.get('allow-origin');
    }

    // Set credentials
    if (cli.isKeyExists('allow-credentials')) {
        options['credentials'] = true;
    }

    // Set allowedHeaders
    if (cli.isKeyExists('allow-headers')) {
        options['allowedHeaders'] = cli.get('allow-headers');
    }

    // Set methods
    if (cli.isKeyExists('allow-methods')) {
        options['methods'] = cli.get('allow-methods');
    }

    // Set maxAge
    if (cli.isKeyExists('max-age')) {
        options['maxAge'] = cli.get('max-age');
    }

    app.use(require('cors')(options));
}

/**
 * @route /users
 */
app.use('/users', require('./routes/users'));

app.use((req, res) => {
    res.status(404).json({
        message: `Unknown ${req.url} route`
    })
})

app.listen(PORT, () => {
    console.log(`Server running at ${'\x1b[36m'}http://localhost:${PORT}${'\x1b[0m'}`);
})