import Fetch from './core/Fetch';
import defaults from './defaults';

/**
 * Create an instance of Fetch
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Fetch} A new instance of Fetch
 */
function createInstance(defaultConfig) {
  const context = new Fetch(defaultConfig);
  const instance = Fetch.prototype.request.bind(context);

  // Copy Fetch.prototype and context to instance
  Object.assign(instance, Fetch.prototype, context);
  return instance;
}

// Create the default instance to be exported
const fetch = createInstance(defaults);

// Expose Fetch class to allow class inheritance
fetch.Fetch = Fetch;

// Factory for creating new instances
fetch.create = function create(instanceConfig) {
  return createInstance({...defaults, ...instanceConfig});
};

export default fetch;
