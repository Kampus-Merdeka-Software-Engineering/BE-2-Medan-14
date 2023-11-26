import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"],
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"],
            },
            where: {
                id: req.params.id,
            },
        });

        if (!response) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createUser = async (req, res) => {
    const { name, phone, email, password, role, photo } = req.body;

    const hashPassword = await argon2.hash(password);

    try {
        await Users.create({
            name: name,
            phone: phone,
            email: email,
            password: hashPassword,
            role: role,
            photo: photo,
        });

        res.status(201).json({ msg: "User created successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const updateUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    const { name, phone, email, password, role, photo } = req.body;
    let hashPassword;

    if (password) {
        hashPassword = await argon2.hash(password);
    } else {
        hashPassword = undefined;
    }

    try {
        await Users.update(
            {
                name: name,
                phone: phone,
                email: email,
                password: hashPassword,
                role: role,
                photo: photo,
            },
            {
                where: {
                    id: user.id,
                },
            }
        );
        res.status(200).json({ msg: "User updated successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    try {
        await Users.destroy({
            where: {
                id: user.id,
            },
        });
        res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
