import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { patchAPI } from '../utils/FetchData';
import { useMutation } from 'react-query';
import { avatarRoute, changeInfoRoute } from '../utils/APIRoutes';
import { toast, ToastContainer } from 'react-toastify';
import ImageCropDialog from './ImageCropDialog';

const ChangeAvatarForm = ({ openEditAvatar, setOpenEditAvatar }) => {
  const [selectedFile, setSelectedFile] = useState('');
  const [image, setImage] = useState('');
  const [avatarImageCrop, setAvatarImageCrop] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const auth = useSelector(state => state.auth.auth);

  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const { mutate, isLoading: loadingChange } = useMutation({
    mutationFn: info => {
      return patchAPI(avatarRoute, info, auth.access_token);
    },
    onError: error => {
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: data => {
      toast.success(data.data.message, toastOptions);
    },
  });
  const handleSubmit = e => {
    e.preventDefault();
    const avatar = new FormData();
    avatar.append('avatar', selectedFile);
    avatar.append('username', auth.username);
    mutate(avatar);
  };

  const onCancel = () => {
    setOpenCrop(false);
  };

  const resetImage = () => {
    setCroppedImageFor();
  };

  const setCroppedImageFor = (crop, zoom, aspect, croppedImageUrl) => {
    setAvatarImageCrop({
      imageUrl: croppedImageUrl ? croppedImageUrl : image,
      crop: crop,
      zoom: zoom,
      aspect: aspect,
    });
    handleImageCrop(croppedImageUrl);
    setOpenCrop(false);
  };

  const handleImageCrop = url => {
    const toDataURL = url =>
      fetch(url)
        .then(response => response.blob())
        .then(
          blob =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            })
        );
    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
    toDataURL(url).then(dataUrl => {
      var fileData = dataURLtoFile(dataUrl, 'imageName.jpg');
      setSelectedFile(fileData);
    });
  };

  const handleChange = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      setImage(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setImage(objectUrl);

    // free memory when ever this component is unmounted
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                  className="mt-4"
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
                      //   value={values.firstname}
                      onChange={e => handleChange(e)}
                    />
                  </div>
                  <div className="flex justify-center">
                    <img
                      onClick={() => {
                        setOpenCrop(true);
                      }}
                      src={image}
                      alt=""
                      className="w-44 h-44 rounded-full object-cover border border-gray-300 shadow"
                    />
                  </div>
                  <div className="flex gap-20 mt-4">
                    <div
                      onClick={() => {
                        setOpenEditAvatar(false);
                      }}
                      className="cursor-pointer flex-1 text-center text-black p-3 duration-300 rounded-sm hover:bg-slate-200 w-full border border-green"
                    >
                      Cancel
                    </div>
                    <button
                      type="submit"
                      className="flex-1 text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black"
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

export default ChangeAvatarForm;
