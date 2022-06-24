import Album from "../../models/album.model.js";

export const getAllAlbum = async (req, res) => {
  try {
    const data = await Album.find()
      .populate("artist", { _id: 1, name: 1, artistImage: 1 })
      .populate("genre", { _id: 1, title: 1 })
      .populate("originCountry", { _id: 1, countryName: 1 })
      .sort({ createdAt: "desc" });

    if (data.length > 0) {
      res.status(200).send({
        message: "Albums Fetched",
        data: data,
        status: true,
      });
    } else {
      res.status(200).send({
        message: "No Albums Found",
        data: data,
        status: true,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Error Fetching Album",
      error,
      status: false,
    });
  }
};

export const getAlbumByArtist = async (req, res) => {
  try {
    const id = req.query.artistId;
    const data = await Album.find({ artist: id })
      .populate("artist", { _id: 1, name: 1, artistImage: 1 })
      .populate("genre", { _id: 1, title: 1 })
      .populate("originCountry", { _id: 1, countryName: 1 })
      .sort({ createdAt: "desc" });

    if (data.length > 0) {
      res.status(200).send({
        message: "Albums Fetched",
        data: data,
        status: true,
      });
    } else {
      res.status(200).send({
        message: "No Albums Found",
        data: data,
        status: true,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Error Fetching Album",
      error,
      status: false,
    });
  }
};

export const getAlbumByGenre = async (req, res) => {
  try {
    const id = req.query.genreId;
    const data = await Album.find({ genre: id })
      .populate("artist", { _id: 1, name: 1, artistImage: 1 })
      .populate("genre", { _id: 1, title: 1 })
      .populate("originCountry", { _id: 1, countryName: 1 })
      .sort({ createdAt: "desc" });

    if (data.length > 0) {
      res.status(200).send({
        message: "Albums Fetched",
        data: data,
        status: true,
      });
    } else {
      res.status(200).send({
        message: "No Albums Found",
        data: data,
        status: true,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Error Fetching Album",
      error,
      status: false,
    });
  }
};

export const addAlbum = async (req, res) => {
  const data = req.body;
  const newData = new Album(data);

  try {
    await newData.save();
    res.status(201).json({
      message: "Album has been created successfully!",
      data: newData,
      status: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Album Couldn't be added! Try again.",
      error,
      status: false,
    });
  }
};

export const updateAlbum = async (req, res) => {
  const { id: _id } = req.params;
  const data = req.body;

  try {
    const isData = await Album.findById({ _id });
    if (isData) {
      const updatedData = await Album.findByIdAndUpdate(
        _id,
        { ...data, _id },
        { new: true }
      );
      res.status(201).send({
        data: updatedData,
        status: true,
        message: "Album updated  sucessfully",
      });
    } else {
      res.status(401).send({
        message: "Album not found.",
        status: false,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Album couldn't be updated! Try again.",
      error,
      status: false,
    });
  }
};

export const deleteAlbum = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Album.findById({ _id: id });
    if (data) {
      await Album.findByIdAndDelete(id);
      res.status(201).send({
        message: "Album deleted  sucessfully",
        status: true,
      });
    } else {
      res.status(401).send({
        message: "Album not found.",
        status: false,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Album couldn't be deleted! Try again.",
      error,
      status: false,
    });
  }
};

export const deleteMultipleAlbum = async (req, res) => {
  const { selectedRows } = req.body;

  try {
    if (selectedRows.length > 0) {
      Album.deleteMany({ _id: { $in: selectedRows } })
        .exec()
        .then((result) => {
          res.status(201).json({
            message: "Selected albums deleted sucessfully",
            status: true,
          });
        })
        .catch((error) => {
          res.json({
            message: "Selected albums could not be deleted. Try again!",
            error,
            status: false,
          });
        });
    } else {
      res.status(400).json({
        message: "Albums not found",
        error,
        status: false,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Selected albums could not be deleted. Try again!",
      error,
      status: false,
    });
  }
};
