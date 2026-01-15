# Concurrent Programming Questions

## Question 1

If threads t1 and t2 both write the data structure ds, it can cause problems if ds is...

✅ an ArrayList

❌ a ConcurrentHashMap

❌ a thread-safe Vector

❌ a synchronized HashMap

**解説**: ArrayList はスレッドセーフではないため、複数のスレッドが同時に書き込みを行うと、データの不整合や破損が発生する可能性があります。ConcurrentHashMap、Vector、synchronized HashMap はスレッドセーフなデータ構造なので、複数のスレッドからの同時アクセスに対して安全です。

---

## Question 2

Adding synchronized to all methods of a class is a way to make it...

✅ thread-safe.

❌ more performant.

❌ memory efficient.

❌ lock-free.

**解説**: クラスのすべてのメソッドに synchronized キーワードを追加することで、そのクラスのインスタンスはスレッドセーフになります。これは、一度に 1 つのスレッドだけがそのオブジェクトのメソッドを実行できるようにするためです。ただし、パフォーマンスの向上やメモリ効率の向上、ロックフリーの実装とは関係ありません。

---

## Question 3

What is the advantage of a ConcurrentHashMap over a HashMap?

✅ it is thread-safe

❌ it has better time complexity

❌ it uses less memory

❌ it allows null keys and values

**解説**: ConcurrentHashMap の主な利点は、スレッドセーフであることです。通常の HashMap はスレッドセーフではないため、マルチスレッド環境で使用する際には外部から同期化を行う必要があります。ConcurrentHashMap は内部で適切に同期化されているため、複数のスレッドから安全に使用できます。時間計算量やメモリ使用量はほぼ同等で、ConcurrentHashMap は null キーや null 値を許可しません。

---

## Question 4

What does a ConcurrentHashMap do differently from a HashMap?

✅ it uses an individual lock for each bucket

❌ it uses a single global lock for all operations

❌ it does not allow null values

❌ it maintains insertion order

**解説**: ConcurrentHashMap は、各バケット（bucket）に対して個別のロックを使用することで、細粒度のロック機構を実現しています。これにより、異なるバケットへの操作は並行して実行できるため、パフォーマンスが向上します。単一のグローバルロックを使用するよりも効率的です。null 値の許可や挿入順序の維持は実装上の違いですが、最も重要な違いは個別のバケットロックです。

---

## Question 5

When is removing from the BlockingQueue typically blocking?

✅ if the consumer is much faster than the producer

❌ if the producer is much faster than the consumer

❌ if the queue capacity is unlimited

❌ if multiple threads are adding elements

**解説**: BlockingQueue からの削除（remove）操作は、キューが空の時にブロックします。コンシューマーがプロデューサーよりもはるかに速い場合、キューがすぐに空になり、次の要素が追加されるまで削除操作がブロックされます。プロデューサーが速い場合はキューが満杯になるため、挿入操作がブロックされます。

---

## Question 6

When can inserting into the BlockingQueue be potentially blocking?

❌ if the queue's capacity is unlimited

❌ if the consumer is much faster than the producer

❌ if only one thread is inserting

✅ if the queue's capacity is limited and full

**解説**: BlockingQueue への挿入操作は、キューが満杯の時にブロックします。容量が制限されている（bounded）BlockingQueue の場合、キューが満杯になると、要素が削除されるまで新しい要素の挿入がブロックされます。容量が無制限（unbounded）の場合は、メモリが許す限り追加できるためブロックしません。

---

## Question 7

Which operation is blocking?

✅ only wait

❌ only notify

❌ only notifyAll

❌ both wait and notify

**解説**: wait()メソッドはブロッキング操作です。現在のスレッドを待機状態にし、別のスレッドが notify()または notifyAll()を呼び出すまで待機します。notify()と notifyAll()はブロッキング操作ではなく、待機中のスレッドを喚起するだけの通知操作です。

---

## Question 8

How did we use wait and notify to implement our own version of BlockingQueue with a single producer and a single consumer?

❌ both the producer and the consumer used both operations

❌ the producer used wait, the consumer used notify

❌ it depended on whether its capacity was limited

✅ the producer used notify, the consumer used wait

**解説**: BlockingQueue の実装では、プロデューサー（生産者）は要素を追加した後に notify()を呼び出して、待機中のコンシューマー（消費者）を通知します。コンシューマーはキューが空の時に wait()を呼び出して待機します。つまり、プロデューサーは notify、コンシューマーは wait を使用するパターンが一般的です。

---

## Question 9

What advantage of Conditions did we explore in theory class?

❌ using them, we can group threads based on how long they run

✅ using them, we can treat readers and writers differently

❌ using them, we can classify threads by their creation order

❌ using them, we can tell producers from consumers at compile time

**解説**: Condition インターフェースは、異なる条件に対して異なる待機条件を設定できる利点があります。例えば、Reader-Writer パターンでは、リーダー用とライター用の異なる Condition を使用することで、リーダーとライターを異なる方法で扱うことができます。synchronized と wait/notify では、単一の待機セットしかありませんが、Condition では複数の待機セットを持つことができます。

---

## Question 10

What can Locks do that synchronized cannot?

❌ it can open on one JVM and end on a different one

❌ It can initiate on a field and conclude on a method parameter

✅ it can start in one method and ends in a different one

