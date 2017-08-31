package gene.helper;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

public class CommonHelper {
    static public Date stringToDate(String value, String format){
        Date date = null;
        try {
            date = new SimpleDateFormat(format, Locale.getDefault()).parse(value);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    // 拿到workTime天后的日期
    static public Date getDueDate(Integer workTime) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.DATE, workTime);          // 把日期往后增加n天：正数往后推,负数往前移动
        return cal.getTime();
    }

    // 日期之间的天数
    static public Integer daysOfTwo(Date beginDate, Date endDate) {
        Calendar cal = Calendar.getInstance();

        cal.setTime(beginDate);
        long time1 = cal.getTimeInMillis();

        if(null == endDate){
            endDate = new Date();
        }
        cal.setTime(endDate);
        long time2 = cal.getTimeInMillis();

//        感觉还不是很优雅~
        long between_days = (time2-time1) / (1000*3600*24) + 1;

        return Integer.parseInt(String.valueOf(between_days));
    }

    static public String dateToString(Date value, String format) {
        if(value == null){
            return  null;
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat(format, Locale.getDefault());
        String dateStr = dateFormat.format(value);
        return dateStr;

    }

    static public int dateToAge(Date birthDay) {
        Calendar cal = Calendar.getInstance();

        if (cal.before(birthDay)) {
            throw new IllegalArgumentException("The birthDay is before Now.It's unbelievable!");
        }
        int yearNow = cal.get(Calendar.YEAR);
        int monthNow = cal.get(Calendar.MONTH)+1;
        int dayOfMonthNow = cal.get(Calendar.DAY_OF_MONTH);

        cal.setTime(birthDay);
        int yearBirth = cal.get(Calendar.YEAR);
        int monthBirth = cal.get(Calendar.MONTH);
        int dayOfMonthBirth = cal.get(Calendar.DAY_OF_MONTH);

        int age = yearNow - yearBirth;

        if (monthNow <= monthBirth) {
            if (monthNow == monthBirth) {
                //monthNow==monthBirth
                if (dayOfMonthNow < dayOfMonthBirth) {
                    age--;
                }
            } else {
                //monthNow>monthBirth
                age--;
            }
        }

        return age;
    }

    static public List<String> getFileList(String url) {
        try{
            return Files.walk(Paths.get(url))
                    .filter(path -> !path.equals(Paths.get(url)))
                    .map(path -> path.toString().replace("\\","/").replace(FileHelper.ROOT,""))
                    .collect(Collectors.toList());
        } catch (Exception e){
            return null;
        }
    }

    static public List<String> getFileListAndSubfolder(String url) {
        File file = new File(url);
        File[] fs = file.listFiles();
        List<String> result=new ArrayList<>();
        if (fs != null)
            for (File f:fs) {
                result.add(f.getPath().replace("\\","/").replaceFirst(FileHelper.ROOT,""));
            }
        return result;
    }

    static public List<String> getFileListFileOnly(String url) {
        File file = new File(url);
        File[] fs = file.listFiles();
        List<String> result=new ArrayList<>();
        if (fs != null)
            for (File f:fs) {
                if (f.isFile()) {
                    result.add(f.getPath().replace("\\","/").replaceFirst(FileHelper.ROOT,""));
                }
            }
        return result;
    }

    static public List<String> getFileListFileOnly(String url, String suffix) {
        List<String> files = getFileListFileOnly(url);
        List<String> result = new ArrayList<>();
        for (String file : files) {
            if (file.endsWith(suffix)) {
                result.add(file);
            }
        }
//        result.forEach(path -> System.out.println(path));
        return result;
    }

    /**
     * 字符串转时间，转为当天的0点
     * @param value
     * @param format
     * @return
     */
    static public Date stringToDateStart(String value, String format){
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        Date date = null;
        try {
            date = sdf.parse(value);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    /**
     * 字符串转时间，转为当天的24点
     * @param value
     * @param format
     * @return
     */
    static public Date stringToDateEnd(String value, String format){
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        Date date = null;
        try {
            date = sdf.parse(value);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        return calendar.getTime();
    }


}
