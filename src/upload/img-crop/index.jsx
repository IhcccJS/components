/**
 * 由 antd-img-crop 进行的改造
 * https://github.com/nanxiaobei/antd-img-crop
 */
import React, { useState, useCallback, useMemo, useRef, forwardRef } from 'react';
import Cropper from 'react-easy-crop';
import { PlusOutlined, MinusOutlined, RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { Modal, Slider, Radio, Button } from 'antd';
import { isArray, isFunction } from '@wowon/utils';
import UploadFile from '../upload-file';
import useStyles from '../style/img-crop';

const pkg = 'antd-img-crop';

const MEDIA_CLASS = `${pkg}-media`;

const ZOOM_STEP = 0.1;

const MIN_ROTATE = 0;
const MAX_ROTATE = 360;
const ROTATE_STEP = 5;

const MIN_QUALITY = 0;
const MAX_QUALITY = 1;
const QUALITY_STEP = 0.1;

const formatName = { 'image/jpeg': 'jpg', 'image/png': 'png' };
const btnProps = { type: 'link', size: 'small' };

const EasyCrop = forwardRef((props, ref) => {
  const {
    src,
    aspect,
    shape,
    grid,

    hasZoom,
    zoomVal,
    rotateVal,
    setZoomVal,
    setRotateVal,

    minZoom,
    maxZoom,
    onComplete,

    cropperProps,
  } = props;

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [cropSize, setCropSize] = useState({ width: 0, height: 0 });

  const onCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      onComplete(croppedAreaPixels);
    },
    [onComplete],
  );

  const onMediaLoaded = useCallback(
    (mediaSize) => {
      const { width, height } = mediaSize;
      const ratioWidth = height * aspect;

      if (width > ratioWidth) {
        setCropSize({ width: ratioWidth, height });
      } else {
        setCropSize({ width, height: width / aspect });
      }
    },
    [aspect],
  );

  return (
    <Cropper
      {...cropperProps}
      ref={ref}
      image={src}
      crop={crop}
      cropSize={cropSize}
      onCropChange={setCrop}
      aspect={aspect}
      cropShape={shape}
      showGrid={grid}
      zoomWithScroll={hasZoom}
      zoom={zoomVal}
      rotation={rotateVal}
      onZoomChange={setZoomVal}
      onRotationChange={setRotateVal}
      minZoom={minZoom}
      maxZoom={maxZoom}
      onCropComplete={onCropComplete}
      onMediaLoaded={onMediaLoaded}
      classes={{
        containerClassName: `${pkg}-container`,
        mediaClassName: MEDIA_CLASS,
      }}
    />
  );
});

