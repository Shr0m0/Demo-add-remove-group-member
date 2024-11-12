//my task

import { pool } from '../helper/db.js';

// Add user to the group (send join request)
export const joinGroup = async (groupId, userId) => {
    const result = await pool.query(
        'INSERT INTO groupMembers (users_id, role, group_id, status) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId, 'member', groupId, 0]  // '0' represents 'pending'
    );
    return result.rows[0];
};

// Accept a join request
export const acceptRequest = async (groupId, userId) => {
    const result = await pool.query(
        'UPDATE groupMembers SET status = $1 WHERE group_id = $2 AND users_id = $3 AND status = $4 RETURNING *',
        [1, groupId, userId, 0]  // Update status to 'accepted' (1) from 'pending' (0)
    );
    return result.rows[0];
};

// Reject a join request
export const rejectRequest = async (groupId, userId) => {
    await pool.query(
        'UPDATE groupMembers SET status = $1 WHERE group_id = $2 AND users_id = $3 AND status = $4',
        [-1, groupId, userId, 0]  // Update status to 'rejected' (-1)
    );
};

// Remove a member from the group (Only the owner can do this)
export const removeMember = async (groupId, userId) => {
    await pool.query(
        'DELETE FROM groupMembers WHERE group_id = $1 AND users_id = $2 AND status = $3',
        [groupId, userId, 1]  // Only remove if the user is accepted (status = 1)
    );
};

// User leaves the group (self-removal)
export const leaveGroup = async (groupId, userId) => {
    await pool.query(
        'DELETE FROM groupMembers WHERE group_id = $1 AND users_id = $2',
        [groupId, userId]  // User can leave regardless of their status
    );
};
