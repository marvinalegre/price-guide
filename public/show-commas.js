import fs from "fs";
import readline from "readline";

// Create a read stream from the input.txt file
const fileStream = fs.createReadStream("input.txt");

// Create a readline interface to read the file line by line
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity, // Handles different newline characters
});

const commaCountFrequency = {};
const linesWithNonThreeCommas = [];

let lineNumber = 0;

// Process each line of the file
rl.on("line", (line) => {
  lineNumber++;

  // Count the number of commas in the line
  const commaCount = (line.match(/,/g) || []).length;

  // Update the frequency of the comma count
  if (commaCount in commaCountFrequency) {
    commaCountFrequency[commaCount] += 1;
  } else {
    commaCountFrequency[commaCount] = 1;
  }

  // Track lines with comma counts not equal to 3
  if (commaCount !== 3) {
    linesWithNonThreeCommas.push(lineNumber);
  }
});

// After reading all lines, output the frequency distribution and lines with non-3 commas
rl.on("close", () => {
  console.log("Frequency Distribution of Comma Counts:");
  console.log("Comma Count | Frequency");

  // Sort the keys (comma counts) in ascending order
  const sortedCommaCounts = Object.keys(commaCountFrequency).sort(
    (a, b) => a - b,
  );

  // Display the frequency distribution table
  sortedCommaCounts.forEach((count) => {
    console.log(`${count.padStart(11)} | ${commaCountFrequency[count]}`);
  });

  // Print the line numbers of lines with comma counts not equal to 3
  if (linesWithNonThreeCommas.length > 0) {
    console.log("\nLines with comma counts not equal to 3:");
    console.log(linesWithNonThreeCommas.join(", "));
  } else {
    console.log("\nAll lines have 3 commas.");
  }
});