❌ it can begin as one kind of lock and end as a different one

**解説**: synchronized キーワードは、メソッドやブロックのスコープ内でのみ有効で、あるメソッドでロックを取得して別のメソッドで解放することはできません。一方、Lock インターフェース（ReentrantLock など）を使用すると、lock()を 1 つのメソッドで呼び出し、unlock()を別のメソッドで呼び出すことができます。これにより、より柔軟なロック管理が可能になります。

---

## Question 11

Which is not a part of memory that concurrent systems need to consider?

❌ read/write caches near the processor

❌ registers in the processor

❌ main memory on the mainboard

✅ arithmetic logic units of the processors

**解説**: 並行システムでは、メモリ階層の一貫性と可視性が重要な考慮事項です。プロセッサの近くにある読み書きキャッシュ、プロセッサ内のレジスタ、メインボード上のメインメモリはすべて、データの可視性や一貫性に関わるメモリコンポーネントです。一方、算術論理演算ユニット（ALU）は計算を実行する処理ユニットであり、メモリの一部ではありません。

---

## Question 12

Which choice out of the following does not solve the dining philosophers' problem (not even potentially)?

❌ give them timeouts

❌ add a supervisor

❌ for some, reverse which fork they use first

✅ change their identifiers

**解説**: 哲学者の食事問題は、デッドロックを防ぐ必要がある同期問題です。タイムアウトを設定することでデッドロックを回避でき、スーパーバイザーを追加することでリソースの割り当てを管理できます。一部の哲学者がフォークを取る順序を逆にすることで、循環待ちを防げます（非対称的な解決策）。しかし、識別子を変更するだけでは、問題の根本的な構造（共有リソースの競合）は変わりません。

---

## Question 13

Which statement about Java thread scheduling is true?

❌ A. Java guarantees fair scheduling between threads

❌ B. Thread scheduling is deterministic on the same machine

✅ C. Scheduling decisions may vary between executions

❌ D. Threads always run until completion once scheduled

**解説**: Java のスレッドスケジューリングは非決定的です。同じマシン上でも実行ごとにスケジューリングの決定が変わる可能性があります。Java は公平性を保証せず、スレッドはプリエンプティブに中断される可能性があります。

---

## Question 14

Why must a variable captured by a lambda expression be effectively final?

❌ A. To prevent deadlocks

❌ B. To avoid race conditions automatically

✅ C. Because lambdas may execute asynchronously

❌ D. Because lambdas copy variables by value

**解説**: ラムダ式は非同期に実行される可能性があるため、キャプチャされた変数は実質的に final である必要があります。これにより、変数が変更される前にラムダ式が実行される可能性がある問題を防ぎます。デッドロックや race condition の自動回避とは関係なく、実際には変数は参照されます。

---

## Question 15

Which operation is considered a synchronization event in Java?

❌ A. Calling Thread.sleep()

✅ B. Calling Thread.start()

❌ C. Calling System.out.println()

❌ D. Creating a new object

**解説**: `Thread.start()`は同期イベント（synchronization event）であり、happens-before 関係を作成します。`Thread.sleep()`は単なるヒントであり、同期イベントではありません。`System.out.println()`は I/O 操作ですが同期イベントではなく、オブジェクトの作成も同期イベントではありません。

---

## Question 16

Which situation can cause a deadlock?

❌ A. Threads waiting for I/O

❌ B. Threads holding no resources

✅ C. Circular waiting for locks

❌ D. Threads sleeping for long time

**解説**: デッドロックは、複数のスレッドが循環的にロックを待っている場合に発生します。I/O 待ちや長時間のスリープはブロック状態ですが、デッドロックではありません。リソースを保持していないスレッドは進むことができるため、デッドロックにはなりません。

---

## Question 17

Why does ConcurrentHashMap scale better than Collections.synchronizedMap?

❌ A. It uses immutable keys

❌ B. It avoids synchronization entirely

✅ C. It synchronizes only parts of the map

❌ D. It copies data for each thread

**解説**: `ConcurrentHashMap`は、マップの一部（各バケット）のみを同期化する分割ロック（fine-grained locking）を使用するため、`Collections.synchronizedMap`よりも高い並行性を実現できます。`synchronizedMap`は単一のグローバルロックを使用するため、すべての操作が順次実行されます。不変キーの使用やデータのコピーは理由ではありません。

---

## Question 18

When is a local variable NOT thread-confined?

❌ A. When it is declared inside a method

✅ B. When it is returned from the method

❌ C. When the method is synchronized

❌ D. When it is of primitive type

**解説**: ローカル変数がメソッドから返される（参照が外に漏れる、escape する）場合、その変数はスレッドに限定されません。メソッド内で宣言されたローカル変数は通常スレッドに限定されますが、返されることで他のスレッドからアクセス可能になります。同期や型は関係ありません。

---

## Question 19

Which statement about synchronized blocks is correct?

❌ A. They always lock the current thread

❌ B. They lock a class object by default

✅ C. They lock the object specified in parentheses

❌ D. They are slower than synchronized methods

**解説**: `synchronized`ブロックは、括弧内で指定されたオブジェクトのモニタをロックします。スレッドをロックするのではなく、オブジェクトのモニタをロックします。クラスオブジェクトをロックするのは`static synchronized`メソッドのみです。`synchronized`ブロックとメソッドの性能差は保証されません。
