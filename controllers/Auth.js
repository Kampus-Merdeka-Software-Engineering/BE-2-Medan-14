import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
    if (req.session.userId) {
        return res.status(401).json({ msg: "Please logout to your account" });
    }

    const user = await Users.findOne({
        where: {
            email: req.body.email,
        },
    });

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    const validPassword = await argon2.verify(user.password, req.body.password);
    if (!validPassword) {
        return res.status(400).json({ msg: "Invalid password" });
    }

    req.session.userId = user.id;

    const id = user.id;
    const name = user.name;
    const phone = user.phone;
    const email = user.email;
    const role = user.role;
    const photo = user.photo;

    res.status(200).json({ id, name, phone, email, role, photo });
};

export const Me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Please login to your account" });
    }

    const user = await Users.findOne({
        attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
        },
        where: {
            id: req.session.userId,
        },
    });

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
};

export const Register = async (req, res) => {
    if (req.session.userId) {
        return res.status(401).json({ msg: "Please logout to your account" });
    }

    const { name, phone, email, password, confPassword } = req.body;

    if (!password || !confPassword) {
        return res.status(400).json({ msg: "Password is required" });
    }

    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password and confirm password do not match" });
    }

    const hashPassword = await argon2.hash(password);

    try {
        await Users.create({
            name: name,
            phone: phone,
            email: email,
            password: hashPassword,
        });
        res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const UpdateProfile = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Please login to your account" });
    }

    const { name, phone, email, password, confPassword, photo } = req.body;
    let curName, curPhone, curEmail, curPassword, curPhoto;

    if (name) {
        curName = name;
    } else {
        curName = undefined;
    }

    if (phone) {
        curPhone = phone;
    } else {
        curPhone = undefined;
    }

    if (email) {
        curEmail = email;
    } else {
        curEmail = undefined;
    }

    if (password || confPassword) {
        if (password !== confPassword) {
            return res.status(400).json({ msg: "Password and confirm password do not match" });
        }
        curPassword = await argon2.hash(password);
    } else {
        curPassword = undefined;
    }

    if (photo) {
        curPhoto = photo;
    } else {
        curPhoto = undefined;
    }

    try {
        await Users.update(
            {
                name: curName,
                phone: curPhone,
                email: curEmail,
                password: curPassword,
                photo: curPhoto,
            },
            {
                where: {
                    id: req.session.userId,
                },
            }
        );
        res.status(200).json({ msg: "User updated successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const Logout = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Please login to your account" });
    }

    req.session.destroy((err) => {
        if (err) {
            return res.status(400).json({ msg: err.message });
        }

        res.status(200).json({ msg: "Logout successfully" });
    });
};
