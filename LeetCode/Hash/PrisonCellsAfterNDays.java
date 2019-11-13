import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * @jingjiejiang Nov 13, 2019
 */
class PrisonCellsAfterNDays {
    public int[] prisonAfterNDays(int[] cells, int N) {

        if (cells == null || cells.length == 0)
            return cells;

        Set<String> cellsSet = new HashSet<>();
        boolean hasCycle = false;
        int cycleCnt = 0;

        for (int idx = 0; idx < N; idx++) {

            // ** need to keep the original cells is that if meet cycle, then the first loop
            // of cycle must use the original cells
            int[] next = nextCells(cells);
            String cellsForm = Arrays.toString(next);

            if (cellsSet.contains(cellsForm) == false) {
                cellsSet.add(cellsForm);
                cycleCnt++;
            } else {
                hasCycle = true;
                break;
            }

            cells = next;
        }

        if (hasCycle) {
            N %= cycleCnt;
            for (int idx = 0; idx < N; idx++) {
                cells = nextCells(cells);
            }
        }

        return cells;
    }

    private int[] nextCells(int[] cells) {
        // default value for tmp[0] and tmp[tmp.length - 1] is 0
        int[] tmp = new int[cells.length];
        for (int i = 1; i < cells.length - 1; i++) {
            tmp[i] = cells[i - 1] == cells[i + 1] ? 1 : 0;
        }

        return tmp;
    }
}
