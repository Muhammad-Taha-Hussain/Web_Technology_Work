// controllers/productController.js
import Jw_Products from '../models/Jw_Products.js';

export const searchProducts = async (req, res) => {
  try {
    const {
      query,         // text to search in name/description
      section,
      category,      // filter: men, women, kids
      minPrice,      // filter: minimum price
      maxPrice,      // filter: maximum price
      sizes,         // filter: sizes ["S", "M"]
      colors,        // filter: colors ["red", "blue"]
      sortBy,        // sort by 'price' or 'createdAt'
      sortOrder,     // 'asc' or 'desc'
      exactMatch = 'false',    // if true, perform exact match
      page = 1,      // pagination: page number
      limit = 10     // pagination: results per page
    } = req.query;

    const filter = {};

    // 1. Text Search (name + description)
    if (query) {
      if (exactMatch === 'true') {
        // Exact match
        filter.$or = [
          { name: query },
          { description: query }
        ];
      } else {
        // Regex (partial/inner text) search (case insensitive)
        // filter.$or = [
        //   { name: { $regex: query, $options: 'i' } },
        //   { description: { $regex: query, $options: 'i' } }
        // ];
        const words = query.split(' ').filter(Boolean); // Split and remove empty
        filter.$or = words.flatMap(word => ([
          { name: { $regex: word, $options: 'i' } },
          { description: { $regex: word, $options: 'i' } }
        ]));
      }
    }

    // if (section && section !== 'home' && section !== 'all') {
    //   filter.category = section;
    // }

    // 1. Category Filter
    if (category) {
      filter.category = category;
    }

    // 3. Price Range Filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // 4. Sizes Filter (at least one size should match)
    if (sizes) {
      const sizesArray = Array.isArray(sizes) ? sizes : [sizes];
      filter.sizes = { $in: sizesArray };
    }

    // 5. Colors Filter (at least one color should match)
    if (colors) {
      const colorsArray = Array.isArray(colors) ? colors : [colors];
      filter.colors = { $in: colorsArray };
    }

    // 6. Sorting
    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    // 7. Pagination
    const skip = (page - 1) * limit;

    // Fetch products
    const products = await Jw_Products.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const total = await Jw_Products.countDocuments(filter);

    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      products
    });

  } catch (error) {
    console.error('Advanced Search Error:', error);
    res.status(500).json({ message: "Internal server error." });
  }
};
