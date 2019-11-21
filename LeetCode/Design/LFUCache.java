import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;

import jdk.internal.jshell.tool.resources.l10n;

/**
 * @jingjiejiang Oct 21, 2019
 */
class LFUCache {

  // key : value
  private Map<Integer, Integer> valsMap;
  // key : counts
  private Map<Integer, Integer> timesMap;
  // counts : keys list
  private Map<Integer, LinkedHashSet<Integer>> timesKeyMap;
  private int capacity;
  private int min;

  public LFUCache(int capacity) {

    valsMap = new HashMap<>();
    timesMap = new HashMap<>();
    timesKeyMap = new HashMap<>();
    timesKeyMap.put(1, new LinkedHashSet<>());
    this.capacity = capacity;
    min = -1;
  }

  public int get(int key) {
    if (valsMap.containsKey(key) == false) {
      return 0;
    }

    int count = timesMap.getOrDefault(key, 0);
    timesMap.put(key, count + 1);
    timesKeyMap.get(count).remove(key);

    if (count == min && timesKeyMap.get(count).size() == 0) {
      min++;
    }

    // ** The key is count + 1
    if (timesKeyMap.containsKey(count + 1) == false) 
      timesKeyMap.put(count + 1, new LinkedHashSet<Integer>());

    timesKeyMap.get(count + 1).add(key);

    return valsMap.get(key);
  }

  public void put(int key, int value) {
    if (capacity <= 0)
      return;

    // if key exists already, update the key visit status
    if (valsMap.containsKey(key)) {
      valsMap.put(key, value);
      get(key);
      return;
    }

    // if exists capacity, need to eject the least frequent one first
    // ** why not update timesMap (key : counts) as the key will be removed
    //  because in previous we checked that the key does not exist in valsMap
    if (valsMap.size() >= capacity) {
      int leastFreq = timesKeyMap.get(min).iterator().next();
      timesKeyMap.get(min).remove(leastFreq);
      valsMap.remove(leastFreq);
    }

    valsMap.put(key, value);
    timesMap.put(key, 1);
    min = 1;
    timesKeyMap.get(min).add(key);
  }
}

/**
 * Your LFUCache object will be instantiated and called as such: LFUCache obj =
 * new LFUCache(capacity); int param_1 = obj.get(key); obj.put(key,value);
 */