import Contact from "../models/Contact.js";
import User from "../models/User.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    console.log(users);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Users not found" });
    }
    return res.status(200).json({ message: users });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: user });
  } catch (err) {
    next(err);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteContactById = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    // const id = req.params.id;
    // const updatedUserData = req.body;
    // const updatedData = await User.updateOne({ id }, { $set: updatedUserData });
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({ message: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    console.log(contacts);
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "Contacts not found" });
    }
    return res.status(200).json({ message: contacts });
  } catch (err) {
    next(err);
  }
};
