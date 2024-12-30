import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const UpdateColor = () => {


  const id = useParams()._id;
  const [Color, setColor] = useState({});
  const nav = useNavigate();
  const [selectedColor, setSelectedColor] = useState('');


  const setImage = () => {
    let imageFileInput = document.querySelector("#image_src");
    let imagePreview = document.querySelector("#image_preview");
    let colorCode = document.querySelector("#color_code");
    let color_picker = document.querySelector("#color_picker");
    imageFileInput.addEventListener("change", function () {
      const file = this.files[0];
      console.log(file);
      if (!file) return;

      const reader = new FileReader();
      reader.addEventListener("load", function () {
        imagePreview.src = this.result;
      });
      reader.readAsDataURL(file);

      const colorPicker = new window.EyeDropper();
      const colorSelector = document.querySelector("#colorPicker");
      colorSelector.addEventListener("click", () => {
        colorPicker
          .open()
          .then((res) => {
            colorCode.value = res.sRGBHex;
            color_picker.value = res.sRGBHex;
            setColor({ ...Color, code: colorCode.value });
            setSelectedColor(colorCode.value);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };





  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/color/read-color/${id}`)
      .then((response) => {
        setColor(response.data.data[0]);
        setSelectedColor(response.data.data[0].code);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value); // Update the state with the selected color
    setColor({ ...Color, code: e.target.value })
  };

  const handleUpdate = () => {
    console.log(Color);
    console.log(selectedColor);
    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/color/update-color/${id}`, Color)
      .then((response) => {
        console.log(response.data);
        nav('/dashboard/color/view-colors');
      })
      .catch((error) => {
        console.log(error);

        if (error.status == 400) {
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
  }

  return (
    <div className="w-[90%] bg-white mx-auto rounded-[10px] border my-[150px]">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="bg-[#f8f8f9] h-[50px] header w-full p-[12px] rounded-[10px_10px_0_0]">
        Update Colors
      </div>
      <div className="w-full p-[20px]">
        <label htmlFor="color">Color Name</label> <br />
        <input
          type="text"
          name="color"
          id="color"
          value={Color.name}
          onChange={(e) => setColor({ ...Color, name: e.target.value })}
          className="w-full p-[10px] focus:outline-none border my-[10px] rounded-[5px]"
          placeholder="Color Name"
        />
        <label htmlFor="color_code">Color Code</label> <br />
        <input
          value={selectedColor} disabled
          type="text"
          name="color_code"
          id="color_code"
          onChange={(e) => setColor({ ...Color, code: e.target.value })}
          className="w-full p-[10px] focus:outline-none border my-[10px] rounded-[5px]"
          placeholder="Color Code"
        />
        <label htmlFor="color">Color Picker</label> <br />
        <input
          onChange={handleColorChange}
          value={selectedColor}
          type="color"
          name="color_picker"
          id="color_picker"
          className="focus:outline-none border my-[10px] rounded-[5px]"
        />
        <div className="w-[300px] my-[10px]">
          {/* <ColorPicker color={color} onChange={setColor} height={200} /> */}
          <span className="w-full h-[200px] object-contain my-[10px]">
            <img
              src=""
              alt="Select product"
              id="image_preview"
              width={300}
              height={200}
            />
          </span>
          <input
            type="file"
            name="image"
            id="image_src"
            className="category w-full border input rounded-[5px]"
            onClick={() => setImage()}
          />
          <span
            id="colorPicker"
            className="w-[100px] bg-[#5351c9] text-white cursor-pointer h-[30px] text-center rounded-[5px] box-border my-[30px] block border"
          >
            Pick Color
          </span>
        </div>
        <button onClick={handleUpdate} type="button" className="bg-[#5351C9] text-white rounded-[5px]  w-[120px] h-[40px]">
          Update Color
        </button>
      </div>
    </div>
  );
};

export default UpdateColor;
