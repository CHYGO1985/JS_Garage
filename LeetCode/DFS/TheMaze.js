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
    const steps = [];
    steps.push(start);
    

    const isInRange = (loc, shift) => {
        return loc[0] + shift[0] >= 0 && loc[0] + shift[0] < maze.length
                && loc[1] + shift[1] >= 0 && loc[1] + shift[1] < maze[0].length
                && maze[loc[0] + shift[0]][loc[1] + shift[1]] === 0
                && maze[loc[0] + shift[0]][loc[1] + shift[1]] !== 2;
    };

    const dfs = (steps) => {

        console.log(steps[steps.length - 1][0] + " " + destination[0] + "|" +
                   steps[steps.length - 1][1] + " " + destination[1]);
        

        if (steps[steps.length - 1][0] === destination[0] && 
            steps[steps.length - 1][1] === destination[1]) {
            
            return true;
        }

        for (let dirIdx = 0; dirIdx < dirs.length; dirIdx ++) {
            const cur = steps[steps.length - 1];
            maze[cur[0]][cur[1]] = 2;
            if (isInRange(cur, dirs[dirIdx]) === false) continue;
            
            steps.push([cur[0] + dirs[dirIdx][0], cur[1] + dirs[dirIdx][1]]);
            dfs(steps);
            steps.pop();
        }
        
        return false;
    };
    
    
    const res = dfs(steps);
    
    return res;
};