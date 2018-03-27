package gene.helper;

import gene.model.BackModel;
import org.apache.commons.collections.map.HashedMap;
import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.PoolingClientConnectionManager;
import org.apache.http.util.EntityUtils;
import org.odftoolkit.odfdom.converter.core.utils.IOUtils;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Administrator on 2017/8/29.
 */
public class GetQinShuiHelper {

    public static List<BackModel> getQinShui(String params, Integer type) {

        String[] strs = params.split(",");
        List<BackModel> list = new ArrayList<BackModel>();


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
            case 4:
                for(String st : strs){
                    list.add(parasBody4(st));
                }
                break;
            case 5:
                for(String st : strs){
                    list.add(parasBody5(st));
                }
                break;
        }
        return list;
    }

    public static BackModel parasBody0(String param) {
        BackModel backModel = new BackModel();
        String regex = "";
        try{
            // Configure and open a connection to the site you will send the request
            URL url = new URL("http://www.chinapeptides.com/toolcfuben.php?isCalu=1");
            URLConnection urlConnection = url.openConnection();
            // 设置doOutput属性为true表示将使用此urlConnection写入数据
            urlConnection.setDoOutput(true);
            urlConnection.setConnectTimeout(300000);
            urlConnection.setReadTimeout(300000);
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
        backModel.setData(regex);
        return  backModel;
    }

    public static BackModel parasBody1(String param) {
        BackModel backModel = new BackModel();
        String regex = "";
        try{
            // Configure and open a connection to the site you will send the request
            URL url = new URL("http://web.expasy.org/cgi-bin/protparam/protparam");
            URLConnection urlConnection = url.openConnection();
            // 设置doOutput属性为true表示将使用此urlConnection写入数据
            urlConnection.setDoOutput(true);
            urlConnection.setConnectTimeout(300000);
            urlConnection.setReadTimeout(300000);
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
        backModel.setData(regex);
        return  backModel;
    }

    public static BackModel parasBody2(String param) {
        BackModel backModel = new BackModel();
        String regex = "";
        try{
            //设置代理
            // Configure and open a connection to the site you will send the request
            URL url = new URL("https://pepcalc.com/ppc.php");
            URLConnection urlConnection = url.openConnection();
            // 设置doOutput属性为true表示将使用此urlConnection写入数据
            urlConnection.setDoOutput(true);
//            urlConnection.setConnectTimeout(300000);
//            urlConnection.setReadTimeout(300000);
            // 定义待写入数据的内容类型，我们设置为application/x-www-form-urlencoded类型
            urlConnection.setRequestProperty("content-type", "application/x-www-form-urlencoded");
            // 得到请求的输出流对象
            OutputStreamWriter out = new OutputStreamWriter(urlConnection.getOutputStream());
            // 把数据写入请求的Body
            String params = "hideInputFields=no&nTerm=%28NH2-%29&sequence=" + param.toUpperCase() + "&cTerm=%28-COOH%29&aaCode=0&disulphideBonds=";
            out.write(params);
            out.flush();
            out.close();

            String sessionId = "";
            String cookieVal = "";
            String key = null;
            //取cookie
            for(int i = 1; (key = urlConnection.getHeaderFieldKey(i)) != null; i++){
                if(key.equalsIgnoreCase("set-cookie")){
                    cookieVal = urlConnection.getHeaderField(i);
                    cookieVal = cookieVal.substring(0, cookieVal.indexOf(";"));
                    sessionId = sessionId + cookieVal + ";";
                }
            }
            // 从服务器读取响应
            InputStream inputStream = urlConnection.getInputStream();
            String encoding = urlConnection.getContentEncoding();
            String body = IOUtils.toString(inputStream, encoding);
            Matcher matcher = Pattern.compile("Estimated\\s+solubility:</td>\\r\\n\\s+<td\\s+colspan=\"2\">(.*?)</td>").matcher(body);
            while(matcher.find()){
                regex = matcher.group(1);
                System.out.println(regex);
            }
            backModel.setData(regex);
            matcher = Pattern.compile("Iso-electric\\s+point:</td>\\r\\n\\s+<td\\s+colspan=\"2\">(.*?)</td>").matcher(body);
            while(matcher.find()){
                regex = matcher.group(1);
                System.out.println(regex);
            }
            backModel.setpI(regex);
            matcher = Pattern.compile("<img src=\"(.*?)\"\\s+alt=\"Hydropathy\\s+plot,\\s+Hopp\\s+&\\s+Woods\"\\s+height=\"140\" width=\"580\"></td>").matcher(body);
            while(matcher.find()){
                regex = matcher.group(1);
                System.out.println(regex);
            }
            backModel.setImgUrl(getImage("https://pepcalc.com/" + regex, cookieVal));
        }catch(IOException e){
            e.printStackTrace();
        }

        return  backModel;
    }

    public static BackModel parasBody3(String param) {


        BackModel backModel = new BackModel();
        String body = "";
        String regex = "";
        Map<String, String> parameters = new HashedMap();
        parameters.put("seq", param);
        parameters.put("eval", "10");
        parameters.put("thval", "0.0");
        parameters.put("method", "1");
        parameters.put("field[]", "12");
        Map<String, Object> map = null;
        map = executePostByUsual("http://crdd.osdd.net/raghava/toxinpred/pep_test.php" ,parameters);

        Matcher matcher = Pattern.compile("http-equiv='refresh'\\s+content='0;url=(.*)'\\s+/>").matcher(map.get("response").toString());
        while(matcher.find()){
            regex = matcher.group(1);
        }
        body = sendGet3("http://crdd.osdd.net/raghava/toxinpred/" + regex, map.get("cookie").toString());
        matcher = Pattern.compile("<td align=center>(.*?)</td>").matcher(body);
        int n = 1;
        while(matcher.find()){
            regex = matcher.group(1);
            switch (n){
                case 4:
                    backModel.setData(regex);
                    break;
                case 5:
                    backModel.setpI(regex);
                    break;
                default:
                    backModel.setpI("无");
                    break;
            }
            if(n>=5){break;}
            n++;
            System.out.println(regex);
        }
        return  backModel;
    }


    public static BackModel parasBody4(String param) {
        BackModel backModel = new BackModel();
        String regex = "";
        OutputStreamWriter out = null;
        try{
            // Configure and open a connection to the site you will send the request
            URL url = new URL("http://crdd.osdd.net/raghava/satpdb/searchaction.php");
            URLConnection urlConnection = url.openConnection();
            // 设置doOutput属性为true表示将使用此urlConnection写入数据
            urlConnection.setDoOutput(true);
            urlConnection.setConnectTimeout(300000);
            urlConnection.setReadTimeout(300000);
            // 定义待写入数据的内容类型，我们设置为application/x-www-form-urlencoded类型
            urlConnection.setRequestProperty("content-type", "application/x-www-form-urlencoded");
            // 得到请求的输出流对象
            out = new OutputStreamWriter(urlConnection.getOutputStream());
            // 把数据写入请求的Body
            String params = "txt=" + param.toUpperCase() + "&anticancer=func&communication=subfunc&drug=fnumber&antibacterial=seqid&antifungal=seq";
            out.write(params);
            out.flush();
            // 从服务器读取响应
            InputStream inputStream = urlConnection.getInputStream();
            String encoding = urlConnection.getContentEncoding();
            String body = IOUtils.toString(inputStream, encoding);
            body = body.replaceAll("\\n", "").replaceAll("href=\".*?\"","");
            Matcher matcher = Pattern.compile("<thead>(.*)</table>").matcher(body);
            while(matcher.find()){
                regex = matcher.group(1);
                regex = "<table border=\"1px\" cellspacing=\"0px\" class=\"table\" ><thead>" + regex + "</table>";
                System.out.println(regex);
            }
        }catch(IOException e){
            e.printStackTrace();
        }finally {
            if(out != null){
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        backModel.setData(regex);
        return  backModel;
    }

    public static BackModel parasBody5(String param) {
        BackModel backModel = new BackModel();
        String regex = "";
        OutputStreamWriter out = null;
        try{
            // Configure and open a connection to the site you will send the request
            URL url = new URL("http://crdd.osdd.net/raghava/satpdb/searchaction.php");
            URLConnection urlConnection = url.openConnection();
            // 设置doOutput属性为true表示将使用此urlConnection写入数据
            urlConnection.setConnectTimeout(300000);
            urlConnection.setReadTimeout(300000);
            urlConnection.setDoOutput(true);
            //*************************
            // 定义待写入数据的内容类型，我们设置为application/x-www-form-urlencoded类型
            urlConnection.setRequestProperty("content-type", "application/x-www-form-urlencoded");
            // 得到请求的输出流对象
            out = new OutputStreamWriter(urlConnection.getOutputStream());
            // 把数据写入请求的Body
            String params = "txt=" + param.toUpperCase() + "&anticancer=func&communication=subfunc&drug=fnumber&antibacterial=seqid&antifungal=seq";
            out.write(params);
            out.flush();
            // 从服务器读取响应
            InputStream inputStream = urlConnection.getInputStream();
            String encoding = urlConnection.getContentEncoding();
            String body = IOUtils.toString(inputStream, encoding);
            body = body.replaceAll("\\n", "").replaceAll("href=\".*?\"","");
            Matcher matcher = Pattern.compile("<thead>(.*)</table>").matcher(body);
            while(matcher.find()){
                regex = matcher.group(1);
                regex = "<table border=\"1px\" cellspacing=\"0px\" class=\"table\" ><thead>" + regex + "</table>";
                System.out.println(regex);
            }
        }catch(IOException e){
            e.printStackTrace();
        }finally {
            if(out != null){
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        backModel.setData(regex);
        return  backModel;
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
            connection.setConnectTimeout(300000);
            connection.setReadTimeout(300000);
            connection.setRequestProperty("accept", "*/*");
            connection.setRequestProperty("connection", "Keep-Alive");
            connection.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            connection.setRequestProperty("content-type", "text/html");
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

    public static String getImage(String url1, String cookie) {
        String fileUrl = FileHelper.ROOT + UuidHelper.getUUID() + ".png";
        URL url = null;
        try {
            url = new URL(url1);
            URLConnection urlConnection = url.openConnection();
            // 设置doOutput属性为true表示将使用此urlConnection写入数据
            urlConnection.setDoOutput(true);
            urlConnection.setConnectTimeout(300000);
            urlConnection.setReadTimeout(300000);
            urlConnection.setRequestProperty("Cookie", cookie);
            // 定义待写入数据的内容类型，我们设置为application/x-www-form-urlencoded类型
            urlConnection.setRequestProperty("content-type", "application/xhtml+xml");
            // 得到请求的输出流对象
            OutputStreamWriter out = new OutputStreamWriter(urlConnection.getOutputStream());
            // 把数据写入请求的Body
            out.flush();
            out.close();

            // 从服务器读取响应
            InputStream it = urlConnection.getInputStream();
            File date = new File(fileUrl);
            //打开流
            OutputStream os = new FileOutputStream(date);
            //文件拷贝
            byte flush[]  = new byte[1024];
            int len = 0;
            while(0<=(len=it.read(flush))){
                os.write(flush, 0, len);
            }
            //关闭流的注意 先打开的后关
            os.close();
            it.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return fileUrl;
    }

    public static String sendGet3(String url, String cookie) {
        String result = "";
        BufferedReader in = null;
        try {
            String urlNameString = url;
            URL realUrl = new URL(urlNameString);
            // 打开和URL之间的连接
            URLConnection connection = realUrl.openConnection();
            // 设置通用的请求属性
            connection.setRequestProperty("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
            connection.setRequestProperty("connection", "Keep-Alive");
            connection.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            connection.setRequestProperty("Accept-Encoding", "gzip, deflate");
            connection.setConnectTimeout(300000);
            connection.setReadTimeout(300000);
            connection.setRequestProperty("Upgrade-Insecure-Requests", "1");
            connection.setRequestProperty("Referer", "http://crdd.osdd.net/raghava/toxinpred/pep_test.php");
            connection.setRequestProperty("Accept-Encoding", "gzip, deflate");
            connection.setRequestProperty("Host", "crdd.osdd.net");
            connection.setRequestProperty("Cookie", cookie);
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


    public static Map<String, Object> executePostByUsual(String actionURL, Map<String, String> parameters){
        String response = "";
        String cookieVal = "";
        String key = null;
        Map<String, Object> map = new HashedMap();
        try{
            URL url = new URL(actionURL);
            HttpURLConnection connection = (HttpURLConnection)url.openConnection();
            //发送post请求需要下面两行
            connection.setDoInput(true);
            connection.setDoOutput(true);
            connection.setUseCaches(false);
            connection.setConnectTimeout(300000);
            connection.setReadTimeout(300000);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Connection", "Keep-Alive");
            connection.setRequestProperty("Charset", "UTF-8");;
            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            //设置请求数据内容
            String requestContent = "";
            for (Map.Entry<String, String> entry : parameters.entrySet()) {
                requestContent = requestContent + entry.getKey() + "=" + entry.getValue() + "&";
            }
            requestContent = requestContent.substring(0, requestContent.lastIndexOf("&"));
            DataOutputStream ds = new DataOutputStream(connection.getOutputStream());
            //使用write(requestContent.getBytes())是为了防止中文出现乱码
            ds.write(requestContent.getBytes());
            ds.flush();

            try{
                //获取URL的响应
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));
                String s = "";
                String temp = "";
                while((temp = reader.readLine()) != null){
                    s += temp;
                }
                response = s;

                //取cookie
                for(int i = 1; (key = connection.getHeaderFieldKey(i)) != null; i++){
                    if(key.equalsIgnoreCase("set-cookie")){
                        cookieVal = connection.getHeaderField(i);
                        cookieVal = cookieVal.substring(0, cookieVal.indexOf(";"));
                    }
                }

                map.put("response", response);
                map.put("cookie", cookieVal);
                reader.close();
            }catch(IOException e){
                e.printStackTrace();
                System.out.println("No response get!!!");
            }
            ds.close();
        }catch(IOException e){
            e.printStackTrace();
            System.out.println("Request failed!");
        }
        return map;
    }

}
