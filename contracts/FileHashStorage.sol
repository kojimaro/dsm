pragma solidity ^0.4.23;

contract FileHashStorage {

    event NewFile(uint fileId, string provider, string fileData);

    struct File {
        string provider;
        string fileData;
    }

    File[] public files;

    mapping(uint => address) public fileToOwner;
    mapping(address => uint) public ownerFileCount;

    function saveFileHash(string _provider, string _fileData) external {
        uint id = files.push(File(_provider, _fileData)) - 1;

        fileToOwner[id] = msg.sender;
        ownerFileCount[msg.sender]++;

        emit NewFile(id, _provider, _fileData);
    }

    function getFileIds(address _owner) external view returns (uint[]) {
        uint[] memory result = new uint[](ownerFileCount[_owner]);

        uint counter = 0;
        for (uint i = 0; i < files.length; i++) {
            if (fileToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }
}