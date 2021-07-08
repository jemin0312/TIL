> 쓰레드를 생성하는 방법은 두 가지가 있다. 

- 쓰레드를 상속받아서 사용하는 방법 
```java
public class ThreadTest extends Thread{

    @Override
    public synchronized void start() {
        super.start();
        System.out.println("실행");
    }

    @Override
    public void run() {
        super.run();
    }
}
``` 
- Runnable을 구현해서 사용하는 방법 

```java
public class ImplementRunnable implements Runnable{
    @Override
    public void run() {

    }
}

```
