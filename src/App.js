import React, { Component } from 'react';
import getWeb3 from './utils/getWeb3';
import ipfs from './utils/ipfs.js';
import FileHashStorageContract from '../build/contracts/FileHashStorage.json';
import CssBaseline from '@material-ui/core/CssBaseline';
import Menu from './presentational/organisms/menu.js';
import ErrorDialog from './presentational/atoms/error_dialog.js';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          web3: null,
          userAccount: null,
          fileHashStorageInstance: null,
          gasPrice: 0,
          uploadState: {
              uploading: false,
              success: false,
              formDisabled: true
          },
          uploadedFiles: [],
          displayDialog: false,
          isLoading: true
        }
    }

    componentWillMount() {
        getWeb3.then(results => {
            if(results.injectFlg) {
                this.setState({
                    web3: results.web3
                });
                this.instantiateContract();
            } else {
                this.setState({
                    displayDialog: true
                });
            }
        }).catch(() => {
            console.log('Error finding web3.');
        });
    }

    instantiateContract = () => {
        const contract = require('truffle-contract');
        const fileHashStorage = contract(FileHashStorageContract);

        fileHashStorage.setProvider(this.state.web3.currentProvider);
        fileHashStorage.deployed().then((instance) => {
            this.setState({
                fileHashStorageInstance: instance,
                uploadState: {
                    formDisabled: false
                },
            });
            this.appStart();
        });
    }

    appStart = () => {
        this.state.web3.eth.getAccounts((error, accounts) => {
            this.setState({userAccount: accounts[0]});
            this.displayFiles(accounts[0]);
            this.getGasPrice();

            setInterval(this.checkAccount, 100);
        });
    }

    getGasPrice = () => {
        this.state.web3.eth.getGasPrice((error, result) => {
            const gasPliceInGwei = this.state.web3.fromWei(result, 'gwei').toString();
            this.setState({gasPlice: gasPliceInGwei});
        });
    }

    checkAccount = () => {
        this.state.web3.eth.getAccounts((error, accounts) => {
            if (error) return;

            if (accounts[0] !== this.state.userAccount) {
                this.setState({
                    userAccount: accounts[0],
                    uploadedFiles: []
                });
                this.displayFiles(this.state.userAccount);
            }
        });
    }

    getFileDetails = id => {
        return this.state.fileHashStorageInstance.files(id);
    }

    displayFiles = owner => {
        this.setState({
            isLoading: true
        });

        this.state.fileHashStorageInstance.getFileIds(owner).then(
            (ids) => {
                for (let id of ids) {
                    this.getFileDetails(id).then((file) => {
                        var newFile = JSON.parse(file[1]);
                        newFile['id'] = JSON.parse(id.c);

                        this.setState({uploadedFiles: this.state.uploadedFiles.concat([newFile])});
                    });
                }
            }
        ).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    readDirectory = event => {
        event.preventDefault();

        let totalFiles = event.target.files.length;

        if(!totalFiles) return;

        this.setState({
            uploadState: {
                uploading: true,
                success: false,
                formDisabled: true
            }
        });

        let loadedFiles = 0;
        var dir = [];
        [].map.call(event.target.files, file => {
            var reader = new FileReader();
            reader.onloadend = () => {
                var buf = Buffer.from(reader.result);
                dir.push({
                    path: file.webkitRelativePath,
                    content: buf
                });
                if (++loadedFiles === totalFiles) {
                    this.uploadDirectoryToIpfs(dir);
                }
            }
            reader.readAsArrayBuffer(file);
        });
    }

    uploadDirectoryToIpfs = async(dir) => {
        await ipfs.add(dir, {recursive: true},(error, result) => {
            if(error === null) {
                const fileData = JSON.stringify(result.pop());
                this.saveFileHash(fileData);
            } else {
                this.setState({
                    uploadState: {
                        uploading: false,
                        success: false,
                        formDisabled: false
                    }
                });
                console.log(error);
            }
        });
    }

    saveFileHash = async(fileData) => {
        await this.state.fileHashStorageInstance.saveFileHash('ipfs', fileData, {from: this.state.userAccount}).then((result) => {
            var file = JSON.parse(result.logs[0].args.fileData);
            file['id'] = JSON.parse(result.logs[0].args.fileId.c);
            this.setState({
                uploadState: {
                    uploading: false,
                    success: true,
                    formDisabled: false
                },
                uploadedFiles: this.state.uploadedFiles.concat([file])
            });
            return;
        }).catch((e) => {
            this.setState({
                uploadState: {
                    uploading: false,
                    success: false,
                    formDisabled: false
                }
            });
        });
    }

    render() {
        return (
          <React.Fragment>
          <CssBaseline />
          <Menu
            readDirectory={this.readDirectory} uploadState={this.state.uploadState}
            uploadedFiles={this.state.uploadedFiles}
            gasPlice={this.state.gasPlice}
            isLoading={this.state.isLoading}
          />
          <ErrorDialog displayDialog={this.state.displayDialog} />
          </React.Fragment>
        );
    }
}

export default App;
