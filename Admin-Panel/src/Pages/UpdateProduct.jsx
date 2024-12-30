import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from 'react-select'
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const UpdateProduct = () => {

  const [Product, setProduct] = useState({});

  const [ParentCategories, setParentCategories] = useState([]);
  const [ProductCategories, setProductCategories] = useState([]);
  const [Colors, setColors] = useState([]);
  const [Sizes, setSizes] = useState([]);
  const [keepStyleofReactSelect, setkeepStyleofReactSelect] = useState(false);
  const [SelectedSizes, setSelectedSizes] = useState([]);
  const [SelectedColors, setSelectedColors] = useState([]);
  const [preIMGs, setpreIMGs] = useState({});
  const [isArray, setisArray] = useState(false);
  const [filepath, setfilepath] = useState('');


  const id = useParams()._id;

  const nav = useNavigate();

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

  const fetchProduct = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/product/read-product/${id}`)
      .then((response) => {

        setProduct(response.data.data[0]);

        const oldSizes = response.data.data[0].size.map(size => ({ ...size, label: size.name, value: size._id }));
        setSelectedSizes(oldSizes);
        const oldColors = response.data.data[0].color.map(color => ({ ...color, label: color.name, value: color._id }));
        setSelectedColors(oldColors);

        console.log(response.data.data);
        const e = { // getting all product categories of parent category from old data on page load
          target: {
            name: 'parent_category',
            value: response.data.data[0].parent_category._id,
          },
        };
        ProductCategoriesByParentCategory(e);
        setfilepath(response.data.filepath);

        setpreIMGs({
          thumbnail: response.data.filepath + response.data.data[0].thumbnail,
          image_on_hover: response.data.filepath + response.data.data[0].image_on_hover,
          gallery: response.data.data[0].gallery.map((img) => (response.data.filepath + img))
        });

      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    fetchProduct();
    fetchParenteCategories();
    fetchSizes();
    fetchColors();
  }, [])

  useEffect(() => {
    // console.log(preIMGs.gallery);
    setisArray(Array.isArray(preIMGs.gallery));
  }, [preIMGs.gallery])

  const handlePreview = (e) => {
    setpreIMGs({ ...preIMGs, [e.target.name]: null }); // Removing preview if input file clicked but no file is selected
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

  const fetchParenteCategories = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/parent-category/activated-categories`)
      .then((response) => {
        setParentCategories(response.data.data);
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

  const handleUpdate = (e) => {
    e.preventDefault();

    console.log(e.target);

    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/product/update-product/${id}`, e.target)
      .then((response) => {
        console.log(response.data.data);
        nav('/dashboard/products/view-product');
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
      });
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
        Update Product Details
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleUpdate}>
          <div className="w-full my-[10px] name">
            <label htmlFor="name" className="block text-[#303640]">
              Product Name
            </label>
            <input
              value={Product.name}
              onChange={(e) => setProduct({ ...Product, name: e.target.value })}
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px] description">
            <label htmlFor="description" className="block text-[#303640]">
              Product Description
            </label>
            <textarea
              value={Product.description}
              onChange={(e) => setProduct({ ...Product, description: e.target.value })}
              id="description"
              name="description"
              placeholder="Description"
              rows={3}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px] short_description">
            <label
              htmlFor="short_description"
              className="block text-[#303640]"
            >
              Short Description
            </label>
            <textarea
              value={Product.short_description}
              onChange={(e) => setProduct({ ...Product, short_description: e.target.value })}
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
              <a href={`${preIMGs.thumbnail}`} target="_blank"><img src={preIMGs.thumbnail || filepath + Product.thumbnail}  alt="Logo" name="logo" width={300} /></a> {/* filepath + Product.thumbnail is used if no file is selected then img tag will have image from old data*/} 
            <input
              type="file"
              id="thumbnail"
              onChange={handlePreview}
              name="thumbnail"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px] image_on_hover">
            <label htmlFor="image_on_hover" className="block text-[#303640]">
              Image Animation
            </label>
            <a href={`${preIMGs.image_on_hover}`} target="_blank"><img src={preIMGs.image_on_hover || ''} style={{ display: preIMGs.image_on_hover ? 'inline' : 'none' }} alt="Logo" name="logo" width={300} /></a>
            <input
              type="file"
              id="image_on_hover"
              onChange={handlePreview}
              name="image_on_hover"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px] gallery">
            <label htmlFor="gallery" className="block text-[#303640]">
              Product Gallery
            </label>
            {
              (preIMGs.gallery && !isArray) ?
                <a href={`${preIMGs.gallery}`} target="_blank"><img src={preIMGs.gallery} alt="Gallery" key={preIMGs.gallery} style={{ width: '200px', height: '250px' }} /></a>
                : null // if selected file is single then it will show error on map function of the below code, that's why this code is written
            }
            <div className="flex justify-around flex-wrap">
              {
                (preIMGs.gallery && isArray) ? preIMGs.gallery.map((img) => ( // preIMGs.gallery && checks first if the preIMGs has a key named "gallery"
                  <a href={`${img}`} target="_blank"><img src={img} alt="Gallery" key={img} style={{ width: '200px', height: '250px' }} /></a>
                )) : ''
              }
            </div>
            <input
              type="file"
              id="gallery"
              onChange={handlePreview}
              multiple
              name="gallery"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px] grid grid-cols-[2fr_2fr] gap-[20px] price&mrp">
            <div className="price">
              <label htmlFor="price" className="block text-[#303640]">
                Price
              </label>
              <input
                value={Product.price}
                onChange={(e) => setProduct({ ...Product, price: e.target.value })}
                type="text"
                id="price"
                name="price"
                placeholder="Product Price"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
            <div className="mrp">
              <label htmlFor="mrp" className="block text-[#303640]">
                MRP
              </label>
              <input
                value={Product.mrp}
                onChange={(e) => setProduct({ ...Product, mrp: e.target.value })}
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

              {
                ParentCategories.map((parentCategory) => (
                  <option
                    key={parentCategory._id}
                    {...(Product.parent_category && Product.parent_category._id === parentCategory._id ? { selected: true } : {})} // "ProductCategory.parent_category &&" checking if productCategory.parent_category exists, only then compare and set selected:true
                    value={parentCategory._id}> {parentCategory.name}
                  </option>
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
              {
                ProductCategories.map((productCategory) => (
                  <option
                    key={productCategory._id}
                    {...(Product.product_category && Product.product_category._id === productCategory._id ? { selected: true } : {})}
                    value={productCategory._id}>{`${productCategory.name} (${productCategory.parent_category.name})`}</option>
                ))
              }
            </select>
          </div>
          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px">
            <div className="isStockAvail">
              <label htmlFor="isStockAvail" className="block text-[#303640]">
                Manage Stock
              </label>
              <select
                name="isStockAvail"
                id="isStockAvail"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              >
                <option value={true} {...(Product.isStockAvail ? { selected: true } : {})}>In Stock</option>
                <option value={false} {...(!Product.isStockAvail ? { selected: true } : {})}>Out of Stock</option>
              </select>
            </div>
            <div className="ms-2 brand">
              <label htmlFor="brand" className="block text-[#303640]">
                Brand Name
              </label>
              <input
                value={Product.brand}
                onChange={(e) => setProduct({ ...Product, brand: e.target.value })}
                type="text"
                name="brand"
                id="brand"
                placeholder="Brand"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div className="size">
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
            <div className="color">
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
                  <input className="cursor-pointer" onChange={() => setkeepStyleofReactSelect(!keepStyleofReactSelect)} id="swapReactSelectStyle" type="checkbox" />
                  <label className="cursor-pointer px-2" for="swapReactSelectStyle">preview</label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-[8px_16px] my-[30px] ">
            <button className="bg-[#5351c9] rounded-md text-white p-2">
              Update Product
            </button>
          </div>
        </form>
      </div >
    </div >
  );
};

export default UpdateProduct;
