package gene.service;

import gene.model.Image;

import java.util.List;

/**
 * Created by Administrator on 2018/3/27.
 */
public interface ImageService {

    List<Image> getGeneExpression(List<String> list);

    int addImages(Image image);

    Image getGeneExpressionOne(String queryField);
}
