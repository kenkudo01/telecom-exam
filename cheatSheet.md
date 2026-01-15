# 🧵 並列処理・並行処理 チートシート（Java）

---

## 0️⃣ まず全体像（超重要）

| 用語                        | 意味                                 |
| --------------------------- | ------------------------------------ |
| **並行（Concurrency）**     | 同時に「進んでいるように見える」     |
| **並列（Parallelism）**     | 実際に同時に実行されている           |
| **Thread**                  | 実行の最小単位                       |
| **共有資源**                | 複数スレッドが触る変数・オブジェクト |
| **競合（Race Condition）**  | 実行順で結果が変わるバグ             |
| **同期（Synchronization）** | 競合を防ぐ制御                       |

---

## 1️⃣ Thread の作り方（基本）

### 🔹 Thread を継承

```java
class MyThread extends Thread {
    public void run() {
        System.out.println("Hello");
    }
}
new MyThread().start();
```

**特徴:**

- ✔ シンプル
- ❌ 継承を消費する（他を extends できない）

---

### 🔹 Runnable を実装（推奨）

```java
Runnable r = () -> System.out.println("Hello");
new Thread(r).start();
```

**特徴:**

- ✔ 柔軟・Executor と相性 ◎
- ✔ 実務では基本これ

---

## 2️⃣ start / run / join

| メソッド  | 意味                                     |
| --------- | ---------------------------------------- |
| `start()` | **新しいスレッド**として実行開始         |
| `run()`   | 普通のメソッド呼び出し（並列にならない） |
| `join()`  | 他スレッドの終了を待つ                   |

```java
t.start();
t.join(); // InterruptedException 必須
```

📌 **join は必ず InterruptedException を考慮**

---

## 3️⃣ synchronized（モニタロック）

### 🔹 メソッド単位

```java
public synchronized void inc() {
    count++;
}
```

### 🔹 ブロック単位

```java
synchronized (lockObject) {
    count++;
}
```

| 特徴       | 内容                   |
| ---------- | ---------------------- |
| ロック対象 | オブジェクト           |
| 同時実行   | 1 スレッドのみ         |
| 解除       | ブロックを抜けると自動 |

❗ 過剰に使うと **性能劣化**

---

## 4️⃣ wait / notify / notifyAll

### 🔹 基本構文

**待機側:**

```java
synchronized (lock) {
    while (!condition) {
        lock.wait();
    }
}
```

**通知側:**

```java
synchronized (lock) {
    condition = true;
    lock.notifyAll();
}
```

### 重要ルール（試験＆実務）

| ルール                | 理由             |
| --------------------- | ---------------- |
| synchronized 必須     | モニタ所有が必要 |
| while で待つ          | 偽起床対策       |
| notify より notifyAll | デッドロック回避 |

📌 `IllegalMonitorStateException` = synchronized 忘れ

---

## 5️⃣ volatile

```java
volatile boolean running = true;
```

| 効果     | あり / なし |
| -------- | ----------- |
| 可視性   | ✅          |
| 排他制御 | ❌          |
| 原子性   | ❌          |

**用途:**

- ✔ フラグ・状態通知用
- ❌ カウンタには使えない

---

## 6️⃣ Lock / Condition（上位 API）

### 🔹 Lock とは？

`synchronized` の上位互換的な明示的なロック機構。より柔軟な制御が可能。

```java
Lock lock = new ReentrantLock();
lock.lock();
try {
    // クリティカルセクション
} finally {
    lock.unlock(); // 必ず finally で unlock
}
```

### 🔹 synchronized との違い

| 項目             | synchronized                    | Lock                                   |
| ---------------- | ------------------------------- | -------------------------------------- |
| **ロック取得**   | 自動（ブロック終了で解除）      | 明示的（`lock()` / `unlock()`）        |
| **複数条件**     | 1 つの条件のみ（`wait/notify`） | 複数の `Condition` を持てる            |
| **タイムアウト** | なし                            | `tryLock(timeout)` で可能              |
| **割り込み**     | 待機中は割り込み不可            | `lockInterruptibly()` で割り込み可能   |
| **公平性**       | 保証なし                        | `ReentrantLock(true)` で公平ロック可能 |

### 🔹 Condition とは？

**Condition = 条件付き待機キュー**

`synchronized` の `wait/notify` をより柔軟にしたもの。**1 つの Lock に対して複数の Condition を作れる**のが最大の特徴。

```java
Lock lock = new ReentrantLock();
Condition notFull = lock.newCondition();  // 「満杯でない」条件
Condition notEmpty = lock.newCondition(); // 「空でない」条件
```

