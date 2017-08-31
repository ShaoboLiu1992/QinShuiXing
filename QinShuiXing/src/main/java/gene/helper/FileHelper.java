package gene.helper;

import org.slf4j.Logger;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;

import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class FileHelper {

    protected static Logger logger= org.slf4j.LoggerFactory.getLogger(FileHelper.class);
//    -------------
//    数据分析所需文件路径

//    项目在159服务器上根目录
    public static String RootUrl = "/opt/data/disk2/GeneProject/webProject/uploadDir/";
//    脚本文件夹
    public static String scriptFolderUrl = "scripts/";

//    -------------
//    上传用文件夹
    public static String ROOT = "uploadDir/";
    public static String templateFolderUrl =  ROOT + "template";
    public static String bedFolderUrl = ROOT + "bedFiles";

    //    验证是否是正确的路径名
    private static String matches = "[A-Za-z]:\\\\[^:?\"><*]*";

//    根据路径删除指定的目录或文件，无论是否存在
    static public boolean DeleteFolder(String sPath) {
        boolean flag = false;
        File file = new File(sPath);
        // 判断目录或文件是否存在
        if (!file.exists()) {  // 不存在返回 false
            System.out.println("删除文件或文件夹失败" + sPath + "不存在");
        } else {
            // 判断是否为文件
            if (file.isFile()) {  // 为文件时调用删除文件方法
                flag = deleteFile(sPath);
            } else {  // 为目录时调用删除目录方法
                flag = deleteDirectory(sPath);
            }
        }
        return flag;
    }

//    删除单个文件
    static private boolean deleteFile(String sPath) {
        boolean flag = false;
        File file = new File(sPath);
        // 路径为文件且不为空则进行删除
        if (file.isFile() && file.exists()) {
            System.gc();
            file.delete();
            System.out.println("Delete file [" + sPath + "] sucess!");
            flag = true;
        } else {
            System.out.println("Delete file [" + sPath + "] failure!");
        }
        return flag;
    }

    static private boolean deleteDirectory(String sPath) {
        //如果sPath不以文件分隔符结尾，自动添加文件分隔符
        if (!sPath.endsWith(File.separator)) {
            sPath = sPath + File.separator;
        }
        File dirFile = new File(sPath);
        //如果dir对应的文件不存在，或者不是一个目录，则退出
        if (!dirFile.exists() || !dirFile.isDirectory()) {
            System.out.println("delete folder failure: not exist " + sPath);
            return false;
        }
        boolean flag = true;
        //删除文件夹下的所有文件(包括子目录)
        File[] files = dirFile.listFiles();
        for (int i = 0; i < files.length; i++) {
            //删除子文件
            if (files[i].isFile()) {
                flag = deleteFile(files[i].getAbsolutePath());
                if (!flag) break;
            } else { //删除子目录
                flag = deleteDirectory(files[i].getAbsolutePath());
                if (!flag) break;
            }
        }
        if (!flag) {
            System.out.println("delete folder failure " + sPath);
            return false;
        }
        //删除当前目录
        if (dirFile.delete()) {
            System.out.println("delete folder success! " + sPath);
            flag = true;
        } else {
            System.out.println("delete folder failure! " + sPath);
            flag = false;
        }
        return flag;
    }

    //private static final Logger log = LoggerFactory.getLogger(gene.controller.FileUploadController.class);

//    static public Map<String, Object> getUploadInfo(String FolderUrl) throws IOException {
//        Map<String, Object> map = new HashMap<>();
//        map.put("files", Files.walk(Paths.get(FolderUrl))
//                .filter(path -> !path.equals(Paths.get(FolderUrl)))
//                .map(path -> Paths.get(FolderUrl).relativize(path))
//                // very coupling but I don't know how to solve it.
//                .map(path -> linkTo(methodOn(gene.controller.FileUploadController.class).getFile(path.toString())).withRel(path.toString()))
//                .collect(Collectors.toList()));
//        return map;
//    }

    static public ResponseEntity<?> getFileFromFileUrl(ResourceLoader resourceLoader, String fileUrl) {
        try {
            return ResponseEntity.ok(resourceLoader.getResource("file:" + fileUrl));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }


    static public String handleFileUpload(MultipartFile file, String url) throws IOException {
        String uploadInfo;
        String FolderUrl = ROOT + url;
        if (!file.isEmpty()) {
            existOrCreate(FolderUrl);
            String fileType = file.getOriginalFilename().split("\\.")[file.getOriginalFilename().split("\\.").length-1];
            String fileName = new Date().getTime() + "." + fileType;
            Files.copy(file.getInputStream(), Paths.get(FolderUrl, fileName));
            uploadInfo = FolderUrl + fileName;
        } else {
            uploadInfo = "Failed to upload " + file.getOriginalFilename() + " because it was empty";
        }
        return uploadInfo;
    }


    static public boolean existOrCreate(String folderUrl) throws IOException {
        String[] spliteFolder = folderUrl.split("/");
//        System.out.println(folderUrl);
        String url = "";
        Boolean result = true;
        for (String folder : spliteFolder) {
//            System.out.println(folder);
            url = Paths.get(url, folder).toString();
//            System.out.println(url);
            File file = new File(Paths.get(url).toString());
            if (!file.exists()) {
                Files.createDirectory(Paths.get(url));
                result = false;
            }
        }
        return result;
    }

    public static List<String> getFilesName(String path) {
        File f = new File(path);
        if (!f.exists()) {
            System.out.println(path + " not exists");
            return null;
        }
        List<String> list = new ArrayList<String>();
        File fa[] = f.listFiles();
        for (int i = 0; i < fa.length; i++) {
            File fs = fa[i];
            if (fs.isDirectory()) {
                System.out.println(fs.getName() + " [目录]");
            } else {
                list.add(fs.getName());
            }
        }
        return list;
    }

}