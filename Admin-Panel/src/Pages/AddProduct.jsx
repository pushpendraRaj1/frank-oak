import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from 'react-select'
import { toast, ToastContainer } from "react-toastify";

const AddProduct = () => {

  const [ParentCategories, setParentCategories] = useState([]);
  const [ProductCategories, setProductCategories] = useState([]);
  const [Colors, setColors] = useState([]);
  const [Sizes, setSizes] = useState([]);
  const [SelectedSizes, setSelectedSizes] = useState([]);
  const [SelectedColors, setSelectedColors] = useState([]);
  const [keepStyleofReactSelect, setkeepStyleofReactSelect] = useState(true);
  const [preIMGs, setpreIMGs] = useState({});
  const [isArray, setisArray] = useState(false);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.data.code, // Use the color code from each option's data
      fontWeight: 'bold',
      // backgroundColor: state.isSelected ? 'lightgray' : 'white',
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: state.data.code, // Use the color code from each option's data
      fontWeight: 'bold',
      // backgroundColor: state.isSelected ? 'lightgray' : 'white',
    }),
    width: 50
  };

  const fetchParenteCategories = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/parent-category/activated-categories`)
      .then((response) => {
        setParentCategories(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const fetchSizes = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/size/activated-sizes`)
      .then((response) => {
        const newArr = response.data.data.map(size => ({ ...size, label: size.name, value: size._id })); // adding label and value keys to all ojects because the react-select will only show value which is in the label key and will pass valaue which is in the value key
        setSizes(newArr);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const fetchColors = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/color/activated-colors`)
      .then((response) => {
        const newArr = response.data.data.map(color => ({ ...color, label: color.name, value: color._id })); // adding label and value keys to all ojects because the react-select will only show value which is in the label key and will pass valaue which is in the value key
        setColors(newArr);
      })
      .catch((error) => {
        console.error(error);
      });
  }


  const ProductCategoriesByParentCategory = (e) => {
    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/active-product-categories-by-parent-category/${e.target.value}`)
      .then((response) => {
        setProductCategories(response.data.data);
        console.log(e.target.value);
      })
      .catch((error) => {
        setProductCategories([]);
        console.error(error);
      });
  }

  useEffect(() => {
    fetchParenteCategories();
    fetchColors();
    fetchSizes();
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/api/admin-panel/product/create-product`, e.target)
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
        setpreIMGs({});
        setSelectedSizes([]);
        setSelectedColors([]);

      })
      .catch((error) => {
        console.log(error);

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

      })

  }
  useEffect(() => {
    // console.log(preIMGs.gallery);
    setisArray(Array.isArray(preIMGs.gallery));
  }, [preIMGs.gallery])

  const handlePreview = (e) => {
    setpreIMGs({ ...preIMGs, [e.target.name]: '' }); // Removing preview if input file clicked but no file is selected
    try {
      if (e.target.files.length == 1) { // single file preview
        if (e.target.name == 'gallery') setisArray(false);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          setpreIMGs({ ...preIMGs, [e.target.name]: reader.result }); //  Bracket Notation:
        }
      }
      else { // multiple files preview
        const filesArray = Array.from(e.target.files); // Convert FileList to Array
        const filePreviews = [];

        filesArray.forEach((file, index) => {
          const fileReader = new FileReader();

          fileReader.onload = () => {
            filePreviews[index] = fileReader.result;
            // Update state only when all files are processed
            if (filePreviews.length === filesArray.length && filePreviews.every(Boolean)) {
              setpreIMGs(prev => ({ ...prev, [e.target.name]: filePreviews }));
            }
          };
          fileReader.readAsDataURL(file);
        });
      }
    }
    catch (error) {
      console.log(error);
    }
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
      <span className="block border-b bg-[#f8f8f9] text-[#303640] text-[20px] font-bold p-[8px_16px] h-[40px] rounded-[10px_10px_0_0]">
        Product Details
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleSubmit}>
          <div className="w-full my-[10px] product-name">
            <label htmlFor="name" className="block text-[#303640]">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px] product-description">
            <label htmlFor="description" className="block text-[#303640]">
              Product Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows={3}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px] short-description">
            <label
              htmlFor="short_description"
              className="block text-[#303640]"
            >
              Short Description
            </label>
            <textarea
              id="short_description"
              name="short_description"
              placeholder="Short Description"
              rows={2}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px] thumbnail">
            <label htmlFor="thumbnail" className="block text-[#303640]">
              Product Image
            </label>
            <img src={preIMGs.thumbnail || ''} style={{ display: preIMGs.thumbnail ? 'inline' : 'none' }} alt="Logo" name="logo" width={300} />
            <input
              type="file"
              onChange={handlePreview}
              id="thumbnail"
              name="thumbnail"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px] image_on_hover">
            <label htmlFor="image_on_hover" className="block text-[#303640]">
              Image on Hover
            </label>
            <img src={preIMGs.image_on_hover || ''} style={{ display: preIMGs.image_on_hover ? 'inline' : 'none' }} alt="Logo" name="logo" width={300} />
            <input
              type="file"
              onChange={handlePreview}
              id="image_on_hover"
              name="image_on_hover"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="my-[10px] gallery">
            <label htmlFor="gallery" className="block text-[#303640]">
              Product Gallery
            </label>
            {
              (preIMGs.gallery && !isArray) ? <img src={preIMGs.gallery} alt="Gallery" key={preIMGs.gallery} style={{ width: '200px', height: '250px' }} /> : null // if selected file is single then it will show error on map function of the below code, that's why this code is written
            }
            <div className="flex justify-around flex-wrap">
              {
                (preIMGs.gallery && isArray) ? preIMGs.gallery.map((img) => ( // preIMGs.gallery && checks first if the preIMGs has a key named "gallery"
                  <img src={img} alt="Gallery" key={img} style={{ width: '200px', height: '250px' }} />
                )) : ''
              }
            </div>
            <input
              type="file"
              id="gallery"
              name="gallery"
              multiple
              onChange={handlePreview}
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px] product-price grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="price" className="block text-[#303640]">
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                placeholder="Product Price"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
            <div>
              <label htmlFor="product_mrp" className="block text-[#303640]">
                MRP
              </label>
              <input
                type="text"
                id="mrp"
                name="mrp"
                placeholder="Product MRP"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
          </div>
          <div className="w-full my-[10px] parent_category">
            <label htmlFor="parent_category" className="block text-[#303640]">
              Select Parent Category
            </label>
            <select
              name="parent_category"
              onChange={ProductCategoriesByParentCategory}
              id="parent_category"
              className="border p-1 w-full rounded-[5px] my-[10px] category input">
              <option selected>
                --Select Parent Category--
              </option>

              {
                ParentCategories.map((parentCategory) => (
                  <option value={parentCategory._id}>{parentCategory.name}</option>
                ))
              }
            </select>
          </div>
          <div className="w-full my-[10px] product_category">
            <label htmlFor="product_category" className="block text-[#303640]">
              Select Product Category
            </label>
            <select
              id="product_category"
              name="product_category"
              className="w-full input border p-2 rounded-[5px] my-[10px] cursor-pointer"
            >
              <option selected >
                --Select Product Category--
              </option>
              {
                ProductCategories.map((productCategory) => (
                  <option value={productCategory._id}>{`${productCategory.name} (${productCategory.parent_category.name})`}</option>
                ))
              }
            </select>
          </div>
          <div className=" grid grid-cols-[2fr_2fr] gap-[20px] isStockAvail">
            <div>
              <label htmlFor="isStockAvail" className="block text-[#303640]">
                Manage Stock
              </label>
              <select
                name="isStockAvail"
                id="isStockAvail"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              >
                <option selected disabled hidden>
                  --Select Stock--
                </option>
                <option selected value={true}>In Stock</option>
                <option value={false}>Out of Stock</option>
              </select>
            </div>
            <div>
              <label htmlFor="brand" className="block text-[#303640]">
                Brand Name
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                placeholder="Brand"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              />
            </div>
          </div>
          <div className="my-3 size">
            <label htmlFor="size" className="block text-[#303640]">
              Size
            </label>
            <Select
              name="size"
              value={SelectedSizes || ''}
              options={Sizes}
              onChange={setSelectedSizes}
              isMulti
            />
          </div>
          <div className="my-3 color">
            <label htmlFor="color" className="block text-[#303640]">
              Color
            </label>
            <div className="flex">
              <Select
                name="color"
                value={SelectedColors || ''}
                className="w-[90%]"
                options={Colors}
                onChange={setSelectedColors}
                isMulti
                styles={keepStyleofReactSelect ? customStyles : ''}
              />
              <div className="my-2 flex ps-4">
                <input className="cursor-pointer" defaultChecked={true} onChange={() => setkeepStyleofReactSelect(!keepStyleofReactSelect)} id="swapReactSelectStyle" type="checkbox" />
                <label className="cursor-pointer px-2" for="swapReactSelectStyle">preview</label>
              </div>
            </div>
          </div>
          <div className="w-full my-[10px] status">
            <label htmlFor="status" className="text-[#252b36f2] mr-[30px]">
              Status
            </label>
            <input
              type="radio"
              name="status"
              id="Display"
              value={true}
              className="my-[10px] mx-[20px] accent-[#5351c9]"
              checked
            />
            <label for="Display">Display</label>
            <input
              type="radio"
              name="status"
              id="Hide"
              value={false}
              className="my-[10px] mx-[20px] accent-[#5351c9]"

            />
            <label for="Hide">Hide</label>
          </div>
          <div className="w-full p-[8px_16px] my-[30px] ">
            <button className="bg-[#5351c9] rounded-md text-white w-[100px] h-[35px]">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
