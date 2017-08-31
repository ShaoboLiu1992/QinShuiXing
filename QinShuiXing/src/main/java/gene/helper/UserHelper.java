package gene.helper;

import gene.model.User;

import javax.servlet.http.HttpSession;

public class UserHelper {
    public static User getUserFromSession(HttpSession httpSession) {
        User user = new User();
        user.setUsername(httpSession.getAttribute("user").toString());
        user.setIdentity(Integer.parseInt(httpSession.getAttribute("identity").toString()));
        return user;
    }

    public static void setIdentity(User user, HttpSession httpSession) {
        httpSession.setAttribute("user", user.getUsername());
        httpSession.setAttribute("identity", user.getIdentity());
        httpSession.setAttribute("userInfo", user);
    }

    public static void removeIdentity(HttpSession httpSession){
        httpSession.removeAttribute("user");
        httpSession.removeAttribute("identity");
        httpSession.removeAttribute("userInfo");
    }

    public static String getIdentity(HttpSession httpSession) {
        Object identity= httpSession.getAttribute("identity");
        if (identity == null) {
            return null;
        } else {
            return identity.toString();
        }
    }
}
