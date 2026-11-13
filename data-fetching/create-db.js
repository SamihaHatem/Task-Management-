const fs = require('fs');
const path = require('path');

const dataDir = __dirname;

const tasksData = JSON.parse(
  fs.readFileSync(path.join(dataDir, 'tasks.json'), 'utf-8')
);

const statisticsData = JSON.parse(
  fs.readFileSync(path.join(dataDir, 'statistics.json'), 'utf-8')
);

const database = {
  tasks: tasksData.tasks,
  statistics: statisticsData.statistics,
};

fs.writeFileSync(
  path.join(dataDir, 'db.json'),
  JSON.stringify(database, null, 2)
);

console.log('Mock database generated successfully!');
