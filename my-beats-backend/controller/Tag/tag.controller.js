import Tag from "../../models/tag.model.js";

export const getAllTag = async (req, res) => {
    try {
        const data = await Tag.find().sort({ createdAt: "desc" });

        if (data.length > 0) {
            res.status(200).send({
                message: "Tags Fetched",
                data: data,
                status: true,
            });
        } else {
            res.status(200).send({
                message: "No Tags Found",
                data: data,
                status: true,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Error Fetching Tags",
            error,
            status: false,
        });
    }
};

export const addTag = async (req, res) => {
    const data = req.body;
    const newData = new Tag(data);

    try {
        await newData.save();
        res.status(201).json({
            message: "Tag has been created successfully!",
            data: newData,
            status: true,
        });
    } catch (error) {
        res.status(400).send({
            message: "Tag Couldn't be added! Try again.",
            error,
            status: false,
        });
    }
};

export const updateTag = async (req, res) => {
    const { id: _id } = req.params;
    const data = req.body;

    try {
        const isData = await Tag.findById({ _id });
        if (isData) {
            const updatedData = await Tag.findByIdAndUpdate(_id, { ...data, _id }, { new: true });
            res.status(201).send({
                data: updatedData,
                status: true,
                message: "Tag updated  sucessfully",
            });
        } else {
            res.status(401).send({
                message: "Tag not found.",
                status: false,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Tag couldn't be updated! Try again.",
            error,
            status: false,
        });
    }
};

export const deleteTag = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await Tag.findById({ _id: id });
        if (data) {
            await Tag.findByIdAndDelete(id);
            res.status(201).send({
                message: "Tag deleted  sucessfully",
                status: true,
            });
        } else {
            res.status(401).send({
                message: "Tag not found.",
                status: false,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Tag couldn't be deleted! Try again.",
            error,
            status: false,
        });
    }
};

export const deleteMultipleTag = async (req, res) => {
    const selectedRows = req.body;
    try {
        if (selectedRows.length > 0) {
            Tag.deleteMany({ _id: { $in: selectedRows } })
                .exec()
                .then((result) => {
                    res.status(201).json({
                        message: "Selected Tags deleted sucessfully",
                        status: true,
                    });
                })
                .catch((error) => {
                    res.json({
                        message: "Selected Tags could not be deleted. Try again!",
                        error,
                        status: false,
                    });
                });
        } else {
            res.status(400).json({
                message: "Tags not found",
                error,
                status: false,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Selected Tags could not be deleted. Try again!",
            error,
            status: false,
        });
    }
};
