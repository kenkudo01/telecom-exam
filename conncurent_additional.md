# 追加された問題 (Additional Questions)

## Quiz #1

### Question 1

Give the proper sequence of thread Java object and its OS resource lifetime.

**Answer**: Object construction, `start()`, `run()` callback, `join()` handling `InterruptedException`, object sent to garbage collection.

---

### Question 2

What are the different ways that `java.lang.Thread` can be constructed so that a launched thread actually performs work and does not merely exit immediately?

**Answer**:

1. Inheritance from `java.lang.Thread` with either a) derived class b) anonymous derived class.
2. Composition using the `java.lang.Thread` constructors with a `Runnable` argument using a) implementing class b) anonymous implementing class c) lambda function.

---

### Question 3

Lambda functions can be used in Java to fill in for what type and meeting what conditions?

**Answer**: An interface with only one non-default non-static method.

---

### Question 4

What is parallelism on a modern CPU effectively?

**Answer**: Somewhere between the number of cores and logical processors if a technology like AMD Simultaneous Multi-Threading (SMT) or Intel Hyper-threading is in use.

---

### Question 5

The operating system (OS) is the scheduler for what resource that we consider in concurrent programming, and what is typically the only efficient way to achieve good performance?

**Answer**: The CPU occupancy, and this means all scheduling should go through OS calls which the Java library wraps in functions like `join` or `sleep`.

---

## Quiz #2

### Question 1

What does `interrupt` method do to a thread?

**Answer**: It marks the thread as interrupted, until or if it is blocking where it generates an `InterruptedException`

---

### Question 2

What exactly does `Thread.sleep(5)` do?

**Answer**: Yields to the operating system for a minimum of 5ms unless interrupted

---

### Question 3

With anonymous classes including those deriving other classes or implementing an interfaces or also lambda functions, how is data transferred into the function(s) in code defined there?

**Answer**: Via static variables or captured variables, which Java requires to be `final` or effectively final which can be done with a simple primitive copy or shallow reference copy of objects.

---

### Question 4

What pattern might one use to make `InterruptedException` a way to allow graceful thread termination in all scenarios including lambda `run` functions?

**Answer**: By wrapping the body of the `run()` function with `try { ... } catch (InterruptedException e) {}` and periodically checking `isInterrupted` if in non-blocking computational code.

---

### Question 5

Lambda functions in Java follow the syntax:

1. A comma-separated list of formal parameters enclosed in parentheses
2. The arrow token, ->
3. A body, which consists of a single expression or a statement block.

Which else of the following is true?

**Answer**: A return statement is not an expression; in a lambda expression, you must enclose statements in braces ({}). However, you do not have to enclose a void method invocation in braces.

---

## Quiz #3

### Question 1

Given the following code snippet:

```java
public class SyncList {
    public static void main(String[] args) throws InterruptedException {
        List<Integer> l = new ArrayList<>();
        java.lang.Thread[] ts = new java.lang.Thread[2];
        for (int i = 0; i < ts.length; i++) {
            int finali = i;
            ts[i] = new java.lang.Thread(
                () -> {
                    for (int j = finali; j < 1_000_000; j+=2) {
                        synchronized (LOCK) {
                           l.add(j);
                        }
                    }
                }
            );
        }
...
```

What possibilities could be used to fill in for `LOCK` to ensure normal list behavior?

**Answer**: `l`, `args`, `ts`, `ts[0]`, `ts[1]`

---

### Question 2

The `synchronized` keyword accepts what type of argument?

**Answer**: Any expression deriving from or including `java.lang.Object`

---

### Question 3

Over-synchronizing is not allowed in what context where code operates correctly to avoid being self-defeating?

**Answer**: If it turns concurrent code into sequential code.

---

### Question 4

The following is taken from https://github.com/openjdk/jdk/blob/master/src/java.base/share/classes/java/util/ArrayList.java

```java
public class ArrayList<E> extends AbstractList<E> {
    private Object[] grow(int minCapacity) {
        int oldCapacity = elementData.length;
        if (oldCapacity > 0 || elementData != DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
            int newCapacity = ArraysSupport.newLength(oldCapacity,
                    minCapacity - oldCapacity, /* minimum growth */
                    oldCapacity >> 1           /* preferred growth */);
            return elementData = Arrays.copyOf(elementData, newCapacity);
        } else {
            return elementData = new Object[Math.max(DEFAULT_CAPACITY, minCapacity)];
        }
    }
    private Object[] grow() {
        return grow(size + 1);
    }
    private void add(E e, Object[] elementData, int s) {
        if (s == elementData.length)
            elementData = grow();
        elementData[s] = e;
        size = s + 1;
    }
    public boolean add(E e) {
        modCount++;
        add(e, elementData, size);
        return true;
    }
...
}
```

