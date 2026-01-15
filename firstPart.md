# ネットワーク試験問題集

## FIRST PART

### Question 1
**Select the three main advantages of packet-switched networks!**

**Answer:**
- ✅ **Efficient resource management**
- ✅ **Simple implementation**
- Predictable performance with guarantees
- ✅ **Good fault tolerance**
- Low performance in case of bursty traffic or short data flows
- Complex circuit establishment and tear-down phases

---

### Question 2
**Which layer of ISO/OSI is responsible for media access control?**

**Answer:**
- L4-Transport
- ✅ **L2-Data link**
- L7-Application
- L5-Session
- L1-Physical
- L3-Network
- L6-Presentation

---

### Question 3
**Which statements are true for the baseband transmission?**

**Answer:**
- The signal is transmitted in a wide band of the frequency range instead of the entire range.
- ✅ **The signal is tranmitted using the entire frequency range.**
- The signal is encoded into a carrier wave by a technique called modulation.
- ✅ **The digital signal is directly converted into current or voltage.**

---

### Question 4
**Which statements are true for the simplex stop-and-wait protocol (noisy channel)?**

**Answer:**
- It requires a full duplex channel.
- It contnously sends packets using the pipeline technique.
- ✅ **Lost acnkowledgments result in duplicate packet reception at the reciever side.**
- ✅ **In case of packet loss, the lost packet is retransmitted after a timeout period. The timeout is managed by a timer.**

---

### Question 5
**What does the property called "carrier sensing" mean?**

**Answer:**
- The station can sense the error of the carrier wave.
- ✅ **The stations can check the state of the physical media before data tranmission. The channel could be idle or busy.**
- The stations get information about the channel state from a central server or entity.
- The channel state can be determined with a modified carrier wave. The wave is modified by modulation.

---

### Question 6
**Which statements are true?**

**Answer:**
- ✅ **CSMA/CD is not needed in switches.**
- Every bridge is a switch.
- Each port of a switch can only be connected to an end-host or another switch.
- ✅ **End-hosts are connected to switches with full duplex links.**
- CSMA/CD is not needed in bridges.

---

### Question 7
**Which IPv4 address class results in the smallest number of IP blocks?**  
With other terms: which address class can be used in the smallest number of networks?  
How many entities can own an IP range from a given class, where is this number the smallest?

**Answer:**
- Class C
- Class B
- The number is the same in each class
- ✅ **Class A**

---

### Question 8
**Select the three key components of computer networks!**

**Answer:**
- CPU
- copper cable
- ✅ **end-hosts**
- fluxus condensator
- hoax cable
- monitor
- ✅ **links**
- ✅ **switches/Routers**

---

### Question 9
**What additional services are implemented by TCP (in addition to IP)?**

**Answer:**
- Non-reliable data transport, but it ensures in-order delivery.
- ✅ **Connection oriented services.**
- ✅ **Reliable data transport with in-order delivery.**
- Connection-less datagram service.

---

### Question 10
**Which statements are true for alternating bit protocol (ABP)?**

**Answer:**
- It requires a full duplex channel.
- ✅ **Packets carry a sequence number which is either 0 or 1.**
- ✅ **Lost acknowledgments result in duplicate packet reception at the receiver side.**
- ✅ **The sequence number enables the receiver to recognize duplicate packets.**

---

### Question 11
**Which statements are true for broadband transmission?**

**Answer:**
- ✅ **The signal is transmitted in a wide band of the frequency range instead of the entire range**
- The signal is transmitted using the entire frequency range.
- The digital signal is directly converted into current or voltage.
- ✅ **The signal is encoded into a carrier wave by a technique called modulation.**

---

### Question 12
**Select the three main disadvantages of circuit-switched networks!**

**Answer:**
- Buffer-management is needed
- Unpredictable performance
- ✅ **New circuit is needed in case of failure**
- ✅ **Complex circuit establishment and tear-down phases**
- ✅ **Low performance in case of bursty traffic or short data flows**
- Congestion control is needed

---

### Question 13
**Which statements are true for the sliding window protocol?**

**Answer:**
- Lost acknowledgments result in duplicate packet reception at the receiver side.
- ✅ **It requires a full duplex channel. Data and acknowledgment packets can travel simultaneously.**
- ✅ **Frames with sequence numbers that are not in the receiving window are ignored by the receiver. Acks are also sent for these packets.**
- ✅ **Acknowledgements and the ack numbers are used to enable the sender to transmit more data (e.g., the next frame).**

---

### Question 14
**TCP is very efficient for transmitting web traffic, since it can almost fully utilize the available bandwidth in the network.**  
Is it true or false?

