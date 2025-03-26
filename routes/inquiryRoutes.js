const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { protect } = require('../middleware/authMiddleware');

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const inquiry = new Inquiry({ name, email, message });
        await inquiry.save();
        res.status(201).json({ message: 'Inquiry submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// router.delete('/:id', protect, async (req, res) => {
//     try {
//         await Inquiry.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Inquiry deleted' });
//     } catch (error) {
//         res.status(500).json({ error: 'Server Error' });
//     }
// });

router.delete('/:id',  async (req, res) => {
    try {
        await Inquiry.findByIdAndDelete(req.params.id);
        res.json({ message: 'Inquiry deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
