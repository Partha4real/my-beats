import Song from "../../models/song.model.js";

export const getAllSong = async (req, res) => {
    try {
        const data = await Song.find()
            .populate("artist", { _id: 1, name: 1, artistImage: 1 })
            .populate("featuredArtist", { _id: 1, name: 1, artistImage: 1 })
            .populate("album", { _id: 1, name: 1, albumPicture: 1 })
            .populate("genre", { _id: 1, title: 1 })
            .populate("originCountry", { _id: 1, countryName: 1 })
            .populate("tag", { _id: 1, title: 1 })
            .sort({ createdAt: "desc" });

        if (data.length > 0) {
            res.status(200).send({
                message: "Songs Fetched",
                data: data,
                status: true,
            });
        } else {
            res.status(200).send({
                message: "No Songs Found",
                data: data,
                status: true,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Error Fetching Song",
            error,
            status: false,
        });
    }
};

export const getSongByArtist = async (req, res) => {
    try {
        const id = req.query.artistId;
        const data = await Song.find({ artist: id })
            .populate("artist", { _id: 1, name: 1, artistImage: 1 })
            .populate("featuredArtist", { _id: 1, name: 1, artistImage: 1 })
            .populate("album", { _id: 1, name: 1, albumPicture: 1 })
            .populate("genre", { _id: 1, title: 1 })
            .populate("originCountry", { _id: 1, countryName: 1 })
            .populate("tag", { _id: 1, title: 1 })
            .sort({ createdAt: "desc" });

        if (data.length > 0) {
            res.status(200).send({
                message: "Songs Fetched",
                data: data,
                status: true,
            });
        } else {
            res.status(200).send({
                message: "No Songs Found",
                data: data,
                status: true,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Error Fetching Song",
            error,
            status: false,
        });
    }
};

export const getSongByAlbum = async (req, res) => {
    try {
        const id = req.query.albumID;
        const data = await Song.find({ album: id })
            .populate("artist", { _id: 1, name: 1, artistImage: 1 })
            .populate("featuredArtist", { _id: 1, name: 1, artistImage: 1 })
            .populate("album", { _id: 1, name: 1, albumPicture: 1 })
            .populate("genre", { _id: 1, title: 1 })
            .populate("originCountry", { _id: 1, countryName: 1 })
            .populate("tag", { _id: 1, title: 1 })
            .sort({ createdAt: "desc" });

        if (data.length > 0) {
            res.status(200).send({
                message: "Songs Fetched",
                data: data,
                status: true,
            });
        } else {
            res.status(200).send({
                message: "No Songs Found",
                data: data,
                status: true,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Error Fetching Song",
            error,
            status: false,
        });
    }
};

export const getSongByGenre = async (req, res) => {
    try {
        const id = req.query.genreId;
        const data = await Song.find({ genre: id })
            .populate("artist", { _id: 1, name: 1, artistImage: 1 })
            .populate("featuredArtist", { _id: 1, name: 1, artistImage: 1 })
            .populate("album", { _id: 1, name: 1, albumPicture: 1 })
            .populate("genre", { _id: 1, title: 1 })
            .populate("originCountry", { _id: 1, countryName: 1 })
            .populate("tag", { _id: 1, title: 1 })
            .sort({ createdAt: "desc" });

        if (data.length > 0) {
            res.status(200).send({
                message: "Songs Fetched",
                data: data,
                status: true,
            });
        } else {
            res.status(200).send({
                message: "No Songs Found",
                data: data,
                status: true,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Error Fetching Song",
            error,
            status: false,
        });
    }
};

export const addSong = async (req, res) => {
    const data = req.body;
    let newData = new Song(data);
    //   newData = await Song.populate(newData, "type");
    try {
        await newData.save();
        res.status(201).json({
            message: "Song has been created successfully!",
            data: newData,
            status: true,
        });
    } catch (error) {
        res.status(400).send({
            message: "Song Couldn't be added! Try again.",
            error,
            status: false,
        });
    }
};

export const updateSong = async (req, res) => {
    const { id: _id } = req.params;
    const data = req.body;

    try {
        const isData = await Song.findById({ _id });
        if (isData) {
            const updatedData = await Song.findByIdAndUpdate(_id, { ...data, _id }, { new: true });
            res.status(201).send({
                data: updatedData,
                status: true,
                message: "Song updated  sucessfully",
            });
        } else {
            res.status(401).send({
                message: "Song not found.",
                status: false,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Song couldn't be updated! Try again.",
            error,
            status: false,
        });
    }
};

export const deleteSong = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await Song.findById({ _id: id });
        if (data) {
            await Song.findByIdAndDelete(id);
            res.status(201).send({
                message: "Song deleted  sucessfully",
                status: true,
            });
        } else {
            res.status(401).send({
                message: "Song not found.",
                status: false,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Song couldn't be deleted! Try again.",
            error,
            status: false,
        });
    }
};

export const deleteMultipleSong = async (req, res) => {
    const { selectedRows } = req.body;

    try {
        if (selectedRows.length > 0) {
            Song.deleteMany({ _id: { $in: selectedRows } })
                .exec()
                .then((result) => {
                    res.status(201).json({
                        message: "Selected songs deleted sucessfully",
                        status: true,
                    });
                })
                .catch((error) => {
                    res.json({
                        message: "Selected songs could not be deleted. Try again!",
                        error,
                        status: false,
                    });
                });
        } else {
            res.status(400).json({
                message: "Songs not found",
                error,
                status: false,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Selected songs could not be deleted. Try again!",
            error,
            status: false,
        });
    }
};
