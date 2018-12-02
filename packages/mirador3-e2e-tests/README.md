# Mirador3 E2E Tests

### `npm run cypress:open`
starts server and runs cypress

### Notes:
webpack is not used here yet, though a configuration is included.

Currently, `dist` contains the common-js pre-built binary produced by `mirador3-app` with the `npm run dist` command.

The server uses the index template from views that loads the binary from dist and loads default Mirador export.

Optimally, `apps` will contain different source Apps that will be built with webpack from ES6 imports
using a published mirador3-app artifact.
