const dreamTypes = Object.freeze({
  happy: 'happy',
  sad : 'sad',
  exciting : 'exciting',
  scary : 'scary'
});

const arrayOfDreamTypes = [];
for (let key in dreamTypes) {
  arrayOfDreamTypes.push(key);
}

module.exports = {
  arrayOfDreamTypes
};