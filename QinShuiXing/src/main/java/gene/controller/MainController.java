package gene.controller;

import gene.helper.GetQinShuiHelper;
import gene.model.BackModel;
import gene.model.Image;
import gene.service.ImageService;
import gene.vo.BaseResultVo;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


/**
 * Created by Administrator on 2017/6/9.
 */
@Controller
public class MainController {

    @Autowired
    private ImageService imageService;

    /**
     * 跳转主页面
     * @return
     */
    @RequestMapping("/")
    public String index(Model model) {
        model.addAttribute("nowPoint", "index");
        return "index";
    }


    @RequestMapping("/getQinShuiXing")
    @ResponseBody
    public Object getQinShuiXing(String params, Integer type){
        List<BackModel> list = GetQinShuiHelper.getQinShui(params, type);
        return list;
    }

    /**
     * 文件预览，pdf或者图片
     * @param fileUrl 文件路径
     * @return
     */
    @RequestMapping(method = RequestMethod.GET, value = "viewFile")
    @ResponseBody
    public void viewTemplate(String fileUrl, HttpServletResponse response) {

        File file = new File(fileUrl);
        //如果转图片的文件不存在则重新转
        byte[] buffer = new byte[256];
        InputStream is = null;
//        response.setHeader("Content-Type","image/png");
        try {
            is = new FileInputStream(file);
            int nRead = 0;
            while((nRead = is.read(buffer)) > 0){
                response.getOutputStream().write(buffer, 0, nRead);
            }
            response.getOutputStream().flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try{
                is.close();
                response.getOutputStream().close();
            }catch (Exception e){
                e.printStackTrace();
            }
        }
    }

    /**
     * 文件预览，pdf或者图片
     * @param fileUrl 文件路径
     * @return
     */
    @RequestMapping(method = RequestMethod.GET, value = "viewFile2")
    @ResponseBody
    public void viewTemplate2(String fileUrl, HttpServletResponse response) {

        fileUrl = "uploadDir/geneExpression/" + fileUrl;
        File file = new File(fileUrl);
        //如果转图片的文件不存在则重新转
        byte[] buffer = new byte[256];
        InputStream is = null;
        try {
            is = new FileInputStream(file);
            int nRead = 0;
            while((nRead = is.read(buffer)) > 0){
                response.getOutputStream().write(buffer, 0, nRead);
            }
            response.getOutputStream().flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try{
                is.close();
                response.getOutputStream().close();
            }catch (Exception e){
                e.printStackTrace();
            }
        }
    }

    /**
     * 查找基因表达的图片
     * @param params
     * @return
     */
    @RequestMapping(method = RequestMethod.GET, value = "getGeneExpression")
    @ResponseBody
    public Map<String, Object> getGeneExpression(String params) {

        Map<String, Object> result = new HashedMap();
        String[] strs = params.split(",");
        List<String> list = new ArrayList<>();
        List<Object> list1 = new ArrayList<>();
//        for(String str:strs){
//            list.add(str);
//        }
//        result.put("data", imageService.getGeneExpression(list));


        for(String str:strs){
            List<Image> images = imageService.getGeneExpressionOne(str.trim());
            if(images.size() <= 0){
                list1.add(null);
            }else {
                Map<String, String> map = new HashedMap();
                for(Image im:images){
                    map.put("title", str.trim());
                    if(im.getFileUrl().contains("protein_expression")){
                        map.put("protein", im.getFileUrl().split("/")[2]);
                    }
                    if(im.getFileUrl().contains("gene_expression")){
                        map.put("gene", im.getFileUrl().split("/")[2]);
                    }
                }
                list1.add(map);
            }

        }
        result.put("data", list1);
        return result;
    }



    @RequestMapping(method = RequestMethod.GET, value = "readFiles")
    @ResponseBody
    public void readFiles() {


        readAllFile("D:\\Users\\Administrator\\Desktop\\PNG\\PNG");

    }

    private int n =0;
    public void readAllFile(String filepath) {
        File file= new File(filepath);
        if(!file.isDirectory()){
            String fileName = file.getName();
            Image image = new Image();
            image.setFileUrl("uploadDir/geneExpression/" + fileName);
            image.setQueryField(fileName.split("_")[2].toString());
            imageService.addImages(image);
            n++;
            System.out.println(n);
        }else if(file.isDirectory()){
            System.out.println("文件");
            String[] filelist=file.list();
            for(int i = 0;i<filelist.length;i++){
                File readfile = new File(filepath);
                if (!readfile.isDirectory()) {
                    String fileName = file.getName();
                    Image image = new Image();
                    image.setFileUrl("uploadDir/geneExpression/" + fileName);
                    image.setQueryField(fileName.split("_")[2].toString());
                    imageService.addImages(image);
                    n++;
                    System.out.println(n);
                } else if (readfile.isDirectory()) {
                    readAllFile(filepath + "\\" + filelist[i]);//递归
                }
            }
        }
    }
}