**Answer:**  
✅ **true**

---

### Question 15
**Packet loss can only be cause by network congestion, so it is a clear evidence of network congestion?**  
Is it true or false?

**Answer:**  
✅ **false**

---

### Question 16
**Using its "Cubic function," TCP CUBIC can ramp up its sending rate faster than the slow start mechanism.**  
Is it true or false?

**Answer:**  
✅ **true**

---

### Question 17
**Packet loss can only be caused by network congestion, so it is clear evidence of network congestion.**  
Is it true or false?

**Answer:**  
✅ **false**

---

### Question 18
**What does the reception of three duplicate acknowledgements mean in TCP Reno?**  
Select one correct option

**Answer:**
- It is like a single acknowledgement.
- ✅ **Packet loss**
- Good transmission.
- Sliding the window by 3 segments.

---

### Question 19
**Which statement is true for pure ALOHA?**  
Select one correct option

**Answer:**
- ✅ **If there is data to be sent, it sends the data. The data is transmitted immediately.**
- When the data is ready for transmission, the frame will be sent at the boundary of the next time slot.
- Before transmission, the station checks the physical media. If it is idle, it sends the data with probability p and waits for the next slot with probability 1-p.
- Before transmission, the station checks the physical media. If it is idle, it sends the data.

---

### Question 20
**Select the IPv4 address class where the largest number of hosts can be defined?**  
Select one correct option

**Answer:**
- Class B
- ✅ **Class A**
- The same number of hosts can be defined in each class.
- Class C

---

### Question 21
**Which layer of ISO/OSI does contain TCP?**  
Select one correct option

**Answer:**
- L5-Session
- L6-Presentation
- L1-Physical
- L3-Network
- ✅ **L4-Transport**
- L7-Application
- L2-Data link

---

### Question 22
**Which statement is true for the Physical layer?**  
Select one correct option

**Answer:**
- Transferring messages between two applications
- All the data is transmitted via radio waves
- Applying error correction to handle channel noise
- ✅ **Transferring information (bits) between two physically interconnected devices**

---

### Question 23
**What is true for Spanning Tree Protocol (STP) used by bridges?**  
Select one correct option

**Answer:**
- ✅ **The root of the spanning tree is the bridge with the smallest bridge ID.**
- A centralized algorithm calculates the tree and reconfigures the bridges accordingly.
- It enables loops in the topology if the performance can be increased this way.
- In case of unknown destination, we send the frame to all the neighbors and wait for replies.

---

### Question 24
**There is a code S whose Hamming-distance d(S)=2.**  
How many simple bit-errors can we detect with the use of code S?  
Enter the answer

**Answer:**  
**1**

---

### Question 25
**There is a code S whose Hamming-distance d(S)=15.**  
How many simple bit-errors can we detect with the use of code S?  
Enter the answer

**Answer:**  
**14**

---

## SECOND PART

### Question 1
**What is slow start in TCP? What is its purpose? Why is it needed? How "slow" is it?**  
**How does it affect the performance of short flows like web traffic?**

**Answer:**

> Slow start in TCP is a congestion control mechanism that gradually increases the sending rate to avoid overwhelming the network. It starts with a small congestion window (usually one or two segments) and doubles it every round-trip time (RTT) until packet loss occurs or the window reaches the threshold. It is essential to prevent congestion collapse when a connection first starts, as the network capacity is unknown. However, for short flows like web traffic, slow start can delay the delivery of data because the initial window grows conservatively, limiting performance.

---

### Question 2
**Describe how name resolution works (DNS)!**  
(Name resultion modes: recursive and iterative – two examples are enough)

**Answer:**

> DNS name resolution translates human-readable domain names into IP addresses. In recursive resolution, a DNS server queries other servers on behalf of the client until it finds the final IP address, returning the result directly to the client. In iterative resolution, the DNS server responds with a referral to another DNS server closer to the answer, and the client continues querying each referred server. For example, in recursive mode, a client requests example.com, and the DNS server handles the process entirely; in iterative mode, the client queries multiple servers step-by-step.

---

### Question 3
**Compare ALOHA and slotted ALOHA! Which one is better? Why?**

**Answer:**

> ALOHA allows stations to send data at any time, leading to frequent collisions, while slotted ALOHA restricts transmissions to fixed time slots, reducing collision chances. Slotted ALOHA achieves a maximum throughput of 37% compared to 18% in pure ALOHA because it halves the vulnerable time for collisions. However, slotted ALOHA requires synchronization of time slots, adding complexity. Despite this, slotted ALOHA is better due to its significantly higher efficiency and reduced collision probability.

---

