const weaponTypes = require('./types.json');
const magicTypes = require('../magics/types.json');
const itemDescriptors = require('../items/descriptors');

const Weapon = (level, type, magics) => {

  const combineDamage = (a, b) => ({
    damage: {
      min: a.damage.min + b.damage.min,
      max: a.damage.max + b.damage.max
    }
  });

  const combineEffects = (a, b) => ({
    effects: a.effects.concat(b.effects)
  });

  const damage = combineDamage(combineDamage(type, magics.reduce(combineDamage)), {damage: {min: level, max: level}});
  const attributes = Object.assign({}, type, damage, {effects: magics.reduce(combineEffects)});
  const description = `a ${itemDescriptors[magics.length].adverb} ${itemDescriptors[level].adjective} ${type.noun}`;

  return {
    attributes,
    description
  }
}

export default Weapon;