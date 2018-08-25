var FileHashStorage = artifacts.require("./FileHashStorage.sol");

contract('FileHashStorage', function(accounts) {
    it("saved file.", function() {
        return FileHashStorage.deployed().then(function(instance) {
            fileHashStorageInstance = instance;

            fileHashStorageInstance.saveFileHash('ipfs','{"Name":"build","Hash":"QmXUyfaoxPT8MKUbipmC7TGh5Ch15nSbUMX8YvnKdwPfa9","Size":"4853856"}');

            fileHashStorageInstance.saveFileHash('ipfs','{"Name":"build/static","Hash":"Qmc2SC2AeXBb2S6UY52P9tYorPSBJ3gScx9JPDP3qCitNP","Size":"4842796"}');

            return;
        }).then(function() {
            return fileHashStorageInstance.getFileIds(accounts[0]);
        }).then(function(result) {
            assert.equal(result[0], 0, "The file1 was not saved.");
            assert.equal(result[1], 1, "The file2 was not saved.");
        });
    });
});