List all variables that would have a race-condition in this code if used in a thread unsafe or unsynchronized context.

**Answer**: `elementData`, `size`, `modCount`

---

### Question 5

What drawback does the `synchronized` keyword come with?

**Answer**: No `InterruptedException` so it is deadlock prone.

---

## Quiz #4

### Question 1

Choose the typically optimal strategy under most circumstances for the following:

1. Primitive types whose critical sections involve only single reads or single writes
2. Primitive types whose critical sections involve only updates that can be described with a unary operator or a compare and swap/exchange/set
3. Critical sections involving multiple primitive types

**Answer**:

1. `volatile`
2. `java.util.concurrent.atomic`
3. `synchronized`

---

### Question 2

What is `synchronized` in an instance method declaration equivalent to?

**Answer**: `synchronized (this) { ... }`

---

### Question 3

The following is taken from https://github.com/openjdk/jdk/blob/master/src/java.base/share/classes/java/util/concurrent/atomic/AtomicInteger.java

```java
    public final int updateAndGet(IntUnaryOperator updateFunction) {
        int prev = get(), next = 0;
        for (boolean haveNext = false;;) {
            if (!haveNext)
                next = updateFunction.applyAsInt(prev);
            if (weakCompareAndSetVolatile(prev, next))
                return next;
            haveNext = (prev == (prev = get()));
        }
    }
```

Describe what the function does - in other words how the JDK can do an atomic operation when for example an x86 CPU `LOCK` only supports the following instructions `ADD, ADC, AND, BTC, BTR, BTS, CMPXCHG, CMPXCH8B, CMPXCHG16B, DEC, INC, NEG, NOT, OR, SBB, SUB, XOR, XADD, XCHG.`

**Answer**: It reads the previous value, computes the next value, and tries compare-and-set (CAS which compiles to a single `lock cmpxchg` on x86). If CAS fails (value changed), it rereads and retries.

---

### Question 4

The Java documentation notes:

Reads and writes are atomic for reference variables and for most primitive variables (all types except long and double).

Reads and writes are atomic for all variables declared `volatile` (including long and double variables).

What else does `volatile` do?

**Answer**: Changes to a `volatile` variable are always visible to other threads.

---

### Question 5

What does putting `synchronized` on all instance methods of a class do?

**Answer**: Makes use of the class safe as long as critical regions only involve single instance methods.

---

## Quiz #5

### Question 1

When using concurrent tasks (e.g., via `ExecutorService.submit()`), it's easy for threads to **terminate silently** if they throw unhandled exceptions.

**How can you ensure that such exceptions are not lost and are printed to the terminal?**

**Answer**: Wrap the task body or inspect the returned `Future`:

```java
// Option 1: Explicit try/catch
executor.submit(() -> {
    try {
        doWork();
    } catch (Exception e) {
        e.printStackTrace();
        throw e; // rethrow to preserve error reporting
    }
});

// Option 2: Use Future::get
Future<?> f = executor.submit(this::doWork);
try {
    f.get(); // triggers ExecutionException wrapping the task failure
} catch (ExecutionException e) {
    e.getCause().printStackTrace();
}
```

---

### Question 2

When using an `ExecutorService`, tasks may keep running or hang indefinitely unless it is **shut down properly** and tasks **respect interruption**.

**What is the correct graceful shutdown sequence, and what precautions must be taken inside tasks?**

**Answer**: Call methods in this order:

```java
executor.shutdown();                          // stop accepting new tasks
executor.awaitTermination(timeout, unit);     // wait for completion
// or Future<V>::get() for submitted tasks
executor.shutdownNow();                       // force stop if still running
```

Tasks must **handle interruption correctly** — e.g., catch `InterruptedException` and stop work promptly. Otherwise, `shutdownNow()` may never terminate the process if threads ignore interrupts or run infinite loops.

---

### Question 3

Given these pseudo-random number generate (PRNG) usages, rate each for safety and efficiency:

1. `java.util.Random` **shared** among tasks/threads
2. `java.util.Random` **shared with extra synchronization**
3. `java.util.Random` **one instance per task**
4. `java.util.concurrent.ThreadLocalRandom.current()` among tasks/threads

