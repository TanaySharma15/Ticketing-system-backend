const express = require('express')
const {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicket,
    deleteTicket
} = require('../controller/ticketController'); // Create this controller
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Protected routes for creating, updating, and deleting tickets
router.post('/', createTicket);
router.get('/',authenticateToken, getAllTickets);
router.get('/:id', getTicketById);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);

module.exports = router;
