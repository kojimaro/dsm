var FileHashStorage = artifacts.require("./FileHashStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(FileHashStorage, {
      gas: 2000000
  });
};
