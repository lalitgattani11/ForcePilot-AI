const fs = require('fs');
const content = fs.readFileSync('src/components/AnalyticsDashboard.tsx', 'utf8');

const startStr = '{/* 3. Technical Trajectory: V3 Refinement */}';
const startIndex = content.indexOf(startStr);

if (startIndex !== -1) {
  const endStr = 'export default AnalyticsDashboard;';
  const endIndex = content.indexOf(endStr, startIndex);
  console.log(content.substring(startIndex, endIndex));
} else {
  console.log('Not found');
}
