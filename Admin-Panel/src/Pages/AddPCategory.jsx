import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AddPCategory = () => {

  const [ParentCategories, setParentCategories] = useState([]);

  const fetchParentCategories = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/parent-category/activated-categories`)
      .then((response) => {
        setParentCategories(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchParentCategories();
  }, [])

  const handleCreateCategory = (e) => {
    e.preventDefault();
    console.log(e.target);
    axios.post(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/create-category`, e.target)
      .then((response) => {
        console.log(response);
        toast.success(`Category Added Successfully`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        e.target.reset();
        let imagePreview = document.querySelector("#image_preview");
        imagePreview.src = '';

      })
      .catch((error) => {
        console.error(error);

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
      });
  }

  const previewImage = () => {
    let imageFileInput = document.querySelector("#categoryImg");
    let imagePreview = document.querySelector("#image_preview");
    imageFileInput.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        imagePreview.src = this.result;
      });
      reader.readAsDataURL(file);
    });
  };


  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
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
      <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        Add Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleCreateCategory} >
          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              id="categoryName"
              placeholder="Category Name"
              className="input border p-1 w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div>
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Image Preview :
            </label>
            <img
              src=""
              alt="Select Product Category"
              id="image_preview"
              width={300}
              height={200}
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Category Image
            </label>
            <input
              type="file"
              name="thumbnail"
              id="categoryImg"
              className="input border w-full rounded-[5px] my-[10px] category"
              onClick={() => previewImage()}
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Parent Category
            </label>
            <select name="parent_category" id="" className="border p-1 w-full rounded-[5px] my-[10px] category input">
              <option value="default" selected>
                --Select Parent Category--
              </option>
              {
                ParentCategories.map((parentCategory) => (
                  <option value={parentCategory._id}>{parentCategory.name}</option>
                ))
              }
            </select>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categorySlug" className="block text-[#303640]">
              Category Slug
            </label>
            <input
              type="text"
              name="slug"
              id="categorySlug"
              placeholder="Category Slug"
              className="input border p-1 w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryDesc" className="block text-[#303640]">
              Category Description
            </label>
            <textarea
              type="file"
              name="description"
              id="categoryDesc"
              className="input border w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="categoryStatus"
              className=" text-[#303640] mr-[20px]"
            >
              Is Featured
            </label>
            <input
              type="radio"
              name="is_featured"
              id="is_featured"
              value={true}
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Featured</span>
            <input
              type="radio"
              name="is_featured"
              id="is_featured"
              value={false}
              checked
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Not Featured</span>
          </div>
          <div className="w-full my-[10px]">
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
          <div className="w-full my-[20px] ">
            <button type="submit" className="bg-[#5351c9] rounded-md text-white p-2">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPCategory;

