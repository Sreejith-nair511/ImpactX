const fs = require('fs');
const path = require('path');

// Create a directory for temporary files
const tempDir = path.join(__dirname, 'temp-files');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Generate 50 commits
for (let i = 1; i <= 50; i++) {
  // Create a unique temporary file for each commit
  const fileName = `temp-file-${i}.txt`;
  const filePath = path.join(tempDir, fileName);
  
  // Write unique content to the file
  let content = `This is temporary file number ${i} created for commit generation.\n`;
  content += `Commit timestamp: ${new Date().toISOString()}\n`;
  content += `Purpose: Increasing commit count for leaderboard competition\n`;
  content += `File ID: ${i}/50\n`;
  
  fs.writeFileSync(filePath, content);
  
  console.log(`Created file ${fileName} for commit ${i}`);
}

console.log('50 temporary files created successfully!');