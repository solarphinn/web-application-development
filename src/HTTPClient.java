import java.io.IOException;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

public class HTTPClient {

    public static void main(String[] args) throws IOException {
        http1_1();
    }

    public static void http1_1() throws IOException {

        Socket sock = new Socket("www.google.com", 80);

        try(PrintWriter writer = new PrintWriter(sock.getOutputStream());
            Scanner scanner = new Scanner(sock.getInputStream())) {

            writer.println("TRACE /index.html HTTP/1.1");
            writer.println("Host: www.google.com");
            writer.println("Connection: close");
            writer.println();
            writer.flush();

            while(scanner.hasNext()) {
                System.out.println(scanner.nextLine());
            }
        }
    }

    public static void http1_0() throws IOException {

        Socket sock = new Socket("www.google.com", 80);

        try(PrintWriter writer = new PrintWriter(sock.getOutputStream());
            Scanner scanner = new Scanner(sock.getInputStream())) {


            writer.println("GET http://www.google.com/index.html HTTP/1.0");
            writer.println();
            writer.flush();

            while(scanner.hasNext()) {
                System.out.println(scanner.nextLine());
            }
        }

    }

}

