import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const UpdateSizes = () => {

  
  const id = useParams()._id;

  const [Size, setSize] = useState({});

  const nav = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/size/read-size/${id}`)
      .then((response) => {
        setSize(response.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  const handleUpdate = () => {
    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/size/update-size/${id}`, Size)
      .then((response) => {
        console.log(response.data);
        nav('/dashboard/size/view-sizes');
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
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
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
      <span className="block bg-[#f8f8f9] text-[20px] font-bold p-[8px_16px] text-[#303640] border-b rounded-[10px_10px_0_0]">
        Update Size
      </span>
      <div className="w-[95%] mx-auto my-[20px]">
        <form>
          <div>
            <label htmlFor="size" className="block text-[#252b36f2]">
              Size Name
            </label>
            <input
             value={Size.name}
             onChange={(e) => setSize({ ...Size, name: e.target.value })}
              type="text"
              id="size"
              name="updated_size"
              placeholder="Size Name"
              className="input p-2 border my-[20px] w-full rounded-[5px]"
            />
            <div className="w-full my-[10px] ">
              <label htmlFor="size" className="text-[#252b36f2] block">
                Size Order
              </label>
              <input
               value={Size.order}
               onChange={(e) => setSize({ ...Size, order: e.target.value })}
                type="text"
                name="size"
                id="updated_size_order"
                placeholder="Size Order"
                className="w-full input rounded-[5px] p-2 border my-[10px]"
              />
            </div>
          </div>
          <div className="w-full my-[30px]">
            <button onClick={handleUpdate} type="button" className="w-[100px] rounded-[10px] bg-[#5351c9] border-none cursor-pointer text-white h-[30px]">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSizes;
