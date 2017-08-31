package gene.helper;

import java.util.UUID;

/**
 * Created by Administrator on 2017/6/8.
 */
public class UuidHelper {

    public static String getUUID(){
        UUID uuid = UUID.randomUUID();
        return uuid.toString().replaceAll("-","");
    }
}
