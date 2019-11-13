import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * @jingjiejiang Nov 13, 2019
 */
class PrisonCellsAfterNDays {
    // public int[] prisonAfterNDays(int[] cells, int N) {

    //     if (cells == null || cells.length == 0)
    //         return cells;

    //     Set<String> cellsSet = new HashSet<>();
    //     boolean hasCycle = false;
    //     int cycleCnt = 0;

    //     for (int idx = 0; idx < N; idx++) {

    //         // ** need to keep the original cells is that if meet cycle, then the first loop
    //         // of cycle must use the original cells
    //         int[] next = nextCells(cells);
    //         String cellsForm = Arrays.toString(next);

    //         if (cellsSet.contains(cellsForm) == false) {
    //             cellsSet.add(cellsForm);
    //             cycleCnt++;
    //         } else {
    //             hasCycle = true;
    //             break;
    //         }

    //         cells = next;
    //     }

    //     if (hasCycle) {
    //         N %= cycleCnt;
    //         for (int idx = 0; idx < N; idx++) {
    //             cells = nextCells(cells);
    //         }
    //     }

    //     return cells;
    // }

    // private int[] nextCells(int[] cells) {
    //     // default value for tmp[0] and tmp[tmp.length - 1] is 0
    //     int[] tmp = new int[cells.length];
    //     for (int i = 1; i < cells.length - 1; i++) {
    //         tmp[i] = cells[i - 1] == cells[i + 1] ? 1 : 0;
    //     }

    //     return tmp;
    // }

    public int[] prisonAfterNDays(int[] cells, int N) {
        Map<String, Integer> seen = new HashMap<>();
        while (N > 0) {
            int[] next = new int[8];
            seen.put(Arrays.toString(cells), N --);
            for (int idx = 1; idx < 7; idx ++) {
                next[idx] = cells[idx - 1] == cells[idx + 1] ? 1 : 0;
            }
            cells = next;
            String key = Arrays.toString(cells);
            if (seen.containsKey(key)) {
                N %= (seen.get(key) - N);
            }
        }

        return cells;
    }
}
