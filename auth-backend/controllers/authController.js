import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { response } from "express";

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(500).json({
                message: "Email already in use",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully.",
        });
    } catch (error) {
        console.error("Error during signup", error);

        res.status(500).json({
            message: "Server error during signup",
        });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        res.json({
            token,
            user: {
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error during signin", error);
        res.status(500).json({
            message: "Server error during signin",
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.json({ user });
    } catch (error) {
        console.error("Error fetching profile", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

export const createUser = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        role,
        site,
        team,
        teamRole
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            message: 'User already exists'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        site,
        team,
        teamRole
    });

    res.status(201).json({
        message: 'User created successfully'
    });


};

export const getUsers = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalUsers = await User.countDocuments();
    const sortField = req.query.sort || 'firstName';
    const sortOrder = req.query.order === 'desc' ? -1 : 1;
    const users = await User.find()
        .sort({
            [sortField]: sortOrder
        })
        .skip(skip)
        .limit(limit);

    res.status(200).json({
        users,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers
    });


};

export const deleteUser = async (req, res) => {

    await User.findByIdAndDelete(
        req.params.id
    );

    res.status(200).json({
        message: 'User deleted successfully'
    });

};

//update user
export const updateUser = async (req, res) => {
    const updateData = { ...req.body };
    if (updateData.password) {
        updateData.password = await bcrypt.hash(
            updateData.password,
            10
        );
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
            new: true
        }
    );
    res.status(200).json(updatedUser);
};