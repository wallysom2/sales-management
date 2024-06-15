import { Router } from 'express';
import { getSales, addSale, updateSaleById, deleteSaleById, getSalesPdf, getSalesByUserId, getSalesById } from '../controllers/salesController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticateToken);

router.get('/', getSales);
router.get('/pdf', getSalesPdf);
router.get('/:id', getSalesById);
router.get('/user/:userId', getSalesByUserId);
router.post('/', addSale); 
router.put('/:id', updateSaleById);
router.delete('/:id', deleteSaleById);

export default router;
