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
  var solution = []; //fixme

  //iterate over n rows
  for(var i=0; i<n; i++){
    //place rook along diagonals
    var row = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);
    row[i]=1;
    solution.push(row);
  }

  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = factorial(n);

  function factorial(num){
    var total = 1;
    for(var i=num; i>0; i--){
      total = total*i;
    }
    return total;
  }

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


//CHANGE 4 TO NUM!!
// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var test = n;
  var board = new Board({n:test}); //fixme

  var solution = board.rows();

  var total = 0;

  var conflict;

  var count = 0;

  //iterate across first row
  for(var firstCol=0; firstCol<test; firstCol++){

    board = new Board({n:test});
    board.togglePiece(0,firstCol);

    //iterate across rows that are left
    for(var row=1; row<test; row++){

      //iterate across columns in this row
      for(var col=0; col<test; col++){
        //put piece on board
        board.togglePiece(row,col);


        //check for conflicts
        conflict = board.hasAnyColConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts();


        if(conflict){
          board.togglePiece(row,col);
        }
        else {col = test+1;} //refactor

      }

        console.log("n" + n + " firstCol: "+ firstCol +" row: " + row + " column: " + col + " " + JSON.stringify(board.rows()));
    }

    //check for complete solution (refactor)
    total = _.flatten(board.rows());
    total = _.reduce(total, function(total,value){return total + value});

    //console.log(JSON.stringify(board.rows()));
    if(total===test){break;}
    board.togglePiece(0,firstCol);
  }
  solution = board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));

  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var test = n;
  var board = new Board({n:test}); //fixme

  var solution = board.rows();

  var total = 0;

  var conflict;

  var count = 0;

  //iterate across first row
  for(var firstCol=0; firstCol<test; firstCol++){

    board = new Board({n:test});
    board.togglePiece(0,firstCol);

    //iterate across rows that are left
    for(var row=1; row<test; row++){

      //iterate across columns in this row
      for(var col=0; col<test; col++){
        //put piece on board
        board.togglePiece(row,col);

        //check for conflicts
        conflict = board.hasAnyColConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts();


        if(conflict){
          board.togglePiece(row,col);
        }
        else {col = test+1;} //refactor

      }

    }

    //check for complete solution (refactor)
    total = _.flatten(board.rows());
    total = _.reduce(total, function(total,value){return total + value});

    //console.log(JSON.stringify(board.rows()));
    if(total===test){
      //console.log("firstCol: "+ firstCol +" row: " + row + " column: " + col + " " + JSON.stringify(board.rows()));
      solutionCount++;
      //console.log("for n is: " + n + " --> solutionCount: " + solutionCount);
    }
    board.togglePiece(0,firstCol);
  }

  if(n===0 || n===1){solutionCount=1;}

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
