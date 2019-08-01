/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {boolean}
 * 
 * @jingjiejiang Jul 30, 2019
 */
var hasPath = function(maze, start, destination) {
    const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
    const status = maze.slice();

    const isInRange = (shift) => {
        return shift[0] >= 0 && shift[0] < maze.length
                && shift[1] >= 0 && shift[1] < maze[0].length
                && maze[shift[0]][shift[1]] !== 1;
    };

    const dfs = (preStart) => {
        if (preStart[0] === destination[0] && preStart[1] === destination[1]) {
            return true;
        }

        for (let dirIdx = 0; dirIdx < dirs.length; dirIdx ++) {
            /* shallow and deep copy cost me two hours */
            let shift = preStart.slice();

            while(isInRange(shift)) {
                shift[0] += dirs[dirIdx][0];
                shift[1] += dirs[dirIdx][1];
            }
        
            shift[0] -= dirs[dirIdx][0];
            shift[1] -= dirs[dirIdx][1];

            if (status[shift[0]][shift[1]] === 2) continue;

            // set point as visited
            status[shift[0]][shift[1]] = 2;
            if (dfs(shift)) return true;
        }
        
        return false;
    };
    
    return dfs(start);
};