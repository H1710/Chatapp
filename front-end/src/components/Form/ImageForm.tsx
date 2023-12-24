import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { toast, ToastContainer } from 'react-toastify';
import ImageCropDialog from './ImageCropDialog';
import { Point } from 'react-easy-crop';
import { CreateChatroom } from '../../models/chatroom.model';

interface ImageCrop {
  imageUrl?: string;
  crop?: Point;
  zoom?: number;
  aspect: { value: number; text: string };
}

interface ImageFormProps {
  openEditAvatar: boolean;
  setOpenEditAvatar: React.Dispatch<React.SetStateAction<boolean>>;
  handleSetImage: (image: File) => void;
  image: string | undefined;
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ImageForm: React.FC<ImageFormProps> = ({
  openEditAvatar,
  image,
  setOpenEditAvatar,
  handleSetImage,
  setImage,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [avatarImageCrop, setAvatarImageCrop] = useState<ImageCrop>();
  const [openCrop, setOpenCrop] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpenEditAvatar(false);
    if (selectedFile) {
      handleSetImage(selectedFile);
    }
  };

  const onCancel = () => {
    setOpenCrop(false);
  };

  const resetImage = () => {
    setCroppedImageFor(
      undefined,
      undefined,
      { value: 1, text: 'rectangle' },
      undefined
    );
  };

  const setCroppedImageFor = (
    crop: Point | undefined,
    zoom: number | undefined,
    aspect: { value: number; text: string } = { value: 1, text: 'rectangle' },
    croppedImageUrl: string | undefined
  ) => {
    setAvatarImageCrop({
      imageUrl: croppedImageUrl ? croppedImageUrl : image,
      crop: crop,
      zoom: zoom,
      aspect: aspect,
    });
    handleImageCrop(croppedImageUrl);
    setOpenCrop(false);
  };

  const handleImageCrop = async (url: string | undefined) => {
    const toDataURL = async (url: string) => {
      const response = await fetch(url);
      const blob = await response.blob();

      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };
    function dataURLtoFile(dataurl: string, filename: string) {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)![1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
    if (url) {
      try {
        const dataUrl = await toDataURL(url);
        const fileData = dataURLtoFile(dataUrl, 'imageName.jpg');
        setSelectedFile(fileData);
      } catch (error) {
        console.error('Error converting data URL to file:', error);
      }
    }
  };

  const checkImage = (file: File) => {
    const types = ['image/png', 'image/jpeg'];
    let err = '';
    if (!file) return (err = 'File does not exist.');

    if (file.size > 1024 * 1024)
      // 1mb
      err = 'The largest image size is 1mb';
    if (!types.includes(file.type)) err = 'The image type is png / jpeg';

    return err;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (checkImage(file)) {
        toast.error(checkImage(file));
        setSelectedFile(undefined);
        return;
      }
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      setImage(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setImage(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <Transition appear show={openEditAvatar} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setOpenEditAvatar(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-2 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit avatar
                </Dialog.Title>

                <form
                  encType="multipart/form-data"
                  onSubmit={e => {
                    handleSubmit(e);
                  }}
                >
                  <div className="my-4 text-sm">
                    <label htmlFor="avatar" className="block text-black">
                      Avatar
                    </label>
                    <input
                      autoComplete="off"
                      type="file"
                      className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                      placeholder="Avatar"
                      name="avatar"
                      accept=".jpg, .jpeg, .png"
                      onChange={e => handleChange(e)}
                    />
                  </div>
                  <div className="flex justify-center">
                    {image && (
                      <img
                        onClick={() => {
                          setOpenCrop(true);
                        }}
                        src={image}
                        alt=""
                        className="w-44 h-44 rounded-full object-cover border border-gray-300 shadow"
                      />
                    )}
                  </div>
                  <div className="flex gap-20 mt-4">
                    <div
                      onClick={() => {
                        setOpenEditAvatar(false);
                      }}
                      className="cursor-pointer flex-1 text-center text-black p-[12px] duration-300 rounded-sm hover:bg-slate-200 w-full border border-green"
                    >
                      Cancel
                    </div>
                    <button
                      type="submit"
                      className="flex-1 text-center text-white bg-[#3386ff] hover:bg-[#0068ff] p-[12px] duration-300 rounded-sm"
                    >
                      Save
                    </button>
                  </div>
                </form>
                {openCrop && (
                  <ImageCropDialog
                    imageUrl={image}
                    cropInit={avatarImageCrop?.crop}
                    zoomInit={avatarImageCrop?.zoom}
                    aspectInit={avatarImageCrop?.aspect}
                    onCancel={onCancel}
                    setCroppedImageFor={setCroppedImageFor}
                    resetImage={resetImage}
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        <ToastContainer />
      </Dialog>
    </Transition>
  );
};

export default ImageForm;
