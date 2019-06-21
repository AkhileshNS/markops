
/*
  A closure that maps the default inject function: stores => {} [Object that will be passed as props]
  Ex: i/p - { trigger: "appStore" }
      o/p - { trigger: stores.appStore.trigger }
*/
export const derive = mapping => stores => {
  let res = null;
  for (let key in mapping) {
    let storeName = mapping[key];
    let storeKey = key;
    if (storeName.includes('.')) {
      let [name, newKey] = storeName.split('.');
      storeName = name;
      storeKey = newKey;
    }
    if (storeName in stores) {
      if (res === null) {
        res = {};
      }
      res[key] = stores[storeName][storeKey];
    }
  }
  return res;
};