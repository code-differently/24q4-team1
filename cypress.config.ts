// import { defineConfig } from 'cypress';


// export default defineConfig({
//   projectId: 'g7scy6',
//   e2e: {
//     baseUrl: 'http://localhost:3000',
//     chromeWebSecurity: false,
//   setupNodeEvents(on, config) {
//     require('@cypress/code-coverage/task')(on, config)
//     return config
//   },
// }});

import { defineConfig } from 'cypress';
import codeCoverageTask from '@cypress/code-coverage/task';


export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Add the code coverage task
      codeCoverageTask(on, config);
      return config;
    },
    baseUrl: 'http://localhost:3000', 
  },
});