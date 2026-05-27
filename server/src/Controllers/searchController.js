import ollama from "ollama";





export const SearchController = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

 
  

    res.json({ embeddings: embedings });

  } catch (error) {
    console.error("Error in SearchController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