const ImgCrop = forwardRef((props, ref) => {
  const {
    aspect = 1,
    shape = 'rect',
    grid = true,
    quality = true,
    format = 'auto',

    zoom = true,
    rotate = true,
    minZoom = 1,
    maxZoom = 10,
    fillColor = 'white',
    maxResolution = 960,

    modalTitle,
    modalWidth,
    modalOk,
    modalCancel,

    value,
    onChange,

    children,

    cropperProps,
  } = props;
  const { styles, cx } = useStyles({ pkg });

  const hasZoom = zoom === true;
  const hasRotate = rotate === true;
  const hasQuality = quality === true;
  const hasFormat = format !== false;

  const [src, setSrc] = useState('');
  const [zoomVal, setZoomVal] = useState(1);
  const [rotateVal, setRotateVal] = useState(0);
  const [qualityVal, setRualityVal] = useState(0.4);
  const [formatVal, setFormatVal] = useState(format);

  const singleRef = useRef();
  const fileRef = useRef();

  const cropPixelsRef = useRef();

  /**
   * Upload
   */
  const renderUpload = useCallback(() => {
    const upload = isArray(children) ? children[0] : children;
    const { accept, max } = upload.props;

    singleRef.current = max === 1 && !isArray(value);

    return React.cloneElement(upload, {
      crop: true,
      multiple: false,
      accept: accept || 'image/*',
      value,
      onChange: (fileList, type) => {
        if (type === 'remove') {
          isFunction(onChange) && onChange(fileList);
        } else {
          const currentFile = isArray(fileList) ? fileList[fileList.length - 1] : fileList;
          if (!!currentFile.source) {
            fileRef.current = currentFile;
            currentFile.getSrc(setSrc);
          }
        }
      },
    });
  }, [value, children]);

  /**
   * EasyCrop
   */
  const onComplete = useCallback((croppedAreaPixels) => {
    cropPixelsRef.current = croppedAreaPixels;
  }, []);

  /**
   * Controls
   */
  const isMinZoom = zoomVal - ZOOM_STEP < minZoom;
  const isMaxZoom = zoomVal + ZOOM_STEP > maxZoom;
  const isMinRotate = rotateVal === MIN_ROTATE;
  const isMaxRotate = rotateVal === MAX_ROTATE;
  const isMinQuality = qualityVal === MIN_QUALITY;
  const isMaxQuality = qualityVal === MAX_QUALITY;

  const subZoomVal = useCallback(() => {
    if (!isMinZoom) setZoomVal(zoomVal - ZOOM_STEP);
  }, [isMinZoom, zoomVal]);

  const addZoomVal = useCallback(() => {
    if (!isMaxZoom) setZoomVal(zoomVal + ZOOM_STEP);
  }, [isMaxZoom, zoomVal]);

  const subRotateVal = useCallback(() => {
    if (!isMinRotate) setRotateVal(rotateVal - ROTATE_STEP);
  }, [isMinRotate, rotateVal]);

  const addRotateVal = useCallback(() => {
    if (!isMaxRotate) setRotateVal(rotateVal + ROTATE_STEP);
  }, [isMaxRotate, rotateVal]);

  const subQualityVal = useCallback(() => {
    if (!isMinQuality) setRualityVal(qualityVal - QUALITY_STEP);
  }, [isMinQuality, qualityVal]);

  const addQualityVal = useCallback(() => {
    if (!isMaxQuality) setRotateVal(qualityVal + QUALITY_STEP);
  }, [isMaxQuality, qualityVal]);

  /**
   * Modal
   */
  const modalProps = useMemo(() => {
    const obj = { width: modalWidth, okText: modalOk, cancelText: modalCancel };
    Object.keys(obj).forEach((key) => {
      if (!obj[key]) delete obj[key];
    });
    return obj;
  }, [modalCancel, modalOk, modalWidth]);

  const onClose = useCallback(() => {
    setSrc('');
    setZoomVal(1);
    setRotateVal(0);
  }, []);

  const onOk = useCallback(async () => {
    onClose();

    const naturalImg = document.querySelector(`.${MEDIA_CLASS}`);
    const { naturalWidth, naturalHeight } = naturalImg;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // create a max canvas to cover the source image after rotated
    const maxLen = Math.sqrt(Math.pow(naturalWidth, 2) + Math.pow(naturalHeight, 2));
    canvas.width = maxLen;
    canvas.height = maxLen;

    // rotate the image
    if (hasRotate && rotateVal > 0 && rotateVal < 360) {
      const halfMax = maxLen / 2;
      ctx.translate(halfMax, halfMax);
      ctx.rotate((rotateVal * Math.PI) / 180);
      ctx.translate(-halfMax, -halfMax);
    }

    ctx.fillStyle = fillColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw the source image in the center of the max canvas
    const left = (maxLen - naturalWidth) / 2;
    const top = (maxLen - naturalHeight) / 2;
    ctx.drawImage(naturalImg, left, top);

    // shrink the max canvas to the crop area size, then align two center points
    const maxImgData = ctx.getImageData(0, 0, maxLen, maxLen);
    const { width, height, x, y } = cropPixelsRef.current;
    canvas.width = width;
    canvas.height = height;
    ctx.putImageData(maxImgData, Math.round(-left - x), Math.round(-top - y));

    // 重新绘制到新的尺寸的画布上
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');
    offCanvas.width = width > maxResolution ? maxResolution : width;
    offCanvas.height = height > maxResolution ? maxResolution : height;
    offCtx.fillStyle = fillColor;
    offCtx.fillRect(0, 0, offCanvas.width, offCanvas.height);
    offCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, offCanvas.width, offCanvas.height);

    // get the new image
    const { source, did } = fileRef.current;

    let newName = '';
    if (formatVal === 'auto') {
      newName = source.name;
    } else {
      const nameText = source.name.split('.');
      nameText.pop();
      newName = nameText.concat(formatName[formatVal]).join('.');
    }

    const formatType = formatVal === 'auto' ? source.type : formatVal;

    offCanvas.toBlob(
      async (blob) => {
        let newFile = new UploadFile(new File([blob], newName, { type: formatType }), did);
        if (isFunction(onChange)) {
          onChange(singleRef.current ? newFile : [...value, newFile]);
        }
      },
      formatType,
      formatType === 'image/jpeg' ? qualityVal : 1,
    );
  }, [value, hasRotate, formatVal, onClose, onChange, qualityVal, rotateVal]);

  return (
    <>
      {renderUpload()}
      {src && (
        <Modal
          open={true}
          wrapClassName={cx(styles, `${pkg}-modal`)}
          title={modalTitle || '编辑图片'}
          width={720}
          onOk={onOk}
          onCancel={onClose}
          maskClosable={false}
          destroyOnClose
          {...modalProps}
        >
          <EasyCrop
            ref={ref}
            src={src}
            aspect={aspect}
            shape={shape}
            grid={grid}
            hasZoom={hasZoom}
            zoomVal={zoomVal}
            rotateVal={rotateVal}
            setZoomVal={setZoomVal}
            setRotateVal={setRotateVal}
            minZoom={minZoom}
            maxZoom={maxZoom}
            onComplete={onComplete}
            cropperProps={cropperProps}
          />
          {hasFormat && (
            <div className={`${pkg}-control`}>
              <span>格式：</span>
              <Radio.Group size="small" value={formatVal} onChange={(e) => setFormatVal(e.target.value)}>
                <Radio value="auto">自动</Radio>
                <Radio value="image/jpeg">JPG</Radio>
                <Radio value="image/png">PNG</Radio>
              </Radio.Group>
            </div>
          )}
          {hasZoom && (
            <div className={`${pkg}-control`}>
              <span>缩放：</span>
              <Button {...btnProps} icon={<MinusOutlined />} onClick={subZoomVal} disabled={isMinZoom} />
              <Slider min={minZoom} max={maxZoom} step={ZOOM_STEP} value={zoomVal} onChange={setZoomVal} />
              <Button {...btnProps} icon={<PlusOutlined />} onClick={addZoomVal} disabled={isMaxZoom} />
            </div>
          )}
          {hasRotate && (
            <div className={`${pkg}-control`}>
              <span>旋转：</span>
              <Button {...btnProps} icon={<UndoOutlined />} onClick={subRotateVal} disabled={isMinRotate} />
              <Slider min={MIN_ROTATE} max={MAX_ROTATE} step={ROTATE_STEP} value={rotateVal} onChange={setRotateVal} />
              <Button {...btnProps} icon={<RedoOutlined />} onClick={addRotateVal} disabled={isMaxRotate} />
            </div>
          )}
          {hasQuality && formatVal === 'image/jpeg' && (
            <div className={`${pkg}-control`}>
              <span>质量：</span>
              <Button {...btnProps} icon={<MinusOutlined />} onClick={subQualityVal} disabled={isMinQuality} />
              <Slider
                min={MIN_QUALITY}
                max={MAX_QUALITY}
                step={QUALITY_STEP}
                value={qualityVal}
                onChange={setRualityVal}
              />
              <Button {...btnProps} icon={<PlusOutlined />} onClick={addQualityVal} disabled={isMaxQuality} />
            </div>
          )}
        </Modal>
      )}
    </>
  );
});

export default ImgCrop;
