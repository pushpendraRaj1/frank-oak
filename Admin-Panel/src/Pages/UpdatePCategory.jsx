import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const UpdatePCategory = () => {

  const id = useParams()._id;
  const [ProductCategory, setProductCategory] = useState({});
  const [ParentCategories, setParentCategories] = useState([]);
  const [filepath, setfilepath] = useState('');
  const [imgBase64, setimgBase64] = useState('');


  const nav = useNavigate();
  const fetchParentCategories = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/parent-category/activated-categories`)
      .then((response) => {

        setParentCategories(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const fetchProductCategory = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/read-category/${id}`)
      .then((response) => {
        setfilepath(response.data.filepath);
        setProductCategory(response.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchProductCategory();
    fetchParentCategories();

  }, [])


  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/update-category/${id}`, e.target)
      .then((response) => {
        console.log(response.data);
        nav('/dashboard/products/view-category');
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

  const handlePreview = (e) => {

    try {
      // setProductCategory({ ...ProductCategory, thumbnail: '' });
      setimgBase64('');
      console.log(e.target.files[0]);
      const reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setimgBase64(reader.result);
      }
    }
    catch (error) {
      console.log(error);
    }
  }


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
        Update Product Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form onSubmit={handleUpdate}>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Name
            </label>
            <input type="text" name="name" id="categoryName" placeholder="Category Name" className="input border p-1 w-full rounded-[5px] my-[10px]"
              value={ProductCategory.name} onChange={(e) => setProductCategory({ ...ProductCategory, name: e.target.value })} />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="thumbnail" className="block text-[#303640]">
              Category Image
            </label>
            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              onChange={handlePreview}
              className="input border w-full rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryThumb" className="block text-[#303640]">
              Category Image
            </label>
            <a href={imgBase64 || (filepath + ProductCategory.thumbnail)} target="_blank">
              <img src={imgBase64 || (filepath + ProductCategory.thumbnail)} width={200} />
            </a>
          </div>

          <div className="w-full my-[10px]">
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Parent Category
            </label>

            <select name="parent_category" id="parent_category"
              onChange={(e) => setProductCategory({ ...ProductCategory, parent_category: e.target.value })}
              className="border p-1 w-full rounded-[5px] my-[10px] category input">
              {
                ParentCategories.map((parentCategory) => (
                  <option
                    key={parentCategory._id}
                    {...(ProductCategory.parent_category && ProductCategory.parent_category._id === parentCategory._id ? { selected: true } : {})} // "ProductCategory.parent_category &&" checking if productCategory.parent_category exists, only then compare and set selected:true
                    value={parentCategory._id}> {parentCategory.name}
                  </option>
                ))
              }
            </select>
          </div>

          <div className="w-full my-[10px]">
            <label htmlFor="slug" className="block text-[#303640]">
              Slug
            </label>
            <input type="text" name="slug" id="slug" placeholder="Category Slug" className="input border p-1 w-full rounded-[5px] my-[10px]"
              value={ProductCategory.slug} onChange={(e) => setProductCategory({ ...ProductCategory, slug: e.target.value })} />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="description" className="block text-[#303640]">
              Description
            </label>
            <textarea
              type="file"
              name="description"
              id="description"
              value={ProductCategory.description}
              onChange={(e) => setProductCategory({ ...ProductCategory, description: e.target.value })}
              className="input border w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[20px] ">
            <button className="bg-[#5351c9] rounded-md text-white p-2">
              Update Category
            </button>
          </div>
        </form>
      </div >
    </div >
  );
};

export default UpdatePCategory;
