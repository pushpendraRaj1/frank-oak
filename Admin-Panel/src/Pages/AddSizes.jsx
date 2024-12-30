import axios from "axios";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

const AddSizes = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/api/admin-panel/size/create-size`, {
      name: e.target.size.value,
      order: e.target.size_order.value,
      status: e.target.status.value
    })
      .then((response) => {
        console.log(response.data);
        toast.success(`Size Added Successfully`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
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
      <div className="w-[90%] my-[150px] mx-auto bg-white rounded-[10px] border">
        <span className="block bg-[#f8f8f9] h-[50px] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[25px] font-[700] text-[#303640]">
          Add Size
        </span>

        <div className="w-full p-[8px_16px] my-[10px] ">
          <label htmlFor="size" className="text-[#252b36f2]">
            Size Name
          </label>
          <input
            type="text"
            name="size"
            id="size"
            placeholder="Size Name"
            className="w-full input rounded-[5px] p-2 border my-[10px]"
          />
        </div>
        <div className="w-full p-[8px_16px] my-[10px] ">
          <label htmlFor="size" className="text-[#252b36f2]">
            Size Order
          </label>
          <input
            type="text"
            name="size_order"
            id="size_order"
            placeholder="Size Order"
            className="w-full input rounded-[5px] p-2 border my-[10px]"
          />
        </div>
        <div className="w-full m-[10px]">
          <label
            htmlFor="categoryStatus"
            className=" text-[#303640] mr-[20px]"
          >
            Status
          </label>
          <input
            type="radio"
            name="status"
            id="categoryStatus"
            value={true}
            checked
            className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
          />
          <span>Display</span>
          <input
            type="radio"
            name="status"
            id="categoryStatus"
            value={false}

            className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
          />
          <span>Hide</span>
        </div>
        <div className="w-full p-[8px_16px] my-[10px] ">
          <button className="bg-[#5351c9] rounded-md text-white w-[100px] h-[35px]">
            Add Size
          </button>
        </div>

      </div>
    </form>
  );
};

export default AddSizes;
