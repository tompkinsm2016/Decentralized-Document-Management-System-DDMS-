const Web3 = require('web3');
const contractAbi = require('./contractAbi.json');

const web3 = new Web3(Web3.givenProvider);
const contractAddress = 'CONTRACT_ADDRESS';
const contract = new web3.eth.Contract(contractAbi, contractAddress);

function uploadDocument() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        const ipfsHash = // Upload file to IPFS and get hash
        uploadToContract(ipfsHash);
    }

    reader.readAsArrayBuffer(file);
}

function uploadToContract(ipfsHash) {
    web3.eth.getAccounts().then(function(accounts) {
        const account = accounts[0];
        contract.methods.uploadDocument(ipfsHash).send({ from: account })
            .on('transactionHash', function(hash){
                console.log(hash);
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log(confirmationNumber, receipt);
            })
            .on('receipt', function(receipt){
                console.log(receipt);
            })
            .on('error', console.error);
    });
}

function downloadDocument() {
    web3.eth.getAccounts().then(function(accounts) {
        const account = accounts[0];
        contract.methods.getDocument(account).call()
            .then(function(ipfsHash) {
                // Download file from IPFS using hash
                console.log("Downloaded document with IPFS hash:", ipfsHash);
            })
            .catch(console.error);
    });
}
