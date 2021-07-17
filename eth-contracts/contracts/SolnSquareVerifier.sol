 pragma solidity >=0.4.21 <0.6.0;
 import "./ERC721Mintable.sol";
 import "./verifier.sol";
 //import "./CustomERC721Token.sol";

//

contract SolnSquareVerifier is CustomERC721Token{
    
    struct solutions{
        uint256 index;
        address address1;
    }
    verifier Verifier;

    constructor(address a)public{
          Verifier= verifier(a);
    }


    solutions[] private array1;

    mapping(address=>solutions) private solve;

    mapping(bytes32=>address) private solmap;

    event soladded(bool val12);

    event minted(address to);

    function addsolve(uint256 index1,address a2) public{
    
            solutions memory a=solutions({
                index:index1,
                address1:a2
            });
            array1.push(a);
            emit soladded(true);
           
    }
 
    function mintNFT(address to,uint256 tokenId,uint[2] memory a,uint[2][2] memory b,uint[2] memory c,uint[2] memory d) public {
             
                bytes32 solutionhash=keccak256(abi.encodePacked(a,b,c,d));
                
                require(solmap[solutionhash]==address(0),"solution already used");

                require(Verifier.verifyTx(a,b,c,d)==true, "Not verified");
 
                solmap[solutionhash] = to;
                
                super.mint(to,tokenId);

                emit minted(to);
                
                
        
                

    }

 //   function verifysolution() public{
        
   // }


}

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>



// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class



// TODO define a solutions struct that can hold an index & an address


// TODO define an array of the above struct


// TODO define a mapping to store unique solutions submitted



// TODO Create an event to emit when a solution is added



// TODO Create a function to add the solutions to the array and emit the event



// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
interface verifier{

 function verifyTx(
            uint[2]    calldata a,
            uint[2][2] calldata b,
            uint[2] calldata c, 
            uint[2] calldata input
        ) external returns (bool r);

}
























