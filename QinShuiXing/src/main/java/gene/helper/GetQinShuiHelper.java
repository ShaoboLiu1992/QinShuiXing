package gene.helper;

import org.odftoolkit.odfdom.converter.core.utils.IOUtils;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Administrator on 2017/8/29.
 */
public class GetQinShuiHelper {

    public static List<String> getQinShui(String params, Integer type) {

        String[] strs = params.split(",");
        List<String> list = new ArrayList<>();

        switch (type){
            case 0:
                for(String st : strs){
                    list.add(parasBody0(st));
                }
                break;
            case 1:
                for(String st : strs){
                    list.add(parasBody1(st));
                }
                break;
            case 2:
                for(String st : strs){
                    list.add(parasBody2(st));
                }
                break;
            case 3:
                for(String st : strs){
                    list.add(parasBody3(st));
                }
                break;
        }
        return list;
    }

    public static String parasBody0(String param) {
        String regex = "";
        try{
            // Configure and open a connection to the site you will send the request
            URL url = new URL("http://www.chinapeptides.com/toolcfuben.php?isCalu=1");
            URLConnection urlConnection = url.openConnection();
            // 设置doOutput属性为true表示将使用此urlConnection写入数据
            urlConnection.setDoOutput(true);
            // 定义待写入数据的内容类型，我们设置为application/x-www-form-urlencoded类型
            urlConnection.setRequestProperty("content-type", "application/x-www-form-urlencoded");
            // 得到请求的输出流对象
            OutputStreamWriter out = new OutputStreamWriter(urlConnection.getOutputStream());
            // 把数据写入请求的Body
            String params = "NTer=0&Amino=" + param.toUpperCase() + "&CTer=0&x=33&y=16";
            out.write(params);
            out.flush();
            out.close();

            // 从服务器读取响应
            InputStream inputStream = urlConnection.getInputStream();
            String encoding = urlConnection.getContentEncoding();
            String body = IOUtils.toString(inputStream, encoding);

            Matcher matcher = Pattern.compile("平均亲水性:</td>(\\r\\n\\s+)<td>(.*?\\d+.\\d+)</td>").matcher(body);
            while(matcher.find()){
                regex = matcher.group(2);
                System.out.println(regex);
            }
        }catch(IOException e){
            e.printStackTrace();
        }
        return  regex;
    }

    public static String parasBody1(String param) {
        String regex = "";
        try{
            // Configure and open a connection to the site you will send the request
            URL url = new URL("http://web.expasy.org/cgi-bin/protparam/protparam");
            URLConnection urlConnection = url.openConnection();
            // 设置doOutput属性为true表示将使用此urlConnection写入数据
            urlConnection.setDoOutput(true);
            // 定义待写入数据的内容类型，我们设置为application/x-www-form-urlencoded类型
            urlConnection.setRequestProperty("content-type", "application/x-www-form-urlencoded");
            // 得到请求的输出流对象
            OutputStreamWriter out = new OutputStreamWriter(urlConnection.getOutputStream());
            // 把数据写入请求的Body
            String params = "prot_id=&sequence=" + param.toUpperCase() + "&mandatory=";
            out.write(params);
            out.flush();
            out.close();

            // 从服务器读取响应
            InputStream inputStream = urlConnection.getInputStream();
            String encoding = urlConnection.getContentEncoding();
            String body = IOUtils.toString(inputStream, encoding);
            Matcher matcher = Pattern.compile("Grand\\s+average\\s+of\\s+hydropathicity\\s+\\(GRAVY\\):</B>\\s+(.*?)\\n").matcher(body);
            while(matcher.find()){
                regex = matcher.group(1);
                System.out.println(regex);
            }
        }catch(IOException e){
            e.printStackTrace();
        }
        return  regex;
    }

    public static String parasBody2(String param) {
        String regex = "";
        try{
            // Configure and open a connection to the site you will send the request
            URL url = new URL("http://pepcalc.com/ppc.php");
            URLConnection urlConnection = url.openConnection();
            // 设置doOutput属性为true表示将使用此urlConnection写入数据
            urlConnection.setDoOutput(true);
            // 定义待写入数据的内容类型，我们设置为application/x-www-form-urlencoded类型
            urlConnection.setRequestProperty("content-type", "application/x-www-form-urlencoded");
            // 得到请求的输出流对象
            OutputStreamWriter out = new OutputStreamWriter(urlConnection.getOutputStream());
            // 把数据写入请求的Body
            String params = "hideInputFields=no&nTerm=%28NH2-%29&sequence=" + param.toUpperCase() + "&cTerm=%28-COOH%29&aaCode=0&disulphideBonds=";
            out.write(params);
            out.flush();
            out.close();

            // 从服务器读取响应
            InputStream inputStream = urlConnection.getInputStream();
            String encoding = urlConnection.getContentEncoding();
            String body = IOUtils.toString(inputStream, encoding);
            Matcher matcher = Pattern.compile("Estimated\\s+solubility:</td>\\r\\n\\s+<td\\s+colspan=\"2\">(.*?)</td>").matcher(body);
            while(matcher.find()){
                regex = matcher.group(1);
                System.out.println(regex);
            }
        }catch(IOException e){
            e.printStackTrace();
        }
        return  regex;
    }

    public static String parasBody3(String param) {
        String regex = "";
        String url = "http://crdd.osdd.net/raghava/toxinpred/pepsearch_S.php?seq=" + param + "&thval=0.0";
        String body = sendGet(url);
        Matcher matcher = Pattern.compile("http-equiv='refresh'\\s+content='0;url=(.*)'\\s+/>").matcher(body);
        while(matcher.find()){
            regex = matcher.group(1);
        }
        url = "http://crdd.osdd.net/raghava/toxinpred/" + regex;
        body = sendGet(url);
        matcher = Pattern.compile("<td align=center>(\\w+.\\w+)</td></tr>").matcher(body);
        while(matcher.find()){
            regex = matcher.group(1);
            System.out.println(regex);
            break;
        }
        return  regex;
    }


    public static String sendGet(String url) {
        String result = "";
        BufferedReader in = null;
        try {
            String urlNameString = url;
            URL realUrl = new URL(urlNameString);
            // 打开和URL之间的连接
            URLConnection connection = realUrl.openConnection();
            // 设置通用的请求属性
            connection.setRequestProperty("accept", "*/*");
            connection.setRequestProperty("connection", "Keep-Alive");
            connection.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            // 建立实际的连接
            connection.connect();
            // 定义 BufferedReader输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                result += line;
            }
        } catch (Exception e) {
        }
        // 使用finally块来关闭输入流
        finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return result;
    }
}
