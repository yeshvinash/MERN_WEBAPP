import Service from "../models/Service.js";

export const services = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response) {
      res.status(400).json({ message: "No Service found!" });
      return;
    }
    return res.status(200).json({ message: response });
  } catch (error) {
    return res.status(500).json({ message: "message not delivered!" });
  }
};