Note: as of JDK 7, `java.util.Random` instances are thread-safe (the seed updates are atomic), but sharing one causes contention and poor throughput.

**Answer**:

1. **Thread-safe, but inefficient** under contention
2. **Thread-safe, very inefficient** (added synchronization worsens contention)
3. **Safe; may be inefficient** if tasks ≫ threads (too many short-lived RNGs)
4. **Always safe and efficient** (per-thread RNG, no contention)

---

### Question 4

We use the following `Executors` factory methods for what use cases?

`static ExecutorService newFixedThreadPool(int nThreads)`

`static ScheduledExecutorService newScheduledThreadPool(int corePoolSize)`

**Answer**:

- `newFixedThreadPool(int nThreads)` → Creates a thread pool that _reuses a fixed number of threads_ operating off a _shared unbounded queue_.
- `newScheduledThreadPool(corePoolSize)` → Creates a thread pool that can _schedule commands to run after a delay_ or _execute periodically_.

---

### Question 5

We know that `java.util.concurrent.Callable<V>` has one method `V call()` and `java.lang.Runnable` has one method `void run()`. For both of these, how do we define `Future`s for these, how can we store many of them, and what does `get()` do?

**Answer**: `Future<V>` in a `List` while `get()` waits and retrieves the value, and `Future<?>` in a `List` or array and `get()` waits only.

---

## Quiz #6

### Question 1

Give the corresponding synchronized method variants in the JDK for the following: `Collection<E>`, `Set<E>`, `List<E>`, `Map<K, V>`, `ArrayList<E>`, `LinkedList<E>`, `HashMap<K, V>`.

**Answer**:

- `Collections.synchronizedCollection(...)`
- `Collections.synchronizedSet(...)`
- `Collections.synchronizedList(...)`
- `Collections.synchronizedMap(...)`
- `Vector<E>`
- `N/A`
- `N/A`

---

### Question 2

What are the two most prevalent methods for synchronizing data access in lists **backed by arrays** which are provided in the JDK?

**Answer**:

- `Collections.synchronizedList(...)` / `Vector` (synchronized method variant)
- `java.util.concurrent.CopyOnWriteArrayList`

---

### Question 3

What happens when a static synchronized method is invoked, since a static method is associated with a class, not an object? What is the term used for when a thread can acquire a lock that it already owns?

**Source**: https://docs.oracle.com/javase/tutorial/essential/concurrency/locksync.html

**Answer**:

- The thread acquires the intrinsic lock for the `Class` object associated with the class.
- The term is **reentrant synchronization**.

---

### Question 4

**The synchronized data structures provided in `java.util` (not `java.util.concurrent`) provide thread-safety under what condition?**

**Answer**: The critical regions of a program involve individual methods of the synchronized data structures.

---

### Question 5

**Iteration using `iterator()` (e.g. with for-each) or `listIterator()` of synchronized data structures in `java.util` is special in what way?**

**Answer**: They are fail-fast iterators that throw `ConcurrentModificationException` on a best-effort (not guaranteed) basis.

---

## Quiz #7

### Question 1

Choose the closest non-synchronized (at least not guaranteed to be) `java.util.concurrent` classes for:

`ArrayList<E>`, `LinkedList<E>`, `TreeSet<E>`, `TreeMap<E>`, `HashSet<K, V>`, `HashMap<K, V>`

**Answer**:

- `CopyOnWriteArrayList<E>`
- `ConcurrentLinkedDeque<E>`
- `ConcurrentSkipListSet<E>`
- `ConcurrentSkipListMap<K, V>`
- `CopyOnWriteArraySet<E>`
- `ConcurrentHashMap<K, V>`

---

### Question 2

What function can combine `containsKey` and `put` to atomically insert values that are not present in a `ConcurrentHashMap<K, V>`?

**Answer**: `V putIfAbsent(K key, V value)`.

---

### Question 3

What 3 functions whose type signature is `V (K key, BiFunction<? super K,? super V,? extends V> remappingFunction)` can be used to atomically update a `ConcurrentHashMap<K, V>`?

**Answer**:

- `compute`
- `computeIfAbsent`
- `computeIfPresent`

---

### Question 4

`Iterator`s, `Spliterator`s, and `Enumeration`s for a `ConcurrentHashMap<K, V>` use what approach to maintain data integrity? What exceptions can they throw? What restriction is there on their use?

**Answer**:

- They take a **snapshot** of the data.
- They throw **no** concurrency-related exceptions.
- They **can only be used from a single thread**.

