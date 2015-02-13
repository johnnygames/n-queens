// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //first, get access to array held at rowIndex
      //use reduce to iterate through the array
      //use iterator that sums all values in array
      //if sum > 1
        //more than 1 queen in row
          //return true
      //else return false

      var row = this.get(rowIndex);

      var count = _.reduce(row, function (current, next) {
        return current + next;
      });

      return count > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // Initialize empty array.
      // Iterate through this.attributes
      // push each key into an array
      // slice last index of an array
      // iterate through object
      // for i = 0 i < array.length; i++
      // hasRowConflictAt for each i.
      // if hasCAt return true.

      var size = this.get('n');
      for(var i = 0; i < size; i++){
        if(this.hasRowConflictAt(i)){
          return true;
        }
      }
      return false;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
    // Save this.attribute into a variable named table
    // Iterate through table using reduce, arguments passed are row1 and row2
      //inside reduce use for loop that looks at elements of both rows
      // Add elements of both rows together
      // Return the added up row
    //Save the reduced result into variable addedUpColumns
    //Subset that with colIndex
    //If subsetted value > 1
      // return true
    // else false

    var size = this.get('n');

    var colArray = [];

    for (var i = 0 ; i < size; i++) {
      colArray.push(this.get(i)[colIndex]);
    }

    var count = _.reduce(colArray, function (current, next) {
      return current + next;
    });

    return count > 1; 
      // var table = this.attributes;
      // var addedUp = _.reduce(table, function (row1, row2) {
      //   if (Array.isArray(row2)) {
      //     for (var i = 0; i < row1.length; i++) {
      //       row1[i] = row1[i] + row2[i];
      //     }
      //   }
      //   return row1;
      // });
      // return addedUp[colIndex] > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //Iterate through added
      
      var size = this.get('n');
      for(var i = 0; i < size; i++){
        if(this.hasColConflictAt(i)){
          return true;
        }
      }
      return false; 

      // var table = this.attributes;
      // var addedUp = _.reduce(table, function (row1, row2) {
      //   if (Array.isArray(row2)) {
      //     for (var i = 0; i < row1.length; i++) {
      //       row1[i] = row1[i] + row2[i];
      //     }
      //   }
      //   return row1;
      // });
      // for (var i = 0; i < addedUp.length; i++) {
      //   if (addedUp[i] > 1) {
      //     return true;
      //   }
      // }
      // return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var size = this.get('n');
      var count = 0;
      var rowIdx = 0;
      var colIdx = majorDiagonalColumnIndexAtFirstRow;

      for( ; rowIdx < size && colIdx < size; rowIdx++, colIdx++ ){
        if( colIdx >= 0 ) {
          var row = this.get(rowIdx);
          count += row[colIdx];
        }
      }

      return count > 1;
      // init Empty array
      // for loop iterate from 0 to n-1 within in this for loop;
        //this.get(i)[i] push into Enpty array
      // reduce array to see whether it returns greater thaan 1.

      // var rows = this.rows();
      // var sum = 0;
      // var rowIndex = 0;

      // for(var i = majorDiagonalColumnIndexAtFirstRow; i < rows.length; i++) {
      //   if( (i > -1) && ( rowIndex < rows.length) ) {
      //     sum += rows[rowIndex][i];
      //   }
      //   rowIndex++;
      // }
      // return (sum > 1) ? true : false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var size = this.get('n');

      for( var i = 1 - size; i < size; i++ ) {
        if( this.hasMajorDiagonalConflictAt(i) ) {
          return true;
        }
      }

      return false;








      // var size = this.rows().length;

      // var initial = (size - 2) * -1;

      // for(var i = initial; i < (size - 1); i++) {
      //   if(this.hasMajorDiagonalConflictAt(i)) {
      //     return true;
      //   }
      // }
      // return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var size = this.get('n');
      var count = 0;
      var rowIdx = 0;
      var colIdx = minorDiagonalColumnIndexAtFirstRow;

      for( ; rowIdx < size && colIdx >= 0; rowIdx++, colIdx-- ) {
        if( colIdx < size ) {
          var row = this.get(rowIdx);
          count += row[colIdx];
        }
      }

      return count > 1;











      // var rows = this.rows();
      // var sum = 0;
      // var rowIndex = 0;

      // for(var i = minorDiagonalColumnIndexAtFirstRow; i >= 0; i--) {
      //   if( (i < rows.length ) && ( rowIndex < rows.length) ) {
      //     sum += rows[rowIndex][i];
      //   }
      //   rowIndex++;
      // }
      // return (sum > 1) ? true : false;      
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
       var size = this.get('n');

      for( var i = (size * 2) - 1; i >= 0; i-- ) {
        if( this.hasMinorDiagonalConflictAt(i) ) {
          return true;
        }
      }

      return false;     












      // var size = this.rows().length;

      // for(var i = 1; i < (size + (size - 2) ); i++) {
      //   if(this.hasMinorDiagonalConflictAt(i)) {
      //     return true;
      //   }
      // }
      // return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
