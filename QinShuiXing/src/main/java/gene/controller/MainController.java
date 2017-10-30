package gene.controller;

import gene.helper.GetQinShuiHelper;
import gene.model.BackModel;
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
import java.util.List;


/**
 * Created by Administrator on 2017/6/9.
 */
@Controller
public class MainController {

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
}