---

### Question 5

Typically, when is a `ConcurrentHashMap` preferred over a `synchronizedMap`?

**Answer**: When the critical sections involving the map involve **unary operation updates of the keys and/or values**, allowing fine-grained concurrency instead of blocking the entire map.

---

## Quiz #8

### Question 1

**Name the two most basic types of blocking queues in the JDK, the data structure that underlies them, and describe their capacity restrictions.**

**Answer**:

- `ArrayBlockingQueue<E>` — backed by an array `E[]`, **fixed capacity**
- `LinkedBlockingQueue<E>` — backed by a linked list `LinkedList<E>`, **unbounded up to `Integer.MAX_VALUE`**

---

### Question 2

**Specify if the amount of time blocked (or 0 if non-blocking) for the following `BlockingQueue<E>` interface methods:**

`add`, `remove`, `addAll`, `drainTo`, `offer`, `poll`, `put`, `take`

**Answer**:

- **Non-blocking (0):** `add`, `remove`, `addAll`, `drainTo`, `offer`, `poll`
- **Blocking (user-specified timeout):** `offer`, `poll`
- **Blocking (infinite until possible):** `put`, `take`

---

### Question 3

**In computing, a pipeline deals with what, is similar in concept to what traditional manufacturing technique from the industrial revolution, and what do we call the effect when part of the pipeline is slow?**

**Answer**:

- It deals with **data or instruction flow**
- is similar in concept to an **assembly line**
- and the slowdown effect is called a **stall** or **bottleneck**.

---

### Question 4

**What is the minimum capacity that should be specified in a blocking queue?**

**Answer**: One which **won't cause unhandled or unwanted exceptions with certain non-blocking calls**, and one that **won't cause a deadlock**.

---

### Question 5

**What is a sentinel value and how is it used in terms of blocking queues?**

**Answer**:

- A **sentinel value** is a special reserved value representing an **end of sequence or operation**
- used to signal a **blocking queue polling or taking loop** to terminate
- while ensuring another sentinel is passed on to any **upstream blocking queues**.

---

## Quiz #9

### Question 1

**Describe the lock ownership if the following code is run in the following threads such that the first block starts executing before the other (barber first, then customer):**

```java
// Thread 1 (barber)
synchronized (this) {
    wait();
    // ...
}

// Thread 2 (customer)
synchronized (barber) {
    barber.notify();
    // ...
}
```

**Answer**:

0. Not owned
1. barber - synchronized (this)
2. barber - wait()
3. Not owned
4. customer - synchronized (barber)
5. customer - barber.notify()
6. customer - exits synchronized (barber)
7. Not owned
8. barber - stops waiting
9. barber - exits synchronized (this)
10. Not owned

---

### Question 2

**Java uniquely supports which synchronization primitive? What does it consist of? What class implements the functionality? What are the functions involved and their related blocking times if not interrupted?**

**Answer**:

- Java uniquely supports the **synchronization monitor**.
- It consists of **a mutex plus an event mechanism**.
- It is implemented by **`java.lang.Object`**.
- The relevant functions and blocking behavior are:
  - `notify()` — non-blocking
  - `notifyAll()` — non-blocking
  - `wait()` — blocks **forever** (until notified)
  - `wait(long timeout)` — blocks up to **timeout milliseconds**
  - `wait(long timeout, int nanos)` — blocks up to **timeout·1,000,000 + nanos nanoseconds**

---

### Question 3

**Give the well-known solution(s) to the dining philosophers problem.**

**Answer**:

1. **Dijkstra's solution**

   Philosophers **atomically pick up both forks or wait**, so they never hold exactly one fork outside a critical section.

   Implementation sketch: use **one mutex** (to protect shared state), **one semaphore per philosopher**, and **one state variable per philosopher** (thinking/hungry/eating) so that checking/changing fork availability happens atomically.

2. **Resource hierarchy solution**

   This solution prevents **circular wait** by imposing a **partial order on resources** (the forks) and always acquiring them in that order.

   Example: number the forks and always pick up the **lower-numbered fork first**, or equivalently: all philosophers pick up their **left fork then right fork**, _except one_ who picks up **right then left** to break the cycle.

---

### Question 4

**What is the Readers–Writers problem and what are the well-known solution(s) to it?**

**Answer**:

**Readers–Writers problem:**

A group of threads share a resource where **multiple readers may read simultaneously**, but **writers require exclusive access**.

Thus the system must ensure:

