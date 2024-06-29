const homeController = async (req, res) => {
  try {
    return res.send("Home page is ready.......");
  } catch (error) {
    return console.log("Home controller error:", error);
  }
};

export { homeController };
