import Genre from "../../models/genre.model.js";

export const getAllGenre = async (req, res) => {
    try {
        const data = await Genre.find().sort({ createdAt: "desc" });

        if (data.length > 0) {
            res.status(200).send({
                message: "Genres Fetched",
                data: data,
                status: true,
            });
        } else {
            res.status(200).send({
                message: "No Genres Found",
                data: data,
                status: true,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Error Fetching Genre",
            error,
            status: false,
        });
    }
};

export const addGenre = async (req, res) => {
    const data = req.body;
    const newData = new Genre(data);
    try {
        await newData.save();
        res.status(201).json({
            message: "Genre has been created successfully!",
            data: newData,
            status: true,
        });
    } catch (error) {
        res.status(400).send({
            message: "Genre Couldn't be added! Try again.",
            error,
            status: false,
        });
    }
};

export const updateGenre = async (req, res) => {
    const { id: _id } = req.params;
    const data = req.body;

    try {
        const isData = await Genre.findById({ _id });
        if (isData) {
            const updatedData = await Genre.findByIdAndUpdate(_id, { ...data, _id }, { new: true });
            res.status(201).send({
                data: updatedData,
                status: true,
                message: "Genre updated  sucessfully",
            });
        } else {
            res.status(401).send({
                message: "Genre not found.",
                status: false,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Genre couldn't be updated! Try again.",
            error,
            status: false,
        });
    }
};

export const deleteGenre = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await Genre.findById({ _id: id });
        if (data) {
            await Genre.findByIdAndDelete(id);
            res.status(201).send({
                message: "Genre deleted  sucessfully",
                status: true,
            });
        } else {
            res.status(401).send({
                message: "Genre not found.",
                status: false,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Genre couldn't be deleted! Try again.",
            error,
            status: false,
        });
    }
};

export const deleteMultipleGenre = async (req, res) => {
    const selectedRows = req.body;

    try {
        if (selectedRows.length > 0) {
            Genre.deleteMany({ _id: { $in: selectedRows } })
                .exec()
                .then((result) => {
                    res.status(201).json({
                        message: "Selected genres deleted sucessfully",
                        status: true,
                    });
                })
                .catch((error) => {
                    res.json({
                        message: "Selected genres could not be deleted. Try again!",
                        error,
                        status: false,
                    });
                });
        } else {
            res.status(400).json({
                message: "Genres not found",
                error,
                status: false,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Selected genres could not be deleted. Try again!",
            error,
            status: false,
        });
    }
};
