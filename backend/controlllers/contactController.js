import Contact from "../models/Contact.js";

export const contact = async (req, res) => {
  try {
    await Contact.create(req.body);
    return res.status(200).json({ message: "message send successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "message not delivered!" });
  }
};
