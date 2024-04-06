import { openUploadWidget } from "../utils/CloudinaryService";

const CloudinaryUpload = ({formData,setFormData,setTrackName}) => {
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "dkl6bucs0",
        uploadPreset: 'rqgaujgb',
        sources: ["local"]
      },
      function (error, result) {
        if (!error && result.event === "success") {
            console.log(result)
            const track_url = result.info.secure_url
            const filename = result.info.original_filename
            const dura= result.info.duration;
            console.log(dura)
            setFormData(prev=>(
                {...prev,track:track_url,duration:dura}
            ))
            setTrackName(filename)

        } 
        else{
            console.log(error)
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="bg-white text-black  rounded-full p-4 font-semibold"
     onClick={uploadImageWidget}>
      Select track
    </button>
  );
};

export default CloudinaryUpload