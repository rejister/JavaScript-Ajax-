
/*
 * マルチスレッドで動作するクラス
 */
class SubThread extends Thread {
    /*
     * このrun()にマルチスレッド動作をするプログラムを記述する
     */
    @Override
    public void run() {
        int count = 10;
        while (count > 0) {
            try {
                sleep(1000);
                System.out.println(count);
                count--;
            }catch (InterruptedException e) {
                e.printStackTrace();
            }

        }
    }
}

class SubRunnable implements Runnable {
    @Override
    public void run() {
        int count = 10;
        while (count > 0) {
            try {
                Thread.sleep(1000);
                System.err.println(count);
                count--;
            }catch (InterruptedException e) {
                e.printStackTrace();
            }

        }
    }
}

public class multi {
    public static void main(String[] args) throws Exception {
        SubThread sb = new SubThread();

        sb.start();
        System.out.println("finish");
        // sb.start();
        SubRunnable sr = new SubRunnable();
        // スレッドを起動することはできない
        // sr.start();
        new Thread(sr).start();
        System.out.println("all finish");
    }
}