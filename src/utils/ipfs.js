import IPFS from 'ipfs-api';
const ipfs = new IPFS({ host: 'ipfs.infura.io', protocol: 'https' });

export default ipfs;