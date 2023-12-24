import React, { useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import getCroppedImg from './CropedImage';
import styled from 'styled-components';

interface ImageCropDialogProps {
  imageUrl: string | undefined;
  cropInit?: { x: number; y: number };
  zoomInit?: number;
  aspectInit?: { value: number; text: string };
  onCancel: () => void;
  setCroppedImageFor: (
    crop: { x: number; y: number },
    zoom: number,
    aspect: { value: number; text: string },
    croppedImageUrl: string
  ) => void;
  resetImage: () => void;
}

const aspectRatios = { value: 1 / 1, text: '1/1' };

const ImageCropDialog: React.FC<ImageCropDialogProps> = ({
  imageUrl,
  cropInit,
  zoomInit,
  aspectInit,
  onCancel,
  setCroppedImageFor,
  resetImage,
}) => {
  if (zoomInit == null) {
    zoomInit = 1;
  }
  if (cropInit == null) {
    cropInit = { x: 0, y: 0 };
  }
  if (aspectInit == null) {
    aspectInit = aspectRatios;
  }
  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);
  const [aspect, setAspect] = useState(aspectInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const onCropChange = (crop: Point) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    if (croppedAreaPixels) {
      if (imageUrl) {
        const croppedImageUrl = await getCroppedImg(
          imageUrl,
          croppedAreaPixels
        );
        setCroppedImageFor(crop, zoom, aspect, croppedImageUrl);
      }
    }
  };

  const onResetImage = () => {
    resetImage();
  };

  return (
    <Container>
      <div className="h-[100px]">
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
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                onZoomChange(parseFloat(e.target.value));
              }}
              className="w-1/2"
            ></input>
          </div>
          <div className="flex gap-3 mb-3">
            <button
              onClick={onCancel}
              className="p-2 text-black bg-white hover:bg-slate-200 duration-300 rounded-sm"
            >
              Cancel
            </button>
            <button
              className="p-2 text-black bg-white hover:bg-slate-200 duration-300 rounded-sm"
              onClick={onResetImage}
            >
              Reset
            </button>
            <button
              className="p-2 text-white bg-[#3386ff] hover:bg-[#0068ff] duration-300 rounded-sm"
              onClick={onCrop}
            >
              Crop
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .reactEasyCrop_CropArea {
    border-radius: 50%;
  }
`;

export default ImageCropDialog;
