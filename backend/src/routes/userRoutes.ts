import express from 'express';
import { getUserProfile,
        updateUserProfile,
        deleteUserProfile,
        getAllUsers
    } from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getAllUsers);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);
router.route('/profile').delete(protect, deleteUserProfile);

export default router;