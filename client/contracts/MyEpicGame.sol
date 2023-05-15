// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

// NFT contract to inherit from.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./libraries/Base64.sol";
import "hardhat/console.sol";

// Our contract inherits from ERC721, which is the standard NFT contract!
contract MyEpicGame is ERC721 {

  address payable public owner;

  struct CharacterAttributes {
    uint characterIndex;
    string name;
    string imageURI;        
    uint hp;
    uint maxHp;
    uint attackDamage;
  }
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  CharacterAttributes[] defaultCharacters;

  // We create a mapping from the nft's tokenId => that NFTs attributes.
  mapping(uint256 => CharacterAttributes) public nftHolderAttributes;

  struct BigBoss {
  string name;
  string imageURI;
  uint hp;
  uint maxHp;
  uint attackDamage;
}
BigBoss public bigBoss;
  mapping(address => uint256) public nftHolders;

  constructor(
  string[] memory characterNames,
  string[] memory characterImageURIs,
  uint[] memory characterHp,
  uint[] memory characterAttackDmg,
  string memory bossName, // These new variables would be passed in via run.js or deploy.js.
  string memory bossImageURI,
  uint bossHp,
  uint bossAttackDamage
  ) 
    ERC721("soldier-ant", "ANT")
  {
    
   owner = payable(msg.sender);

  // Initialize the boss. Save it to our global "bigBoss" state variable.
    bigBoss = BigBoss({
    name: bossName,
    imageURI: bossImageURI,
    hp: bossHp,
    maxHp: bossHp,
    attackDamage: bossAttackDamage
    });

    console.log("Done initializing boss %s w/ HP %s, img %s", bigBoss.name, bigBoss.hp, bigBoss.imageURI);

    for(uint i = 0; i < characterNames.length; i += 1) {
      defaultCharacters.push(CharacterAttributes({
        characterIndex: i,
        name: characterNames[i],
        imageURI: characterImageURIs[i],
        hp: characterHp[i],
        maxHp: characterHp[i],
        attackDamage: characterAttackDmg[i]
      }));

      CharacterAttributes memory c = defaultCharacters[i];
      
      // Hardhat's use of console.log() allows up to 4 parameters in any order of following types: uint, string, bool, address
      console.log("Done initializing %s w/ HP %s, img %s", c.name, c.hp, c.imageURI);
    }

    // I increment _tokenIds here so that my first NFT has an ID of 1.
    // More on this in the lesson!
    _tokenIds.increment();
  }

  event CharacterNFTMinted(address sender, uint256 tokenId, uint256 characterIndex);
  event AttackComplete(uint newBossHp, uint newPlayerHp);
  event Winners(address winner, uint256 tokenId, string charName);
  event Losers(address loser, uint256 tokenId, string charName);

  // Users would be able to hit this function and get their NFT based on the
  // characterId they send in!
  function mintCharacterNFT(uint _characterIndex) external payable {
    uint256 _price = 1 * 10**15;
    require(msg.value >= _price, "Not enough Money to paid");
    // Get current tokenId (starts at 1 since we incremented in the constructor).
    uint256 newItemId = _tokenIds.current();

    // The magical function! Assigns the tokenId to the caller's wallet address.
    _safeMint(msg.sender, newItemId);

    // We map the tokenId => their character attributes. More on this in
    // the lesson below.
    nftHolderAttributes[newItemId] = CharacterAttributes({
      characterIndex: _characterIndex,
      name: defaultCharacters[_characterIndex].name,
      imageURI: defaultCharacters[_characterIndex].imageURI,
      hp: defaultCharacters[_characterIndex].hp,
      maxHp: defaultCharacters[_characterIndex].maxHp,
      attackDamage: defaultCharacters[_characterIndex].attackDamage
    });

    console.log("Minted NFT w/ tokenId %s and characterIndex %s", newItemId, _characterIndex);
    
    // Keep an easy way to see who owns what NFT.
    nftHolders[msg.sender] = newItemId;

    // Increment the tokenId for the next person that uses it.
    _tokenIds.increment();
    emit CharacterNFTMinted(msg.sender, newItemId, _characterIndex);
  }

  function tokenURI(uint256 _tokenId) public view override returns (string memory) {
  CharacterAttributes memory charAttributes = nftHolderAttributes[_tokenId];

  string memory strHp = Strings.toString(charAttributes.hp);
  string memory strMaxHp = Strings.toString(charAttributes.maxHp);
  string memory strAttackDamage = Strings.toString(charAttributes.attackDamage);

  string memory json = Base64.encode(
      bytes(
        string(
          abi.encodePacked(
            '{"name": "',
            charAttributes.name,
            ' -- NFT #: ',
            Strings.toString(_tokenId),
            //'", "description": "A Soldier Ant Combat NFT Metaverse Game", ""image": "https://cloudflare-ipfs.com/ipfs/', 
            '", "description": "A Soldier Ant Combat NFT Metaverse Game", ""image": "ipfs://', 
            charAttributes.imageURI, 
            '", "attributes": [ { "trait_type": "Health Points", "value": ',strHp,', "max_value":',strMaxHp,'}, { "trait_type": "Attack Damage", "value": ',
            strAttackDamage,'} ]}'
          )
        )
      )
    );
  string memory output = string(
    abi.encodePacked("data:application/json;base64,", json)
  );
  
  return output;
}

function attackBoss() public {
  // Get the state of the player's NFT.
  uint256 nftTokenIdOfPlayer = nftHolders[msg.sender];
  CharacterAttributes storage player = nftHolderAttributes[nftTokenIdOfPlayer];

  console.log("\nPlayer w/ character %s about to attack. Has %s HP and %s AD", player.name, player.hp, player.attackDamage);
  console.log("Boss %s has %s HP and %s AD", bigBoss.name, bigBoss.hp, bigBoss.attackDamage);
  
  // Make sure the player has more than 0 HP.
  require (
    player.hp > 0,
    "Error: Game Over, character must have HP to attack boss."
  );

  // Make sure the boss has more than 0 HP.
  require (
    bigBoss.hp > 0,
    "Error: boss must have HP to attack boss."
  );
  
  // Allow player to attack boss.
  if (bigBoss.hp < player.attackDamage) {
    bigBoss.hp = 0;
    console.log("Boss %s has %s HP and %s AD", bigBoss.name, bigBoss.hp, bigBoss.attackDamage);
    console.log("Soldier Ant %s has won the game", player.name);
    console.log("The Boss %s has lost the game", bigBoss.name);

    emit Losers(msg.sender, nftTokenIdOfPlayer, player.name);
    emit Winners( address(this), 1, bigBoss.name);
  } else {
    bigBoss.hp = bigBoss.hp - player.attackDamage;
  }

  // Allow boss to attack player.
  if (player.hp < bigBoss.attackDamage) {
    player.hp = 0;
    console.log("Player %s has %s HP and %s AD", player.name, player.hp, player.attackDamage);
    console.log("Soldier Ant %s has lost the game", player.name);
    console.log("The Boss %s has Won the game", bigBoss.name);

    emit Winners(msg.sender, nftTokenIdOfPlayer, player.name);
    emit Losers( address(this), 1, bigBoss.name);
  } else {
    player.hp = player.hp - bigBoss.attackDamage;
  }
  
  emit AttackComplete(bigBoss.hp, player.hp);
  // Console for ease.,
  console.log("Player attacked boss. New boss hp: %s", bigBoss.hp);
  console.log("Boss attacked player. New player hp: %s\n", player.hp);
}

function checkIfUserHasNFT() public view returns (CharacterAttributes memory) {
  // Get the tokenId of the user's character NFT
  uint256 userNftTokenId = nftHolders[msg.sender];
  // If the user has a tokenId in the map, return their character.
  if (userNftTokenId > 0) {
    return nftHolderAttributes[userNftTokenId];
  }
  // Else, return an empty character.
  else {
    CharacterAttributes memory emptyStruct;
    return emptyStruct;
   }
}

function getAllDefaultCharacters() public view returns (CharacterAttributes[] memory) {
  return defaultCharacters;
}

function getBigBoss() public view returns (BigBoss memory) {
  return bigBoss;
}

    //demo only allows ANYONE to withdraw
     function withdraw() public {
        // get the amount of Ether stored in this contract
        uint amount = address(this).balance;

        // send all Ether to owner
        // Owner can receive Ether since the address of owner is payable
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Failed to send Ether");
    }

}