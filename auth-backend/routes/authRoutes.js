import express from "express";
import { signup , signin, getProfile, createUser, getUsers, deleteUser, updateUser} from "../controllers/authController.js";
import {authenticateToken} from "../middleware/index.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile",authenticateToken,getProfile);
router.post('/users', createUser);
router.get('/users', authenticateToken, getUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);
router.get('/test-ip',(req, res) => {
    console.log('Request is successfull');
    res.status(200).json({ message: 'Request is successful' });
})

export default router;