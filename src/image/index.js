import Image from './image';
import List from './list';
import Preview from './preview';
import usePreview from './usePreview';

Image.Provider = Preview;
Image.List = List;
Image.usePreview = usePreview;

export default Image;