### 🔹 Condition の基本メソッド

| メソッド               | 意味                        | wait/notify との対応 |
| ---------------------- | --------------------------- | -------------------- |
| `await()`              | 条件が満たされるまで待つ    | `wait()`             |
| `signal()`             | 待機中の 1 スレッドを起こす | `notify()`           |
| `signalAll()`          | 待機中の全スレッドを起こす  | `notifyAll()`        |
| `await(timeout, unit)` | タイムアウト付き待機        | `wait(timeout)`      |

### 🔹 基本的な使い方パターン

#### パターン 1: 単一条件の待機

```java
Lock lock = new ReentrantLock();
Condition ready = lock.newCondition();
boolean isReady = false;

// 待機側
lock.lock();
try {
    while (!isReady) {  // while で待つ（偽起床対策）
        ready.await();
    }
    // 条件が満たされた後の処理
} finally {
    lock.unlock();
}

// 通知側
lock.lock();
try {
    isReady = true;
    ready.signalAll();  // または signal()
} finally {
    lock.unlock();
}
```

#### パターン 2: 複数条件を使う（Producer-Consumer 例）

```java
class BoundedBuffer {
    private final Lock lock = new ReentrantLock();
    private final Condition notFull = lock.newCondition();   // 満杯でない
    private final Condition notEmpty = lock.newCondition();  // 空でない

    private final Object[] items = new Object[100];
    private int putptr, takeptr, count;

    public void put(Object x) throws InterruptedException {
        lock.lock();
        try {
            while (count == items.length) {  // 満杯なら待つ
                notFull.await();
            }
            items[putptr] = x;
            if (++putptr == items.length) putptr = 0;
            ++count;
            notEmpty.signal();  // 空でなくなったので通知
        } finally {
            lock.unlock();
        }
    }

    public Object take() throws InterruptedException {
        lock.lock();
        try {
            while (count == 0) {  // 空なら待つ
                notEmpty.await();
            }
            Object x = items[takeptr];
            if (++takeptr == items.length) takeptr = 0;
            --count;
            notFull.signal();  // 満杯でなくなったので通知
            return x;
        } finally {
            lock.unlock();
        }
    }
}
```

### 🔹 wait/notify との比較

#### synchronized + wait/notify の場合

```java
synchronized (lock) {
    while (!condition1) {
        lock.wait();  // 1つの条件しか待てない
    }
    // 条件2を待ちたい場合は別のロックが必要
}
```

**問題点:**

- 1 つのオブジェクトに 1 つの待機キューしかない
- 複数の条件を区別できない
- 全ての待機スレッドが同じキューに入る

#### Lock + Condition の場合

```java
Lock lock = new ReentrantLock();
Condition condition1 = lock.newCondition();
Condition condition2 = lock.newCondition();

lock.lock();
try {
    while (!ready1) {
        condition1.await();  // 条件1専用の待機キュー
    }
    while (!ready2) {
        condition2.await();  // 条件2専用の待機キュー
    }
} finally {
    lock.unlock();
}
```

**利点:**

- 1 つの Lock に複数の Condition を作れる
- 条件ごとに待機キューを分けられる
- 必要なスレッドだけを起こせる（効率的）

### 🔹 重要なルール

| ルール                                              | 理由                                                   | 違反すると                     |
| --------------------------------------------------- | ------------------------------------------------------ | ------------------------------ |
| **`lock()` の後は必ず `try-finally` で `unlock()`** | 例外発生時もロックを解放するため                       | デッドロック                   |
| **`await()` の前後で `lock()` 必須**                | Condition は Lock に紐づいているため                   | `IllegalMonitorStateException` |
| **`while` で条件チェック**                          | 偽起床（spurious wakeup）対策                          | バグの原因                     |
| **`signalAll()` を優先**                            | `signal()` は 1 つだけ起こすため、デッドロックの可能性 | デッドロック                   |

### 🔹 実用例: 読み書きロックのイメージ

