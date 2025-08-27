import { getBase64 as toBase64 } from '@ihccc/utils';
import { multipleUpload } from './methods';
// import ImgCrop from './img-crop';
import * as Normal from './render/normal';
import * as Plus from './render/plus';
import * as Text from './render/text';
import File from './upload-file';
import Upload from './upload';

Upload.toBase64 = toBase64;
// Upload.ImgCrop = ImgCrop;
Upload.multipleUpload = multipleUpload;
Upload.Normal = Normal;
Upload.Plus = Plus;
Upload.Text = Text;
Upload.File = File;

export { toBase64, multipleUpload, Normal, Plus, Text, File };

export default Upload;
