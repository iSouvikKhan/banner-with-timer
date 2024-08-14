const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();
app.use(cors())
const prisma = new PrismaClient();

app.use(bodyParser.json());

// POST route to create a new entry
app.post('/entry', async (req, res) => {
    const { description, url, providedDatetime } = req.body;

    try {
        const newEntry = await prisma.entry.create({
            data: {
                description,
                url,
                providedDatetime: new Date(providedDatetime)
            },
        });
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create entry' });
    }
});

// GET route to retrieve all entries
app.get('/entries', async (req, res) => {
    try {
        const latestEntry = await prisma.entry.findFirst({
            orderBy: {
                id: 'desc'
            }
        });
        if (latestEntry) {
            res.json(latestEntry);
        } else {
            res.status(404).json({ message: 'No entries found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve the latest entry' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});