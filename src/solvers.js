/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  //store the inital matrix in a variable
  var solutionBoard = new Board({"n": n});
  //define recursive function (rowIndex)
  var recursiveHelper = function (rIndex) {
    if (rIndex > (n - 1) ) {
      return solutionBoard;
    }
    for (var j = 0; j < n; j++) {
      solutionBoard.togglePiece(rIndex, j);
      if (!solutionBoard.hasAnyRowConflicts() && !solutionBoard.hasAnyColConflicts()) {
         return recursiveHelper(rIndex+1);        
      } else {
        solutionBoard.togglePiece(rIndex, j);
        continue;
      }
    }
  };

  var solution = recursiveHelper(0);
  //iterate through the single row/array
    //run togglePiece on each value and run col and row conflict tests
    //if passes, test for which row currently in
      //if that row is (n - 1) then finished and return matrix
      //if not last row, recurse

  var board = solution.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionBoard = new Board({"n": n});
  var solutionCount = 0;

  var recursiveHelper = function (rIndex) {
    if (rIndex > (n - 1) ) {
      return;
    }
    for (var j = 0; j < n; j++) {
      solutionBoard.togglePiece(rIndex, j);
      if (!solutionBoard.hasAnyRowConflicts() && !solutionBoard.hasAnyColConflicts()) {
         if (rIndex === n - 1) {
            solutionCount++;
         }
         recursiveHelper(rIndex+1);        
      } 
        solutionBoard.togglePiece(rIndex, j);
    }
  };

  recursiveHelper(0);
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
