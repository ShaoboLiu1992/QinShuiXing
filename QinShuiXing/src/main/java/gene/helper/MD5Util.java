package gene.helper;import java.io.File;import java.io.FileInputStream;import java.io.IOException;import java.io.InputStream;import java.security.MessageDigest;import java.security.NoSuchAlgorithmException;import java.util.List;public class MD5Util {    /**     * 默认的密码字符串组合，apache校验下载的文件的正确性用的就是默认的这个组合     */    protected static char   hexDigits[]   = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd',            'e', 'f'                     };    protected MessageDigest messagedigest = null;    public MD5Util(){        try {            messagedigest = MessageDigest.getInstance("MD5");        } catch (NoSuchAlgorithmException e) {            System.err.println(e.getMessage());        }    }    /**     * 计算文件的MD5值     *      * @param file     * @return     */    public String getFileMD5String(File file) {        InputStream fis = null;        try {            fis = new FileInputStream(file);            byte[] buffer = new byte[1024];            int numRead = 0;            while ((numRead = fis.read(buffer)) > 0) {                messagedigest.update(buffer, 0, numRead);            }        } catch (Exception e) {            // nothing to do nowadays        } finally {            try {                fis.close();            } catch (IOException e1) {            }        }        return bufferToHex(messagedigest.digest());    }    public String getMD5String(InputStream is) {        try {            byte[] buffer = new byte[1024];            int numRead = 0;            while ((numRead = is.read(buffer)) > 0) {                messagedigest.update(buffer, 0, numRead);            }        } catch (Exception e) {            try {                is.close();            } catch (IOException e1) {            }        }        return bufferToHex(messagedigest.digest());    }    public String getMD5String(String s) {        return getMD5String(s.getBytes());    }    public String getMD5StringList(List<String> ls) {        for (String s : ls) {            try {                messagedigest.update(s.getBytes());            } catch (Exception e) {                e.printStackTrace();            }        }        return bufferToHex(messagedigest.digest());    }    public String getMD5String(byte[] bytes) {        messagedigest.update(bytes);        return bufferToHex(messagedigest.digest());    }    private static String bufferToHex(byte bytes[]) {        return bufferToHex(bytes, 0, bytes.length);    }    private static String bufferToHex(byte bytes[], int m, int n) {        StringBuffer stringbuffer = new StringBuffer(2 * n);        int k = m + n;        for (int l = m; l < k; l++) {            appendHexPair(bytes[l], stringbuffer);        }        return stringbuffer.toString();    }    private static void appendHexPair(byte bt, StringBuffer stringbuffer) {        char c0 = hexDigits[(bt & 0xf0) >> 4];        char c1 = hexDigits[bt & 0xf];        stringbuffer.append(c0);        stringbuffer.append(c1);    }    public boolean checkPassword(String password, String md5PwdStr) {        String s = getMD5String(password);        return s.equals(md5PwdStr);    }    private static ThreadLocal<MD5Util> tl = new ThreadLocal<MD5Util>() {                                               public MD5Util initialValue() {                                                   return new MD5Util();                                               }                                           };    public static MD5Util getInstance() {        return tl.get();    }}