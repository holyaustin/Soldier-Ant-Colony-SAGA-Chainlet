const CONTRACT_ADDRESS = "0xe078fe7A93017F8e18c1C52E79632d0B94c56c26";

/*
 * Add this method and make sure to export it on the bottom!
 */
const transformCharacterData = (characterData) => ({
  name: characterData.name,
  imageURI: characterData.imageURI,
  hp: characterData.hp.toNumber(),
  maxHp: characterData.maxHp.toNumber(),
  attackDamage: characterData.attackDamage.toNumber(),
});

export { CONTRACT_ADDRESS, transformCharacterData };
