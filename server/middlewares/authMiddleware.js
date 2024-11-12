//my task

import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract JWT token from Authorization header

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;  // Attach the decoded user info to the request object
        next();  // Allow the request to continue
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default authenticateUser;

