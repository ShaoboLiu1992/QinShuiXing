package gene.controller;

import gene.helper.GetQinShuiHelper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
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
        List<String> list = GetQinShuiHelper.getQinShui(params, type);
        return list;
    }
}
