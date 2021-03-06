// Water Tower Summary
// 1) Find the peaks
// 2) Get water between peaks 

// To find the peaks we would need to get the area between each of the peaks
// a peak is a wall not submerged by water 

// This was created to complement Array.prototype.forEach
Array.prototype.reverseEach = function(callback) {
  for(let i = this.length - 1; i >= 0; i--) {
    callback(this[i], i);
  }
};

// Timeline
// 1) Declare peak and indexes variable, both can be undefined
// 2) declare a temp, oldIndex, and value variable and assign 0 to all three
// 3) foo is a function that can either be forEach or reverseEach
// 4) return largest pool of water and its indexes in an object

// Inside foo
// 1) The undefined peak uses the zeroth indexed wall
//   a) The peak is the current wall we're on and is one of two walls to measure water inbetween
// 2) As the loop iterates, each index that isn't 0 adds to temp
//   a) temp is the variable that temporarily carries the amount of water until a wall taller than
//      the peak is encountered
//   b) if the condition of peak < wall is true, we create a tuple of the old and current indexes to
//      represent both the walls we used to carry the water. we set the urrent index as the old index
//      to find a larger collection of water
//   c) the value variable is the largest pool of water found
//   tl;dr the loop finds largest pool of water
// 3) We return an object that has value and indexes properties using the same variables in the
//    function via shorthand
const traverse = (foo, length) => {
  let peak, indexes;
  let temp = 0, oldIndex = 0, value = 0;

  foo((wall, index) => {
    peak = peak || wall;
    if(peak <= wall) {
      indexes = temp > value ? [oldIndex, index] : indexes;
      oldIndex = index;

      value = value > temp ? value : temp;
      temp = 0;
      peak = wall;
    }

    if(index !== 0 || index === length - 1) {
      temp += peak - wall;
    } 
  });
  
  return ({ value, indexes });
};

// Timeline
// 1) Destructure forEach and reverseEach from Array.prototype
//    a) reverseEach was a custom Array function designed to complement forEach
// 2) Invoke traverse function that returns an object that has the highest value via one-way traversal
//    a) We will traverse the walls variable twice, forward and backwards
// 3) Return the object with the higher value
const waterWalls = walls => {
  const { forEach, reverseEach } = Array.prototype;
  let largestForward = traverse(forEach.bind(walls), walls.length);
  let largestReverse = traverse(reverseEach.bind(walls), walls.length);
  console.log(largestForward, largestReverse);
  return largestForward.value > largestReverse.value ? largestForward : largestReverse;
};


module.exports = waterWalls;