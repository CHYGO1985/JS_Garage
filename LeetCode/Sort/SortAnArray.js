/**
 * @param {number[]} nums
 * @return {number[]}
 * 
 * @jingjiejiang Jun 3, 2019
 */
var sortArray = function (nums) {

    const sort = (nums, start, end) => {

        if (nums === null || nums.length === 0 || nums.length === 1) return nums;

        let pivot = nums[start];
        let shiftHead = start;
        let shiftTail = end;

        while (shiftHead <= shiftTail) {
            while (nums[shiftHead] < pivot) shiftHead++;
            while (nums[shiftTail] > pivot) shiftTail--;

            if (shiftHead <= shiftTail) {

                let tmp = nums[shiftHead];
                nums[shiftHead++] = nums[shiftTail];
                nums[shiftTail--] = tmp;
            }
        }

        if (shiftHead < end) {
            sort(nums, shiftHead, end);
        }

        if (shiftTail > start) {
            sort(nums, start, shiftTail);
        }

        return nums;
    };

    return sort(nums, 0, nums.length - 1);
};