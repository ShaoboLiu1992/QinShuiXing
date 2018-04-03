package gene.service.serviceImpl;

import gene.mapper.ImageMapper;
import gene.model.Image;
import gene.service.ImageService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2018/3/27.
 */
@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageMapper imageMapper;


    @Override
    public List<Image> getGeneExpression(List<String> list) {
        return imageMapper.getGeneExpression(list);
    }

    @Override
    public int addImages(Image image) {
        return imageMapper.insertSelective(image);
    }

    @Override
    public List<Image> getGeneExpressionOne(String queryField) {
        return imageMapper.getGeneExpressionOne(queryField);
    }
}
