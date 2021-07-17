var ERC721MintableComplete = artifacts.require('CustomERC721Token');
const truffleAssert = require('truffle-assertions');
contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    
    const account_two = accounts[1];
   
    const account_three=accounts[2];
   
    const account_four= accounts[3];
    
    const account_five =accounts[4];
    

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
            try{
             await this.contract.mint(account_one,1,{from: account_one});
    
             await this.contract.mint(account_one,2,{from: account_one});
    
             await this.contract.mint(account_one,3,{from: account_one});
            }
    
            catch(e){console.log(e)}
            // TODO: mint multiple tokens
        })

        it('should return total supply', async function () { 
    
            let result=   await this.contract.totalSupply.call({from: account_one});
    
           assert.equal(3,result,"toatal supply");
        })

        it('should get token balance', async function () { 
    
            let result=   await this.contract.balanceOf.call(account_one,{from: account_one});
    
            assert.equal(3,result,"toatal supply");
    
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let result = await this.contract.tokenURI.call(1, {from: account_one}); 

            assert.equal(result, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "tokenURI should match.");
        })

        it('should transfer token from one owner to another', async function () { 
            let result = await this.contract.transferFrom(account_one,account_two,3, {from: account_one}); 
            let owner=await this.contract.ownerOf.call(3,{from:account_one});
            assert.equal(owner,account_two," transfer token from one owner to another");
        })
    });

    describe('have ownership properties', function () {
        
        beforeEach(async function () { 
        
            this.contract = await ERC721MintableComplete.new({from: account_one});
        
        })

        it('should fail when minting when address is not contract owner', async function () { 
        
            await truffleAssert.reverts(this.contract.mint(account_two, 99, {from: account_two})
        
            );
        
        })

        it('should return contract owner', async function () { 
           
            let result = await this.contract.getOwner.call({from: account_two}); 
           
            assert.equal(result, account_one, "account_one is the owner.");
        
        })

    });
    //ok this was checked
    
})