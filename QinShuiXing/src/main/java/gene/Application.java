package gene;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

import gene.helper.FileHelper;

import org.apache.ibatis.session.SqlSessionFactory;
import org.logicalcobwebs.proxool.ProxoolDataSource;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

@ServletComponentScan
@EnableAutoConfiguration
@SpringBootApplication
@ComponentScan
@MapperScan("gene/mapper")
public class Application {
    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.driver}")
    private String driver;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;


    public static String myurl;
    public static String mydriver;
    public static String myname;
    public static String mypass;

    //**************
    //  把mybatis的信息注入到Bean中，这里的主程序一定要放在上层的包中，不然会有注入顺序的错误。接口的实现都在/resources/mybatis/*.xml中
    //**************
    @Bean
    public DataSource dataSource() {
        ProxoolDataSource dataSource = new org.logicalcobwebs.proxool.ProxoolDataSource();
        dataSource.setDriver(driver);
        dataSource.setDriverUrl(url);
        dataSource.setUser(username);
        dataSource.setPassword(password);
        myurl = url;
        mydriver = driver;
        myname = username;
        mypass = password;
        dataSource.setAlias("Pool_dbname");
        dataSource.setHouseKeepingSleepTime(90000);
        dataSource.setPrototypeCount(0);
        dataSource.setMaximumConnectionCount(50);
        dataSource.setMinimumConnectionCount(2);
        dataSource.setSimultaneousBuildThrottle(50);
        dataSource.setMaximumConnectionLifetime(14400000);
        dataSource.setHouseKeepingTestSql("select 1");
        return dataSource;
    }

    @Bean
    public SqlSessionFactory sqlSessionFactoryBean() throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource());

        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();

        sqlSessionFactoryBean.setMapperLocations(resolver.getResources("classpath:/mybatis/*.xml"));

        return sqlSessionFactoryBean.getObject();
    }

    @Bean
    public PlatformTransactionManager transactionManager() {
        return new DataSourceTransactionManager(dataSource());
    }

    @Bean
    CommandLineRunner init() {
        return (args) -> {
            File file = new File(Paths.get(FileHelper.ROOT).toString());
            if (!file.exists()) {
                String[] path = FileHelper.ROOT.split("/");
                String temp = "";
                for (String x: path) {
                    temp = temp.equals("") ? x : temp+"/"+x;
                    Files.createDirectory(Paths.get(temp));
                }
            }
            //FileSystemUtils.deleteRecursively(new File(FileUploadController.ROOT));
            //Files.createDirectory(Paths.get(FileUploadController.ROOT));
        };
    }




    public static void main(String[] args) {
        //test wordhelper
        //WordHelper.example();
        SpringApplication.run(Application.class, args);
    }



}
