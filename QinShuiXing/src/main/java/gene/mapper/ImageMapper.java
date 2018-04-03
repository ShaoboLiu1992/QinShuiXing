package gene.mapper;

import gene.model.Image;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ImageMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Image record);

    int insertSelective(Image record);

    Image selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Image record);

    int updateByPrimaryKey(Image record);

    List<Image> getGeneExpression(@Param("list") List<String> list);

    List<Image> getGeneExpressionOne(@Param("queryField")String queryField);
}