```java
Lock lock = new ReentrantLock();
Condition canRead = lock.newCondition();
Condition canWrite = lock.newCondition();
int readers = 0;
boolean writing = false;

// 読み取り側
public void read() throws InterruptedException {
    lock.lock();
    try {
        while (writing) {  // 書き込み中は待つ
            canRead.await();
        }
        readers++;
    } finally {
        lock.unlock();
    }

    // 読み取り処理...

    lock.lock();
    try {
        readers--;
        if (readers == 0) {
            canWrite.signal();  // 読み取り終了を書き込み側に通知
        }
    } finally {
        lock.unlock();
    }
}

// 書き込み側
public void write() throws InterruptedException {
    lock.lock();
    try {
        while (writing || readers > 0) {  // 書き込み中 or 読み取り中は待つ
            canWrite.await();
        }
        writing = true;
    } finally {
        lock.unlock();
    }

    // 書き込み処理...

    lock.lock();
    try {
        writing = false;
        canRead.signalAll();  // 読み取り待機中の全スレッドに通知
        canWrite.signal();    // 書き込み待機中のスレッドにも通知
    } finally {
        lock.unlock();
    }
}
```

### 🔹 いつ使うべきか？

| 状況                 | 推奨                  |
| -------------------- | --------------------- |
| 単純な排他制御       | `synchronized` で十分 |
| 複数の待機条件がある | `Lock + Condition`    |
| タイムアウトが必要   | `Lock + Condition`    |
| 公平性が重要         | `ReentrantLock(true)` |
| 割り込み可能な待機   | `lockInterruptibly()` |

### 🔹 よくある間違い

```java
// ❌ 間違い: unlock を忘れる
lock.lock();
try {
    // 処理
} // finally がない → デッドロック

// ❌ 間違い: lock せずに await
condition.await(); // IllegalMonitorStateException

// ❌ 間違い: if で条件チェック
if (!ready) {
    condition.await(); // 偽起床でバグ
}

// ✅ 正しい
lock.lock();
try {
    while (!ready) {
        condition.await();
    }
} finally {
    lock.unlock();
}
```

### 🔹 まとめ

- **Lock**: `synchronized` の明示的版。より柔軟な制御が可能
- **Condition**: `wait/notify` の上位版。**複数の条件を区別できる**
- **最大の利点**: 1 つの Lock に複数の Condition を作れることで、条件ごとに待機キューを分けられる
- **必須**: `try-finally` で `unlock()`、`while` で条件チェック

---

## 7️⃣ BlockingQueue（超重要）

### 🔹 代表的実装

| クラス                  | 特徴       |
| ----------------------- | ---------- |
| `ArrayBlockingQueue`    | 固定長     |
| `LinkedBlockingQueue`   | 可変長     |
| `PriorityBlockingQueue` | 優先度付き |

### 🔹 take / put / poll の違い

| メソッド        | 動作         |
| --------------- | ------------ |
| `put(x)`        | 満杯なら待つ |
| `take()`        | 空なら待つ   |
| `poll()`        | 空なら null  |
| `poll(t, unit)` | 時間付き待ち |

📌 **Pipeline / Producer-Consumer の王道**

---

## 8️⃣ ExecutorService（実務必須）

```java
ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(() -> work());
pool.shutdown();
```

| 種類                      | 用途       |
| ------------------------- | ---------- |
| `newSingleThreadExecutor` | 直列       |
| `newFixedThreadPool(n)`   | 並列制限   |
| `newCachedThreadPool`     | 短命タスク |
| `newWorkStealingPool`     | CPU 最適化 |

✔ Thread を直接 new しないのが実務

---

## 9️⃣ Future / Callable

```java
Future<Integer> f = pool.submit(() -> 42);
int v = f.get(); // 待つ
```

| ポイント                  |
| ------------------------- |
| 戻り値あり                |
| get() はブロック          |
| InterruptedException 注意 |

---

## 🔟 よくあるバグ集（重要）

| バグ                 | 原因                       |
| -------------------- | -------------------------- |
| 無限ループ           | 終了条件が共有されていない |
| 値がおかしい         | 同期不足                   |
| プログラム終了しない | non-daemon thread          |
| NullPointerException | auctionQueue 参照競合      |
| IllegalMonitorState  | wait/notify 位置ミス       |

---

## 🧠 思考モデル（これが一番大事）

### 並列処理で常に考える 3 点

1. **誰が共有している？**
2. **いつ変更される？**
3. **順序は保証されている？**

---

## ✨ まとめ（試験＆実務用）

- Thread → **Runnable + Executor**
- 共有変数 → **synchronized / Lock**
- 待ち合わせ → **wait/notify or BlockingQueue**
- 通信 → **BlockingQueue**
- 終了管理 → **join / isAlive / shutdown**

---

## 📚 学習のすすめ

1. Producer–Consumer を図で説明
2. AuctionHouse を UML + 時系列で整理
3. wait/notify と BlockingQueue の思想比較
4. 試験で出る「ひっかけ問題集」
