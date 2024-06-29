import { Contact } from "../models/contact.model.js";

const contactController = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({ massage: "massage send successfully." });
  } catch (error) {
    return res.status(401).json({ massage: "massage not delivered." });
  }
};

export { contactController };
