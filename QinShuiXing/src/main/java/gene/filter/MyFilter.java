package gene.filter;

import org.json.JSONObject;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.*;
import java.io.IOException;

/**
 * Created by Administrator on 2017/2/14.
 */
@WebFilter(filterName="myFilter",urlPatterns="/*")
public class MyFilter implements Filter {

    /**
     * 封装，不需要过滤的请求
     */
    private static final String[] IGNORE_URI = { "/logIn", "/signUp", "/verifyLogin", "/getResumeListForConsole", "/index", "/joinUs", "/addApplicant", "/PAS_1","/PAS_2","/PAS_3","/PAS_4","/PAS_5",
            "/PAS_6","/contactUS", "/css", "/img", "/js", "/fonts", "/kaptcha", "/resetPass", "/register", "/assets", "/forgetpsw"};

    private static final String[] BOOTSTRAP_TABLE_URI = { "/getExamineesList", "/getVariants", "/getScientificBackgroundsByPage", "/userList", "/getExamineesByPage"};

    @Override
    public void destroy() {
        System.out.println("过滤器销毁");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {

        HttpServletRequest hrequest = (HttpServletRequest)request;
        HttpServletResponse resp = (HttpServletResponse) response;
        String path = hrequest.getContextPath();

        String basePath = hrequest.getScheme()+"://"+hrequest.getServerName()+":"+hrequest.getServerPort()+path;

        HttpSession session = hrequest.getSession(true);
        Object obj = session.getAttribute("userInfo");

        String requestPath = hrequest.getRequestURI();
        Boolean flag = isContains(requestPath, IGNORE_URI);
        JSONObject json = new JSONObject();
//        if(!flag && !requestPath.equals("/")){
//            if(null == obj){
//                if(isContains(requestPath, BOOTSTRAP_TABLE_URI)){
//                    resp.setContentType("application/json");
//                    json.put("errCode", "10000");
//                    json.put("msg", "认证超时，请重新登录，谢谢");
//                    resp.getWriter().print(json);
//                    resp.getWriter().flush();
//                }else{
//                  resp.sendRedirect(basePath);
//                }
//            }else{
//                chain.doFilter(hrequest, resp);
//            }
//        }else{
//            chain.doFilter(hrequest, resp);
//        }
        chain.doFilter(hrequest, resp);
}

    @Override
    public void init(FilterConfig config) throws ServletException {
        System.out.println("过滤器初始化");
    }

    /**
     *判断当前请求是否在拦截需求中
     * @param container
     * @param regx
     * @return
     */
    public static boolean isContains(String container, String[] regx) {
        boolean result = false;

        for (int i = 0; i < regx.length; i++) {
            if (container.indexOf(regx[i]) != -1) {
                return true;
            }
        }
        return result;
    }
}
