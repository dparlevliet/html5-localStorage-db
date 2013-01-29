
try {
  'localStorage' in window && window['localStorage'] !== null;
} catch (e) {
  // fake it
  window.localStorage = {
    __store__: {},
    setItem: function(key, value) {
      this.__store__[key] = value;
    },
    getItem: function(key) {
      try {
        return this.__store__[key];
      } catch(e) {
        return undefined;
      }
    }
  };
}
window.$db = function(key) {
  return {
    set: function(value) {
      return localStorage.setItem(key, value);
    },
    get: function() {
      return localStorage.getItem(key);
    },
    setObj: function(value) {
      return localStorage.setItem(key, JSON.stringify(value));
    },
    getObj: function() {
      var item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
    },
    remove: function() {
      localStorage.removeObj(key)
    }
  };
};
