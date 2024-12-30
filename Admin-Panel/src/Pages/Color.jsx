import React, { useState } from "react";
import axios from "axios";
// import ColorPicker from "@rc-component/color-picker";
// import "@rc-component/color-picker/assets/index.css";
// import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { toast, ToastContainer } from "react-toastify";
function Color() {
  // let [color, setColor] = useColor("#651ecb");

  const [selectedColor, setSelectedColor] = useState('#000000');

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value); // Update the state with the selected color
  };

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
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/api/admin-panel/color/add-color`, {
      name: e.target.color.value,
      code: e.target.color_code.value
    })
      .then((response) => {
        console.log(response.data);
        toast.success(`Color Added Successfully`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setSelectedColor('#000000')
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 400) {

          console.error(error.response.data.message);

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
      e.target.reset();
  }


  return (

    <form method="post" onSubmit={handleSubmit}>
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
      <div className="w-[90%] bg-white mx-auto rounded-[10px] border my-[150px]">
        <div className="bg-[#f8f8f9] h-[50px] header w-full p-[12px] rounded-[10px_10px_0_0]">
          Add Colors
        </div>
        <div className="w-full p-[20px]">
          <label htmlFor="color">Color Name</label> <br />
          <input
            type="text"
            name="color"
            id="color"
            className="w-full p-[10px] focus:outline-none border my-[10px] rounded-[5px]"
            placeholder="Color Name"
          />
          <label htmlFor="color_code">Color Code</label> <br />
          <input value={selectedColor} disabled
            type="text"
            name="color_code"
            id="color_code"
            className="w-full p-[10px] focus:outline-none border my-[10px] rounded-[5px]"
            placeholder="Color Code"
          />
          <label htmlFor="color">Color Picker</label> <br />
          <input onChange={handleColorChange}
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
              className="w-[100px] bg-[#f5515a] text-white cursor-pointer h-[30px] text-center rounded-[5px] box-border my-[30px] block border"
            >
              Pick Color
            </span>
          </div>
          <div className="w-full my-[20px] ">
            <button className="bg-[#5351c9] rounded-md text-white p-2">
              Add Color
            </button>
          </div>
          {/* <button className="bg-[#f5515a] text-white rounded-[5px]  w-[120px] h-[40px]">
          Select Color
        </button> */}
        </div>
      </div>
    </form>
  );
}

export default Color;
