import fs from "fs";
import readline from "readline";

// Create a read stream from the input.txt file
const fileStream = fs.createReadStream("input.txt");

// Create a readline interface to read the file line by line
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity, // Handles different newline characters
});

let currentType = "";
const products = [];

// Process each line of the file
rl.on("line", (line) => {
  // Skip empty lines
  if (line.trim() === "") return;

  // If the line is a category (e.g., HAM, CHEESE)
  if (line.match(/^[A-Z\s]+$/)) {
    currentType = line; // Set the current category type (HAM, CHEESE, etc.)
  } else {
    // Parse the product line (assuming format: priceChange,name,unit,price)
    const [priceChange, name, unit, price] = line.split(",");
    console.log(priceChange, name, unit, price); ///

    // Create the product object and add it to the products array
    const product = {
      type: currentType,
      priceChange: parseInt(priceChange, 10), // Convert to number
      name: name.trim(), // Trim any extra spaces
      unit: unit.trim(),
      price: parseFloat(price.trim()), // Convert to float for price
    };

    products.push(product);
  }
});

// After reading all lines, output the JSON to a file
rl.on("close", () => {
  const outputFilePath = "products.json";

  // Convert the array to JSON and save to a file
  fs.writeFileSync(outputFilePath, JSON.stringify(products, null, 2));

  console.log(
    `Conversion complete! The data has been saved to ${outputFilePath}`,
  );
});
