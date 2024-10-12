const express = require('express')
const {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicket,
    deleteTicket
} = require('../controller/ticketController'); 
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();


router.post('/', createTicket);
router.get('/',authenticateToken, getAllTickets);
router.get('/:id', getTicketById);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);

module.exports = router;