- **Many readers + no writers** is allowed.
- **One writer + no readers** is allowed.
- **No reader or writer** may access the shared resource while a **writer** is writing.

**Three classical solutions:**

1. **Readers-preference solution (may starve writers)**

   - Readers may enter freely as long as no writer is active.
   - Writers must wait until _all_ readers finish.
   - Typically implemented with a mutex protecting counters, but this is sub-optimal because it doesn't prevent **writer starvation** and may allow indefinite chains of readers.

2. **Writers-preference solution (may starve readers)**

   - Achieved using a _readTry_ semaphore (or similar).
   - Each reader must lock/unlock `readTry` before entering; writers lock it only once when the first writer arrives.
   - Once a writer locks `readTry`, **no new readers may start**, giving priority to writers.
   - Ensures that once a writer begins waiting, readers eventually stop to allow the writer through.

3. **Fair (no-starvation) solution**
   - Ensures **FIFO ordering** of all waiting threads, so neither readers nor writers starve.
   - Requires semaphores or locks with **queueing semantics** (strict first-come-first-served).
   - Guarantees that both readers and writers eventually make progress in arrival order.

---

### Question 5

**What is the Producers–Consumers problem, what is it also known as, how does Java solve it, and what are the well-known solution(s) to it?**

**Answer**:

**Producers–Consumers problem:**

Two (or more) cyclic processes operate on a shared buffer:

- **Producers** generate data and insert items into the buffer.
- **Consumers** remove items from the buffer and process them.

The constraint:

A producer must wait if the buffer is **full**, and a consumer must wait if the buffer is **empty**.

It is also known as the **bounded-buffer problem**.

**How Java solves it:**

With built-in thread-safe bounded queues such as **`ArrayBlockingQueue`**, which handles blocking, waking, and internal synchronization.

**Four well-known solutions:**

1. **Dijkstra's semaphore solution**

   Uses two semaphores:

   - `empty` (counts empty slots)
   - `full` (counts filled slots)

   plus a **mutex** protecting buffer operations. Classic explicit semaphore-based coordination.

2. **Monitor (condition-variable) solution**

   A circular buffer is guarded by a **monitor**, with:

   - one condition variable for **empty**
   - one condition variable for **full**

   and mutual exclusion handled implicitly. Java equivalents: synchronized methods + `wait()` / `notifyAll()`, or a custom monitor class.

3. **Channel (message-passing) solution**

   The language/runtime provides channels (as in Go or CSP).

   Producers send messages; consumers receive them.

   No shared memory; synchronization is implicit in channel operations.

4. **Atomic (non-blocking) solution**

   Uses atomic operations (CAS) and **busy-waiting** to implement a lock-free or wait-free buffer.

   Avoids blocking but may use more CPU and is challenging to implement safely.

---

## Quiz #10

### Question 1

**Describe the Thundering Herd Problem and give the Linux solution, the Windows solution, and the general solution on systems that require a backoff mechanism.**

**Answer**:

The **Thundering Herd Problem** occurs when **many waiting threads or processes** are all woken up for a single event (e.g., data arriving, a connection becoming ready), but **only one can actually make progress**. The others immediately go back to sleep, wasting CPU and causing contention.

- **Linux solution:**

  Responses are **serialized** so that only **one waiter** is awoken at a time when a resource becomes ready. This can be done using **flags when polling on multiple objects** (e.g., with `epoll` and appropriate flags/usage) so that only one process/thread is notified per event.

- **Windows solution:**

  Use **I/O Completion Ports (IOCP)**, where a completion port **queues completed operations** and worker threads **pull work items one at a time**, avoiding waking a large herd of threads.

- **General solution (backoff with jitter):**

  Introduce **jitter in a backoff algorithm** so that retries are **spread out randomly**. Each client waits for a **randomized delay** between attempts, preventing them from becoming synchronized and all hitting the resource at once.

---

### Question 2

**How can you solve race conditions on an object reference itself that is changing constantly when synchronization is not possible? For example, if one thread does `obj = ref; ... obj = null;` while another needs to check and use it as in `if (obj != null) { /* use obj */ }`.**

**Answer**: Take a **local snapshot** of the reference first, then check and use the **snapshot**, not the shared field:

```java
MyType snapshot = obj;      // copy the reference
if (snapshot != null) {
    // safe to use this particular object reference
    snapshot.doSomething();
}
```

Because the **reference copy is atomic**, and the local variable `snapshot` cannot be changed by other threads, this avoids the race where `obj` becomes `null` between the check and its use.