### Question 4
**Compare p-persistent and 1-persistent CSMA!**  
**Describe both methods and write about their performance under various load!**

**Answer:**

> In 1-persistent CSMA, a station senses the channel and transmits immediately when idle, leading to high collisions under heavy load. In p-persistent CSMA, a station transmits with a probability p when the channel is idle and defers with 1−p, reducing collision likelihood. Under low load, 1-persistent performs well due to minimal idle waiting time, but under high load, collisions degrade its performance. In contrast, p-persistent performs better in high loads because it reduces simultaneous transmissions, improving overall efficiency.

---

### Question 5
**Compare p-persistent and non-persistent CSMA!**  
**Describe both methods and write about their performance under various load!**

**Answer:**

> In non-persistent CSMA, a station senses the channel, and if busy, waits a random time before sensing again, reducing the chance of collisions. In p-persistent CSMA, the station transmits with probability p when the channel is idle, adding a controlled waiting mechanism. Under low load, p-persistent performs similarly to non-persistent but is slightly less efficient due to probability delays. Under high load, non-persistent CSMA reduces collisions more effectively than p-persistent because stations avoid persistent channel sensing.

---

### Question 6
**Describe how byte-stuffing works (FRAMING)!**  
**Also show an example!**

**Answer:**

> Byte-stuffing is a framing technique that adds escape characters to differentiate control bytes from data in a frame. If a special byte (e.g., the flag byte F) appears in the data, it is "stuffed" with an escape character (ESC) followed by a modified version of the byte. For example, in the frame Data: FESCAB, the stuffed output becomes ESCFESCESCAB. This ensures the receiver can accurately detect frame boundaries by removing escape sequences during decoding.

---

### Question 7
**Compare 1-persistent and non-persistent CSMA!**  
**Describe both methods and write about their performance under various load!**

**Answer:**

> In 1-persistent CSMA, a station immediately transmits when it senses the channel is idle, but collisions are likely when multiple stations compete. In non-persistent CSMA, stations sense the channel and wait a random time if the channel is busy, reducing collisions at the cost of increased idle time. Under low load, 1-persistent performs well due to quick channel access, while non-persistent introduces unnecessary delays. Under high load, non-persistent performs better because its randomized backoff significantly reduces collisions compared to 1-persistent.

---

### Question 8
**Briefly introduce the main differences between classic TCP congestion controls (e.g., Tahoe, Reno) and DCTCP!**  
**Why cannot DCTCP be deployed all over the Internet? Why was it developed?**

**Answer:**

> Classic TCP congestion controls like Tahoe and Reno rely on packet loss as an indicator of congestion, using slow start and congestion avoidance mechanisms. DCTCP (Data Center TCP), on the other hand, leverages Explicit Congestion Notification (ECN) to measure and react to congestion proactively, reducing packet loss. DCTCP cannot be deployed globally because ECN support is not ubiquitous across the public Internet, and it was specifically developed for low-latency, high-bandwidth data centers. It improves throughput and minimizes latency in data center environments where precise congestion control is crucial.

---

### Question 9
**Show the relationship between the Hamming-distance and error detection and correction properties of the code!**  
**Sketch the "proofs" with some examples!**

**Answer:**

> The Hamming distance of a code is the minimum number of bit changes required to transform one valid codeword into another. To detect k errors, the Hamming distance must be at least k+1, and to correct k errors, it must be 2k+1. For example, a code with distance 3 can detect up to 2 errors but correct only 1. If two codewords are 000 and 111, their Hamming distance is 3, which means they can correct 1-bit errors and detect up to 2-bit errors.

---

### Question 10
**Describe how bit-stuffing works (FRAMING)! Also show an example!**

**Answer:**

> Bit-stuffing is a framing technique where extra bits are inserted into the data stream to avoid confusion with special flag sequences. In protocols like HDLC, if five consecutive 1 bits appear in the data, a 0 bit is inserted to prevent a false frame boundary. For example, if the data is 111110101, it is transmitted as 1111100101. The receiver removes the stuffed 0 bits upon detecting five consecutive 1s, restoring the original data.

---

### Question 11
**Compare path vector routing and distance vector routing protocols! What are the key differences?**  
**Where do we use them? What about the count-to-infinity problem?**

**Answer:**

> In distance vector routing, routers share their distance to destinations as cost values with neighbors, using algorithms like RIP. In path vector routing, routers share the entire path to a destination, preventing loops by maintaining path information, as seen in BGP. Path vector protocols avoid the count-to-infinity problem inherent in distance vector routing by explicitly identifying paths rather than relying solely on distance metrics. Distance vector protocols are suitable for small networks, while path vector protocols are used for large-scale networks like the Internet.
