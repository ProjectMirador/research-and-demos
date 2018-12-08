# Mirador3 E2E Tests

### `npm run cypress:open`
starts server and runs cypress

### Notes:
Apps are configured in the apps.json.
To build `npm run build`

The server uses the index template from views that loads a distribution app using a parameter.  So `http://localhost:4000/mirador-base` resolves
to the bundle `mirador-base.bundle.js` in dist.

Optimally, `apps` will contain different source Apps that will be built with webpack from ES6 imports
using a published mirador3-app artifact.
