const getUrlBasedOnType = (type, name, url) => {
  switch (type) {
    case 'merchant':
      return `/merchant/${name}/${url}`;
    case 'branch':
      return `/merchant/branch/${name}/${url}`;
    case 'cashier':
      return `/merchant/cashier/${name}/${url}`;
    default:
      return `/`;
  }
};

const getNameBasedOnType = (type) => {
  switch (type) {
    case 'merchant':
      return 'merchant';
    case 'branch':
      return 'merchantBranch';
    case 'cashier':
      return 'merchantStaff';
    default:
      return 'merchant';
  }
};

export { getUrlBasedOnType, getNameBasedOnType };
