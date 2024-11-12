//my task

import express from 'express';
import { joinGroupController, acceptRequestController, rejectRequestController, removeMemberController, leaveGroupController } from '../controllers/groupController.js';
import authenticateUser from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to join a group (send a join request)
router.post('/groups/:groupId/join', authenticateUser, joinGroupController);

// Route to accept a join request
router.post('/groups/:groupId/requests/:userId/accept', authenticateUser, acceptRequestController);

// Route to reject a join request
router.post('/groups/:groupId/requests/:userId/reject', authenticateUser, rejectRequestController);

// Route to remove a member from a group (only the owner can do this)
router.delete('/groups/:groupId/members/:userId', authenticateUser, removeMemberController);

// Route for a user to leave the group
router.delete('/groups/:groupId/leave', authenticateUser, leaveGroupController);

export default router;

