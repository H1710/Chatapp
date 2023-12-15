import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './CropedImage';
import styled from 'styled-components';

const aspectRatios = [{ value: 1 / 1, text: '1/1' }];

function ImageCropDialog({
  imageUrl,
  cropInit,
  zoomInit,
  aspectInit,
  onCancel,
  setCroppedImageFor,
  resetImage,
}) {
  if (zoomInit == null) {
    zoomInit = 1;
  }
  if (cropInit == null) {
    cropInit = { x: 0, y: 0 };
  }
  if (aspectInit == null) {
    aspectInit = aspectRatios[0];
  }
  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);
  const [aspect, setAspect] = useState(aspectInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = crop => {
    setCrop(crop);
  };

  const onZoomChange = zoom => {
    setZoom(zoom);
  };

  const onAspectChange = e => {
    const value = e.target.value;
    const ratio = aspectRatios.find(ratio => ratio.value == value);
    setAspect(ratio);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    const croppedImageUrl = await getCroppedImg(imageUrl, croppedAreaPixels);
    setCroppedImageFor(crop, zoom, aspect, croppedImageUrl);
  };

  const onResetImage = () => {
    resetImage();
  };

  return (
    <Container>
      <div className="h-[180px]">
        <div className="bg-black fixed inset-0"></div>
        <div className="bg-black fixed inset-0 rounded-full">
          <Cropper
            image={imageUrl}
            zoom={zoom}
            crop={crop}
            aspect={aspect.value}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="flex flex-col bottom-0 left-0 w-full fixed justify-center items-center gap-4">
          <div className="w-full flex justify-center">
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onInput={e => {
                onZoomChange(e.target.value);
              }}
              className="w-1/2"
            ></input>
          </div>
          <div className="flex gap-3 mb-3">
            <button
              onClick={onCancel}
              className="w-20 h-10 bg-[#e5efff] hover:bg-[#c7e0ff] text-center text-[#005ae0]"
            >
              Cancel
            </button>
            <button
              className="w-20 h-10 bg-[#e5efff] hover:bg-[#c7e0ff] text-center text-[#005ae0]"
              onClick={onResetImage}
            >
              Reset
            </button>
            <button
              className="w-20 h-10 bg-[#e5efff] hover:bg-[#c7e0ff] text-center text-[#005ae0]"
              onClick={onCrop}
            >
              Crop
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .reactEasyCrop_CropArea {
    border-radius: 50%;
  }
`;

export default ImageCropDialog;
