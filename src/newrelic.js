// // src/newrelic.js
// if (typeof window !== 'undefined' && !window.NREUM) {
//   window.NREUM = window.NREUM || {};
//   window.NREUM.info = {
//     beacon: 'bam.nr-data.net',
//     errorBeacon: 'bam.nr-data.net',
//     licenseKey: 'NRJS-16b503040ded44abb9c', // From your snippet
//     applicationID: '1103420902', // From your snippet
//     sa: 1,
//   };

//   window.NREUM.loader_config = {
//     accountID: '6843409', // Your account ID from the UI
//     trustKey: '6843409',
//     agentID: '1103420902', // Same as applicationID
//     licenseKey: 'NRJS-16b503040ded44abb9c',
//     applicationID: '1103420902',
//   };
  
//   window.NREUM.init = {
//     distributed_tracing: { enabled: true },
//     privacy: { cookies_enabled: true },
//     ajax: { deny_list: [] },
//     spa: { enabled: true }, // Enable SPA monitoring for React
//   };

//   // Dynamically load the agent script
//   const script = document.createElement('script');
//   script.src = 'https://js-agent.newrelic.com/nr-spa-latest.min.js';
//   script.async = true;
//   document.head.appendChild(script);
// }





// src/newrelic.js
import { BrowserAgent } from '@newrelic/browser-agent/loaders/browser-agent';

const options = {
  info: {
    beacon: 'bam.nr-data.net',
    errorBeacon: 'bam.nr-data.net',
    licenseKey: 'NRJS-16b503040ded44abb9c', // From your snippet
    applicationID: '1103420902', // From your snippet
    sa: 1,
  },
  loader_config: {
    accountID: '6843409', // Your account ID from the UI
    trustKey: '6843409',
    agentID: '1103420902', // Same as applicationID
    licenseKey: 'NRJS-16b503040ded44abb9c',
    applicationID: '1103420902',
  },
  init: {
    distributed_tracing: { enabled: true },
    privacy: { cookies_enabled: true },
    ajax: { deny_list: [] },
    spa: { enabled: true }, // Enable SPA monitoring for React
  },
};

// Instantiate the agent (executes immediately)
new BrowserAgent(options);