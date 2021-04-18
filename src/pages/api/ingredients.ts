import type { NextApiRequest, NextApiResponse } from "next";
import SearchResult from "../../models/SearchResult";

// created api page to hide the api key on requests. preferably real api should be used.
export default async (
  req: NextApiRequest,
  res: NextApiResponse<SearchResult | any>
) => {
  const { search } = req.query;
  try {
    const result = await fetch(
      `https://api.spoonacular.com/food/ingredients/search?query=${search}&apiKey=${process.env.API_KEY}`
    );
    const data = await result.json();
    res.status(200).json(data);
  } catch (error) {
    // this error comes when making a search with non english words such as "şğü"
    res.status(500).json({
      code: 500,
      message: "UNKNOWN API ERROR",
      status: "failure",
    });
  }
};