---

### Question 3

**When you have code along the lines of**

```java
if (/* condition check primitive1 */) {
    // ...
} else if (/* condition check primitive2 */) {
    // ...
} else {
    // update primitive1
    // update primitive2
}
```

**executing on multiple threads, what is the critical section and how should race conditions generally be fixed?**

**Answer**: The **entire code block** (all the `if` / `else if` / `else` branches together) is the **critical section**, because the conditions and updates on `primitive1` and `primitive2` form a **single logical decision**. It should generally be protected by a **single `synchronized` region** on a shared lock:

```java
synchronized (lock) {
    if (/* condition check primitive1 */) {
        // ...
    } else if (/* condition check primitive2 */) {
        // ...
    } else {
        // update primitive1
        // update primitive2
    }
}
```

---

### Question 4

**What is the problem with**

```java
synchronized (lock) {
    obj = new ...;
    ...
    obj = null;
}
```

**in one thread, while other threads access the object via**

```java
synchronized (lock) {
    if (obj != null) use obj;
}
```

**Answer**: Other threads will **never actually be able to use the object**, because the thread that creates it also **immediately sets it to `null` within the same synchronized block**, leaving no opportunity for another thread to observe the non-`null` reference.

---

### Question 5

**When developing a concurrent program, one generally identifies critical sections by identifying race conditions at what stage?**

**Answer**: After the data in question is **fully described in code** or is **understood logically**, including **all reads, writes, dependencies, and dependents**.

Only once all access patterns are known can true race conditions and therefore critical sections be identified.

---

## Quiz #11

### Question 1

**List four reasons why one would use `ReentrantLock` over `synchronized`.**

**Answer**:

1. **Fairness is needed.**

   `ReentrantLock` can be constructed with a _fair_ policy (`new ReentrantLock(true)`), while `synchronized` has no fairness guarantees.

2. **Interruptibility is needed.**

   `lockInterruptibly()` allows a thread to attempt to acquire a lock but abort if interrupted; `synchronized` cannot be interrupted while waiting.

3. **Non-blocking or timed lock attempts are needed.**

   `tryLock()` and `tryLock(timeout, unit)` allow non-blocking or time-limited attempts to acquire the lock—impossible with `synchronized`.

4. **The thread that unlocks may differ from the thread that locked** (in rare advanced handoff or ownership-transfer patterns).

   While normally discouraged, `ReentrantLock` _allows_ this in limited cases; `synchronized` strictly requires the same thread to enter and exit the monitor.

---

### Question 2

**A binary semaphore `new Semaphore(1)` is essentially the same as what?**

**Answer**: A **`ReentrantLock`** — both allow only one permit/holder at a time, making them conceptually similar to a mutual exclusion lock.

---

### Question 3

**The generalized version of `synchronized (Object)` with `wait` and `notify` are what?**

**Answer**:

- `java.util.concurrent.locks.ReentrantLock`
- `Condition.await()`
- `Condition.signal()`

These provide the same monitor-style capabilities as `synchronized` + `wait`/`notify`, but with more flexibility (fairness, multiple conditions, interruptible waits, timed waits, etc.).

---

### Question 4

**Java's fair solution to the readers–writers problem is what, and how should it be done with the well-known solution and the other JDK primitives?**

**Answer**:

Use **`java.util.concurrent.locks.ReentrantReadWriteLock(true)`**, which is a fair **read–write lock** implementation in the JDK.

The `true` argument enables **fair** (FIFO-style) ordering so that neither readers nor writers starve.

Alternatively, one can build a custom fair read–write lock using:

- an **`AtomicInteger`** (to track reader/writer state)
- a **`ReentrantLock`** (to guard shared state)
- a **fair `ReentrantLock(true)`** (or fair conditions) to serialize access and enforce FIFO-style fairness between readers and writers.

---

### Question 5

**What are the important `ReentrantLock` methods, and which responsibility shifts to the programmer when using them?**

**Answer**:

Important methods of `ReentrantLock`:

- `lock()`
- `lockInterruptibly()`
- `tryLock()`
- `tryLock(long time, TimeUnit unit)`

When using `ReentrantLock`, it becomes **the programmer's responsibility** to call **`unlock()`**, always paired with a `try`/`finally` idiom:

```java
lock.lock();
try {
    // critical section
} finally {
    lock.unlock();   // must not be forgotten!
}
```

Unlike `synchronized`, which automatically releases the lock when leaving the block, `ReentrantLock` requires **manual unlock management**.
