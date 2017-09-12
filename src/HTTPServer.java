import java.io.IOException;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;

public class HTTPServer {


    public static void main(String[] args) throws IOException {

        ServerSocket server = new ServerSocket(8088);

        Socket sock = server.accept();

        try(PrintWriter writer = new PrintWriter(sock.getOutputStream());
            Scanner scanner = new Scanner(sock.getInputStream())) {


            String line = null;
            do {
                line = scanner.nextLine();
                System.out.println(line);
            } while( line.equals("") == false);

            writer.println("HTTP/1.1 200 OK");
            writer.println("Content-type: text/html");
            writer.println("Connection: close");
            writer.println();
            writer.println("<html><head></head><body>Hello, world!</body></html>");
            writer.flush();
        }
    }


}
