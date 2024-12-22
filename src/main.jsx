import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Sample JSON data. Replace this with your API or file-based import.
import productsData from "./products.json";

const ProductsList = () => {
  // Initialize state for the categories and price change filter
  const [products, setProducts] = useState({
    HAM: [],
    "FRUIT COCKTAIL": [],
    CHEESE: [],
    "KESO DE BOLA": [],
    MAYONNAISE: [],
    "ALL PURPOSE CREAM": [],
    "SANDWICH SPREAD": [],
    "PASTA SPAGHETTI": [],
    "ELBOW MACARONI": [],
    "SALAD MACARONI": [],
    "TOMATO SAUCE": [],
    "SPAGHETTI SAUCE": [],
  });
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [sortOrder, setSortOrder] = useState({
    HAM: { name: null, price: null },
    "FRUIT COCKTAIL": { name: null, price: null },
    CHEESE: { name: null, price: null },
    "KESO DE BOLA": { name: null, price: null },
    MAYONNAISE: { name: null, price: null },
    "ALL PURPOSE CREAM": { name: null, price: null },
    "SANDWICH SPREAD": { name: null, price: null },
    "PASTA SPAGHETTI": { name: null, price: null },
    "ELBOW MACARONI": { name: null, price: null },
    "SALAD MACARONI": { name: null, price: null },
    "TOMATO SAUCE": { name: null, price: null },
    "SPAGHETTI SAUCE": { name: null, price: null },
  }); // Sort order for each category by name and price
  const [priceChangeFilter, setPriceChangeFilter] = useState({
    0: true, // Price Change 0
    1: true, // Price Change 1
    2: true, // Price Change 2
  }); // Global filter for priceChange

  useEffect(() => {
    // Group products by type
    const groupedProducts = {
      HAM: [],
      "FRUIT COCKTAIL": [],
      CHEESE: [],
      "KESO DE BOLA": [],
      MAYONNAISE: [],
      "ALL PURPOSE CREAM": [],
      "SANDWICH SPREAD": [],
      "PASTA SPAGHETTI": [],
      "ELBOW MACARONI": [],
      "SALAD MACARONI": [],
      "TOMATO SAUCE": [],
      "SPAGHETTI SAUCE": [],
    };

    // Loop through products and categorize them
    productsData.forEach((item) => {
      if (groupedProducts[item.type]) {
        groupedProducts[item.type].push(item);
      }
    });

    // Set the grouped products to the state
    setProducts(groupedProducts);
  }, []);

  // Function to render each product item with emojis based on priceChange
  const renderProduct = (product) => {
    // Determine which emoji to show based on priceChange
    let emoji = "";
    if (product.priceChange === 0) {
      emoji = ""; // Star emoji for priceChange 0
    } else if (product.priceChange === 1) {
      emoji = "🌟"; // Christmas tree emoji for priceChange 1
    } else if (product.priceChange === 2) {
      emoji = "🎄"; // Gift emoji for priceChange 2
    }

    return (
      <tr key={product.id}>
        {/* Emoji column (no header) */}
        <td>{emoji}</td>

        {/* Product name column */}
        <td>{product.name}</td>

        {/* Product unit column */}
        <td>{product.unit}</td>

        {/* Product price column */}
        <td>{product.price}</td>
      </tr>
    );
  };

  // Function to handle search query changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle sorting by name or price
  const handleSort = (category, column) => {
    const currentSortOrder = sortOrder[category][column];
    const newSortOrder = currentSortOrder === "asc" ? "desc" : "asc";

    // Sort the products based on the new sort order
    const sortedProducts = [...products[category]].sort((a, b) => {
      if (column === "price") {
        return newSortOrder === "asc" ? a.price - b.price : b.price - a.price;
      } else if (column === "name") {
        return newSortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return 0;
    });

    // Update the state with sorted products and the new sort order
    setProducts((prevProducts) => ({
      ...prevProducts,
      [category]: sortedProducts,
    }));

    // Update the sort order state for the specific column
    setSortOrder((prevSortOrder) => ({
      ...prevSortOrder,
      [category]: {
        ...prevSortOrder[category],
        [column]: newSortOrder,
      },
    }));
  };

  // Function to handle priceChange filter changes
  const handlePriceChangeFilter = (priceChange) => {
    setPriceChangeFilter((prevFilter) => ({
      ...prevFilter,
      [priceChange]: !prevFilter[priceChange], // Toggle filter
    }));
  };

  // Function to filter products based on the priceChange filter and search query
  const filterProducts = (category) => {
    // Filter products by priceChange (global filter)
    let filteredProducts = products[category].filter((product) => {
      return (
        (priceChangeFilter[0] && product.priceChange === 0) ||
        (priceChangeFilter[1] && product.priceChange === 1) ||
        (priceChangeFilter[2] && product.priceChange === 2)
      );
    });

    // Apply search filter
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()), // Case-insensitive search
      );
    }

    return filteredProducts;
  };

  return (
    <div>
      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: "20px", padding: "8px" }}
        />
      </div>

      {/* Price Change Filter (applies to all categories) */}
      <div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={priceChangeFilter[0]}
              onChange={() => handlePriceChangeFilter(0)}
            />
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={priceChangeFilter[1]}
              onChange={() => handlePriceChangeFilter(1)}
            />
            🌟
          </label>
          <label>
            <input
              type="checkbox"
              checked={priceChangeFilter[2]}
              onChange={() => handlePriceChangeFilter(2)}
            />
            🎄
          </label>
        </div>
      </div>

      {/* Display HAM list */}
      <div>
        <table>
          <thead>
            <tr>
              <th></th> {/* Empty header for emoji column */}
              <th>
                HAM{" "}
                <button
                  onClick={() => handleSort("HAM", "name")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder.HAM.name === "asc" ? "↑" : "↓"}
                </button>
              </th>
              <th>Unit</th>
              <th>
                Price{" "}
                <button
                  onClick={() => handleSort("HAM", "price")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder.HAM.price === "asc" ? "↑" : "↓"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterProducts("HAM").length > 0 ? (
              filterProducts("HAM").map(renderProduct)
            ) : (
              <tr>
                <td colSpan="4">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Display FRUIT COCKTAIL list */}
      <div>
        <table>
          <thead>
            <tr>
              <th></th> {/* Empty header for emoji column */}
              <th>
                FRUIT COCKTAIL{" "}
                <button
                  onClick={() => handleSort("FRUIT COCKTAIL", "name")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder["FRUIT COCKTAIL"].name === "asc" ? "↑" : "↓"}
                </button>
              </th>
              <th>Unit</th>
              <th>
                Price{" "}
                <button
                  onClick={() => handleSort("FRUIT COCKTAIL", "price")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder["FRUIT COCKTAIL"].price === "asc" ? "↑" : "↓"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterProducts("FRUIT COCKTAIL").length > 0 ? (
              filterProducts("FRUIT COCKTAIL").map(renderProduct)
            ) : (
              <tr>
                <td colSpan="4">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Display CHEESE list */}
      <div>
        <table>
          <thead>
            <tr>
              <th></th> {/* Empty header for emoji column */}
              <th>
                CHEESE{" "}
                <button
                  onClick={() => handleSort("CHEESE", "name")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder.CHEESE.name === "asc" ? "↑" : "↓"}
                </button>
              </th>
              <th>Unit</th>
              <th>
                Price{" "}
                <button
                  onClick={() => handleSort("CHEESE", "price")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder.CHEESE.price === "asc" ? "↑" : "↓"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterProducts("CHEESE").length > 0 ? (
              filterProducts("CHEESE").map(renderProduct)
            ) : (
              <tr>
                <td colSpan="4">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Display KESO DE BOLA list */}
      <div>
        <table>
          <thead>
            <tr>
              <th></th> {/* Empty header for emoji column */}
              <th>
                KESO DE BOLA{" "}
                <button
                  onClick={() => handleSort("KESO DE BOLA", "name")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder["KESO DE BOLA"].name === "asc" ? "↑" : "↓"}
                </button>
              </th>
              <th>Unit</th>
              <th>
                Price{" "}
                <button
                  onClick={() => handleSort("KESO DE BOLA", "price")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder["KESO DE BOLA"].price === "asc" ? "↑" : "↓"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterProducts("KESO DE BOLA").length > 0 ? (
              filterProducts("KESO DE BOLA").map(renderProduct)
            ) : (
              <tr>
                <td colSpan="4">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Display MAYONNAISE list */}
      <div>
        <table>
          <thead>
            <tr>
              <th></th> {/* Empty header for emoji column */}
              <th>
                MAYONNAISE{" "}
                <button
                  onClick={() => handleSort("MAYONNAISE", "name")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder.MAYONNAISE.name === "asc" ? "↑" : "↓"}
                </button>
              </th>
              <th>Unit</th>
              <th>
                Price{" "}
                <button
                  onClick={() => handleSort("MAYONNAISE", "price")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder.MAYONNAISE.price === "asc" ? "↑" : "↓"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterProducts("MAYONNAISE").length > 0 ? (
              filterProducts("MAYONNAISE").map(renderProduct)
            ) : (
              <tr>
                <td colSpan="4">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Display ALL PURPOSE CREAM list */}
      <div>
        <table>
          <thead>
            <tr>
              <th></th> {/* Empty header for emoji column */}
              <th>
                ALL PURPOSE CREAM{" "}
                <button
                  onClick={() => handleSort("ALL PURPOSE CREAM", "name")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder["ALL PURPOSE CREAM"].name === "asc" ? "↑" : "↓"}
                </button>
              </th>
              <th>Unit</th>
              <th>
                Price{" "}
                <button
                  onClick={() => handleSort("ALL PURPOSE CREAM", "price")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder["ALL PURPOSE CREAM"].price === "asc" ? "↑" : "↓"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterProducts("ALL PURPOSE CREAM").length > 0 ? (
              filterProducts("ALL PURPOSE CREAM").map(renderProduct)
            ) : (
              <tr>
                <td colSpan="4">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Display SANDWICH SPREAD list */}
      <div>
        <table>
          <thead>
            <tr>
              <th></th> {/* Empty header for emoji column */}
              <th>
                SANDWICH SPREAD{" "}
                <button
                  onClick={() => handleSort("SANDWICH SPREAD", "name")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder["SANDWICH SPREAD"].name === "asc" ? "↑" : "↓"}
                </button>
              </th>
              <th>Unit</th>
              <th>
                Price{" "}
                <button
                  onClick={() => handleSort("SANDWICH SPREAD", "price")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder["SANDWICH SPREAD"].price === "asc" ? "↑" : "↓"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterProducts("SANDWICH SPREAD").length > 0 ? (
              filterProducts("SANDWICH SPREAD").map(renderProduct)
            ) : (
              <tr>
                <td colSpan="4">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Display PASTA SPAGHETTI list */}
      <div>
        <table>
          <thead>
            <tr>
              <th></th> {/* Empty header for emoji column */}
              <th>
                PASTA / SPAGHETTI{" "}
                <button
                  onClick={() => handleSort("PASTA SPAGHETTI", "name")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder["PASTA SPAGHETTI"].name === "asc" ? "↑" : "↓"}
                </button>
              </th>
              <th>Unit</th>
              <th>
                Price{" "}
                <button
                  onClick={() => handleSort("PASTA SPAGHETTI", "price")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder["PASTA SPAGHETTI"].price === "asc" ? "↑" : "↓"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterProducts("PASTA SPAGHETTI").length > 0 ? (
              filterProducts("PASTA SPAGHETTI").map(renderProduct)
            ) : (
              <tr>
                <td colSpan="4">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Display ELBOW MACARONI list */}
      <div>
        <table>
          <thead>
            <tr>
              <th></th> {/* Empty header for emoji column */}
              <th>
                ELBOW MACARONI{" "}
                <button
                  onClick={() => handleSort("ELBOW MACARONI", "name")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder["ELBOW MACARONI"].name === "asc" ? "↑" : "↓"}
                </button>
              </th>
              <th>Unit</th>
              <th>
                Price{" "}
                <button
                  onClick={() => handleSort("ELBOW MACARONI", "price")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder["ELBOW MACARONI"].price === "asc" ? "↑" : "↓"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterProducts("ELBOW MACARONI").length > 0 ? (
              filterProducts("ELBOW MACARONI").map(renderProduct)
            ) : (
              <tr>
                <td colSpan="4">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Display SALAD MACARONI list */}
      <div>
        <table>
          <thead>
            <tr>
              <th></th> {/* Empty header for emoji column */}
              <th>
                SALAD MACARONI{" "}
                <button
                  onClick={() => handleSort("SALAD MACARONI", "name")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder["SALAD MACARONI"].name === "asc" ? "↑" : "↓"}
                </button>
              </th>
              <th>Unit</th>
              <th>
                Price{" "}
                <button
                  onClick={() => handleSort("SALAD MACARONI", "price")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder["SALAD MACARONI"].price === "asc" ? "↑" : "↓"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterProducts("SALAD MACARONI").length > 0 ? (
              filterProducts("SALAD MACARONI").map(renderProduct)
            ) : (
              <tr>
                <td colSpan="4">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Display TOMATO SAUCE list */}
      <div>
        <table>
          <thead>
            <tr>
              <th></th> {/* Empty header for emoji column */}
              <th>
                TOMATO SAUCE{" "}
                <button
                  onClick={() => handleSort("TOMATO SAUCE", "name")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder["TOMATO SAUCE"].name === "asc" ? "↑" : "↓"}
                </button>
              </th>
              <th>Unit</th>
              <th>
                Price{" "}
                <button
                  onClick={() => handleSort("TOMATO SAUCE", "price")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder["TOMATO SAUCE"].price === "asc" ? "↑" : "↓"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterProducts("TOMATO SAUCE").length > 0 ? (
              filterProducts("TOMATO SAUCE").map(renderProduct)
            ) : (
              <tr>
                <td colSpan="4">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Display SPAGHETTI SAUCE list */}
      <div>
        <table>
          <thead>
            <tr>
              <th></th> {/* Empty header for emoji column */}
              <th>
                SPAGHETTI SAUCE{" "}
                <button
                  onClick={() => handleSort("SPAGHETTI SAUCE", "name")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder["SPAGHETTI SAUCE"].name === "asc" ? "↑" : "↓"}
                </button>
              </th>
              <th>Unit</th>
              <th>
                Price{" "}
                <button
                  onClick={() => handleSort("SPAGHETTI SAUCE", "price")}
                  style={{ marginLeft: "10px" }}
                >
                  {sortOrder["SPAGHETTI SAUCE"].price === "asc" ? "↑" : "↓"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterProducts("SPAGHETTI SAUCE").length > 0 ? (
              filterProducts("SPAGHETTI SAUCE").map(renderProduct)
            ) : (
              <tr>
                <td colSpan="4">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsList;
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <h1>2024 Noche Buena Price Guide</h1>
      <ProductsList />
    </>
  </StrictMode>,
);
