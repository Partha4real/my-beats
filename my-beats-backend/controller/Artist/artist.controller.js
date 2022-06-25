import Artist from "../../models/artist.model.js";

export const getAllArtist = async (req, res) => {
    try {
        const data = await Artist.find().populate("genre", { _id: 1, title: 1 }).sort({ createdAt: "desc" });

        if (data.length > 0) {
            res.status(200).send({
                message: "Artists Fetched",
                data: data,
                status: true,
            });
        } else {
            res.status(403).send({
                message: "No Artists Found",
                data: data,
                status: true,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Error Fetching Artist",
            error,
            status: false,
        });
    }
};

export const getArtistByGenre = async (req, res) => {
    try {
        const id = req.query.genreId;
        const data = await Artist.find({ genre: id })
            .populate("genre", { _id: 1, title: 1 })
            .sort({ createdAt: "desc" });

        if (data.length > 0) {
            res.status(200).send({
                message: "Artists Fetched",
                data: data,
                status: true,
            });
        } else {
            res.status(200).send({
                message: "No Artists Found",
                data: data,
                status: true,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Error Fetching Artist",
            error,
            status: false,
        });
    }
};

export const addArtist = async (req, res) => {
    const data = req.body;
    const newData = new Artist(data);

    await Artist.populate(newData, { path: "genre" });

    try {
        await newData.save();
        res.status(201).json({
            message: "Artist has been created successfully!",
            data: newData,
            status: true,
        });
    } catch (error) {
        res.status(400).send({
            message: "Artist Couldn't be added! Try again.",
            error,
            status: false,
        });
    }
};

export const updateArtist = async (req, res) => {
    const { id: _id } = req.params;
    const data = req.body;

    try {
        const isData = await Artist.findById({ _id });
        if (isData) {
            const updatedData = await Artist.findByIdAndUpdate(_id, { ...data, _id }, { new: true });

            await Artist.populate(updatedData, { path: "genre" });

            res.status(201).send({
                data: updatedData,
                status: true,
                message: "Artist updated  sucessfully",
            });
        } else {
            res.status(401).send({
                message: "Artist not found.",
                status: false,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Artist couldn't be updated! Try again.",
            error,
            status: false,
        });
    }
};

export const deleteArtist = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await Artist.findById({ _id: id });
        if (data) {
            await Artist.findByIdAndDelete(id);
            res.status(201).send({
                message: "Artist deleted  sucessfully",
                status: true,
            });
        } else {
            res.status(401).send({
                message: "Artist not found.",
                status: false,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Artist couldn't be deleted! Try again.",
            error,
            status: false,
        });
    }
};

export const deleteMultipleArtist = async (req, res) => {
    const { selectedRows } = req.body;

    try {
        if (selectedRows.length > 0) {
            Artist.deleteMany({ _id: { $in: selectedRows } })
                .exec()
                .then((result) => {
                    res.status(201).json({
                        message: "Selected artists deleted sucessfully",
                        status: true,
                    });
                })
                .catch((error) => {
                    res.json({
                        message: "Selected artists could not be deleted. Try again!",
                        error,
                        status: false,
                    });
                });
        } else {
            res.status(400).json({
                message: "Artists not found",
                error,
                status: false,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Selected artists could not be deleted. Try again!",
            error,
            status: false,
        });
    }
};
