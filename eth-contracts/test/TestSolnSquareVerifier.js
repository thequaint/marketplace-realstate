// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier


var SolnSquareVerifier1 = artifacts.require('SolnSquareVerifier');

var Verifier1= artifacts.require('verifier');

const truffleAssert = require('truffle-assertions');

contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    
    const account_two = accounts[1];
    
    const account_three=accounts[2];
    
    const account_four= accounts[3];
    
    const account_five =accounts[4];
    

    describe('match erc721 spec',  function () {
    
        beforeEach(async function () { 
            
            const squareContract = await Verifier1.new({from:  accounts[0]});
            this.contract = await SolnSquareVerifier1.new(
                squareContract.address, {from:  accounts[0]}
            );
           
        });
         
       


     
        it('Test if a new solution can be added for contract - SolnSquareVerifier', async function () { 
    
        
    
                const account_four= accounts[3];
                
                let tx=await this.contract.addsolve(101,account_four,{from: accounts[0],gas:300000});
                 
                
            
                   
                 truffleAssert.eventEmitted(tx, 'soladded', (ev) => {
                 return ev.val12 === true;})
        })
        it('can create new nft tokens',async function (){
            let tx=await this.contract.mintNFT(accounts[2],999,[
              "0x0768a13ff0766ecc82a41f98e281b3015ec55b7ca03904ded442f410602e70c0",
              "0x2759d69ab5b0fd939647a8e8cd7997cece8ae19a8f06e4b03a30bb56c048687e"
            ], [
              [
                "0x2b952aa67dc299f023bc2566e46440403a3fe8dba2f18e4ce38afcd3783377ab",
                "0x16284bd6a2333ca000d393081b9d625a4a696a219c7474d5ce32c1bb22dd346d"
              ],
              [
                "0x10f095ad0d43d9c920b3166b97840222222a95cff67676e4ae02b884b07d994a",
                "0x177af5a552325dd2ab7ce753d9b2238d1d8f8195f89da5cc7af244a8a576ccc8"
              ]
            ],[
              "0x06615a346071f2d5917e296d2241f2c7e43a0a0a3024d159327cb659f34b5fc5",
              "0x1f8478f365680002c468012ff711ac73c30e1592547dcdf74b01340d51077ee1"
            ],[
              "0x0000000000000000000000000000000000000000000000000000000000000009",
              "0x0000000000000000000000000000000000000000000000000000000000000001"
            ]);
    
            truffleAssert.eventEmitted(tx, 'minted', (ev) => {
                return ev.to == accounts[2];
             });

            })
       

    })





})                   
    


    
     
  
    


    

