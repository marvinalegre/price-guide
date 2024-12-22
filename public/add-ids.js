import fs from "fs";

// Step 1: Read the input.json file
fs.readFile("input.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading input.json:", err);
    return;
  }

  try {
    // Step 2: Parse the JSON data
    const items = JSON.parse(data);

    // Step 3: Add an 'id' to each item
    const updatedItems = items.map((item, index) => ({
      ...item,
      id: index + 1, // Incremental id starting from 1
    }));

    // Step 4: Write the updated data to output.json
    fs.writeFile(
      "output.json",
      JSON.stringify(updatedItems, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing to output.json:", err);
        } else {
          console.log("output.json has been successfully written.");
        }
      },
    );
  } catch (parseError) {
    console.error("Error parsing JSON data:", parseError);
  }
});
