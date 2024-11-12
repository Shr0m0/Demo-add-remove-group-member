//my task

import { joinGroup, acceptRequest, rejectRequest, removeMember, leaveGroup } from '../models/groupModel.js';
import authenticateUser from '../middlewares/authMiddleware.js';  // Middleware to authenticate user

// Add user to a group by sending a join request
export const joinGroupController = async (req, res) => {
    const { groupId } = req.params;
    const userId = req.user.id;  // User's ID from the JWT token

    try {
        const membership = await joinGroup(groupId, userId);
        res.status(201).json(membership);  // Successfully added
    } catch (error) {
        res.status(500).json({ error: 'Error while sending join request' });
    }
};

// Accept a user's join request
export const acceptRequestController = async (req, res) => {
    const { groupId, userId } = req.params;

    try {
        const updatedMembership = await acceptRequest(groupId, userId);
        res.status(200).json(updatedMembership);  // Successfully accepted
    } catch (error) {
        res.status(500).json({ error: 'Error while accepting request' });
    }
};

// Reject a user's join request
export const rejectRequestController = async (req, res) => {
    const { groupId, userId } = req.params;

    try {
        await rejectRequest(groupId, userId);
        res.status(200).json({ message: 'Request rejected' });  // Successfully rejected
    } catch (error) {
        res.status(500).json({ error: 'Error while rejecting request' });
    }
};

// Remove a member from the group (only the owner can do this)
export const removeMemberController = async (req, res) => {
    const { groupId, userId } = req.params;
    const ownerId = req.user.id;  // Owner's ID from JWT

    // Check if the requester is the owner
    if (ownerId !== req.user.id) {
        return res.status(403).json({ error: 'You are not authorized to remove members' });
    }

    try {
        await removeMember(groupId, userId);
        res.status(200).json({ message: 'Member removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error while removing member' });
    }
};

// User leaves the group (self-removal)
export const leaveGroupController = async (req, res) => {
    const { groupId } = req.params;
    const userId = req.user.id;  // User's ID from the JWT token

    try {
        await leaveGroup(groupId, userId);
        res.status(200).json({ message: 'Successfully left the group' });
    } catch (error) {
        res.status(500).json({ error: 'Error while leaving the group' });
    }
};


