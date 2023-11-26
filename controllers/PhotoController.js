import Photos from "../models/PhotoModel.js";

export const getPhotos = async (req, res) => {
    try {
        const response = await Photos.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getPhotoById = async (req, res) => {
    try {
        const response = await Photos.findOne({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            where: {
                id: req.params.id,
            },
        });

        if (!response) {
            return res.status(404).json({ msg: "Photo not found" });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createPhoto = async (req, res) => {
    const { roomId, photo } = req.body;

    try {
        await Photos.create({
            roomId: roomId,
            photo: photo,
        });

        res.status(201).json({ msg: "Photo created successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const updatePhoto = async (req, res) => {
    const picture = await Photos.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!picture) {
        return res.status(404).json({ msg: "Photo not found" });
    }

    const { roomId, photo } = req.body;

    try {
        await Photos.update(
            {
                roomId: roomId,
                photo: photo,
            },
            {
                where: {
                    id: picture.id,
                },
            }
        );

        res.status(200).json({ msg: "Photo updated successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deletePhoto = async (req, res) => {
    const picture = await Photos.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!picture) {
        return res.status(404).json({ msg: "Photo not found" });
    }

    try {
        await Photos.destroy({
            where: {
                id: picture.id,
            },
        });

        res.status(200).json({ msg: "Photo deleted successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
