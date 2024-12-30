import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiRecycle } from "react-icons/bi";
import { CiEdit, CiLogin, CiWarning } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "react-responsive-modal";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";

const ViewProduct = () => {
  let [showDesc1, setShowDesc1] = useState(false);
  let [showShortDesc1, setShowShortDesc1] = useState(false);
  const [Products, setProducts] = useState([]);
  const [ParentCategories, setParentCategories] = useState([]);
  const [DeletedProducts, setDeletedProducts] = useState([]);

  const [open, setOpen] = useState(false);
  const [DetailesOpen, setDetailesOpen] = useState(false);

  // const [DetailsProduct, setDetailsProduct] = useState({});

  const [isChildSelectChecked, setisChildSelectChecked] = useState([]);
  const [isMasterSelectChecked, setisMasterSelectChecked] = useState(false);
  const [checkedProductsIDs, setcheckedProductsIDs] = useState([]);

  const [isChildSelectCheckedInBin, setisChildSelectCheckedInBin] = useState([]);
  const [isMasterSelectCheckedInBin, setisMasterSelectCheckedInBin] = useState(false);
  const [checkedProductsIDsInBin, setcheckedProductsIDsInBin] = useState([]);

  const [filepath, setfilepath] = useState('');

  const [noSearchFound, setnoSearchFound] = useState(false);

  const fetchParentCategories = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/parent-category/read-category`)
      .then((response) => {
        setParentCategories(response.data.data);
        setcheckedProductsIDs([]);
        setcheckedProductsIDsInBin([]);

      })
      .catch((error) => {
        console.log(error);
      });
  }

  const fetchProducts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/product/read-products`)
      .then((response) => {
        setfilepath(response.data.filepath);
        setProducts(response.data.data);
        setcheckedProductsIDs([]);
        setcheckedProductsIDsInBin([]);
        setnoSearchFound(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const fetchDeletedProducts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/product/deleted-products`)
      .then((response) => {
        setDeletedProducts(response.data.data);
        setcheckedProductsIDs([]);
        setcheckedProductsIDsInBin([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchProducts();
    fetchDeletedProducts();
    fetchParentCategories();
  }, [])

  const updateStatus = (e) => {
    const status = (e.target.textContent !== 'Active');
    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/product/update-status/${e.target.value}`, { status })
      .then((response) => {
        console.log(response.data);
        setProducts((prev) => (
          prev.map((product) => {
            if (product._id == e.target.value) {
              return { ...product, status };
            }
            else {
              return product;
            }
          })
        ))
      })
      .catch((error) => {
        console.log(error);
      });
  }


  useEffect(() => {
    setisChildSelectChecked(new Array(Products.length).fill(false));
    if (Products.length === 0) setisMasterSelectChecked(false);
  }, [Products])

  useEffect(() => {
    setisChildSelectCheckedInBin(new Array(DeletedProducts.length).fill(false));
    if (DeletedProducts.length === 0) setisMasterSelectCheckedInBin(false);
  }, [DeletedProducts])

  const handleMasterCheckbox = (e) => {
    const newMasterCheckedState = !isMasterSelectChecked;
    setisMasterSelectChecked(newMasterCheckedState);

    if (e.target.checked) setcheckedProductsIDs(Products.map((product) => product._id));
    if (!e.target.checked) setcheckedProductsIDs([]);

    // Set all checkboxes to the same state as master checkbox
    setisChildSelectChecked(new Array(Products.length).fill(newMasterCheckedState));
  }


  const handleChildCheckbox = (e, index) => {

    if (e.target.checked) setcheckedProductsIDs(((prev) => [...prev, e.target.value]));
    if (!e.target.checked) {
      const temp_array = checkedProductsIDs;
      const index = temp_array.indexOf(e.target.value);
      if (index > -1) temp_array.splice(index, 1);
      setcheckedProductsIDs(temp_array);
    }

    const updatedCheckedStates = isChildSelectChecked.map((checked, i) => i === index ? !checked : checked);
    setisChildSelectChecked(updatedCheckedStates);
    // If all checkboxes are checked, set master checkbox to true, otherwise false
    const allChecked = updatedCheckedStates.every((checked) => checked === true);
    setisMasterSelectChecked(allChecked);
  }

  const handleDlt = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Deleted item will be moved to Recycle bin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/product/delete-product/${id}`)
          .then((response) => {
            console.log(response.data);
            fetchProducts();
            fetchDeletedProducts();
            toast.success(`${name} Product Deleted Successfully`, {
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
          })

        Swal.fire({
          title: "Deleted!",
          text: "deleted successfully.",
          icon: "success"
        });
      }
    });


  }

  const handleMultiDlt = () => {
    if (checkedProductsIDs.length > 0) {
      Swal.fire({
        title: "Are you sure?",
        text: "Deleted items will be moved to Recycle bin!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

          axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/product/delete-products`, { checkedProductsIDs })
            .then((response) => {
              console.log(response.data);
              fetchProducts();
              fetchDeletedProducts();
              toast.success(`All ${checkedProductsIDs.length} Categories Deleted Successfully`, {
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
            })

          Swal.fire({
            title: "Deleted!",
            text: "delted succefully.",
            icon: "success"
          });
        }
      });
    }
  }

  const handleRecover = (id, name) => {
    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/product/recover-product/${id}`)
      .then((response) => {
        fetchProducts();
        fetchDeletedProducts();
        toast.success(`${name} Product Recovered Successfully`, {
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
      })
  }

  const handlePermanentDlt = (id, name) => {

    Swal.fire({
      title: "Are you sure?",
      text: "Deleting this Product will permanently remove it.!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axios.delete(`${process.env.REACT_APP_API_URL}/api/admin-panel/product/permanent-delete-product/${id}`)
          .then((response) => {
            console.log(response.data.data);
            fetchProducts();
            fetchDeletedProducts();
            toast.success(`${name} Product Deleted Permanently`, {
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
          })

        Swal.fire({
          title: "Deleted!",
          text: "Product deleted successfully",
          icon: "success"
        });
      }
    });


  }


  const handleMasterCheckboxInBin = (e) => {
    const newMasterCheckedState = !isMasterSelectCheckedInBin;
    setisMasterSelectCheckedInBin(newMasterCheckedState);

    if (e.target.checked) setcheckedProductsIDsInBin(DeletedProducts.map((size) => size._id));
    if (!e.target.checked) setcheckedProductsIDsInBin([]);

    // Set all checkboxes to the same state as master checkbox
    setisChildSelectCheckedInBin(new Array(DeletedProducts.length).fill(newMasterCheckedState));
  }

  const handleChildCheckboxInBin = (e, index) => {

    if (e.target.checked) setcheckedProductsIDsInBin(((prev) => [...prev, e.target.value]));
    if (!e.target.checked) {
      const temp_array = checkedProductsIDsInBin;
      const index = temp_array.indexOf(e.target.value);
      if (index > -1) temp_array.splice(index, 1);
      setcheckedProductsIDsInBin(temp_array);
    }

    const updatedCheckedStates = isChildSelectCheckedInBin.map((checked, i) => i === index ? !checked : checked);
    setisChildSelectCheckedInBin(updatedCheckedStates);
    // If all checkboxes are checked, set master checkbox to true, otherwise false
    const allChecked = updatedCheckedStates.every((checked) => checked === true);
    setisMasterSelectCheckedInBin(allChecked);
  }

  const handleMultiRecover = () => {
    if (checkedProductsIDsInBin.length > 0) {
      Swal.fire({
        title: "Are you sure?",
        text: "Selected items will be recovered!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, recover!"
      }).then((result) => {
        if (result.isConfirmed) {

          axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/product/recover-products`, { checkedProductsIDsInBin })
            .then((response) => {
              console.log(response.data);
              fetchProducts();
              fetchDeletedProducts();
              toast.success(`All ${checkedProductsIDsInBin.length} Products Recovered Successfully`, {
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
            })

          Swal.fire({
            title: "Recovered!",
            text: "Recovered succefully.",
            icon: "success"
          });
        }
      });
    }
  }

  const handleMultiPermanentDlt = () => {
    if (checkedProductsIDsInBin.length > 0) {
      Swal.fire({
        title: "Are you sure?",
        html: "Deleting these Product Category will permanently remove it.!<br>THIS ACTION CAN'T BE REVERT",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!"
      }).then((result) => {
        if (result.isConfirmed) {


          axios.delete(`${process.env.REACT_APP_API_URL}/api/admin-panel/product/permanent-delete-products`, { data: { checkedProductsIDsInBin } })
            .then((response) => {
              console.log(response.data);
              fetchProducts();
              fetchDeletedProducts();
              toast.success(`All ${checkedProductsIDsInBin.length} Parent Category Deleted Permanently`, {
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
            })

          Swal.fire({
            title: "Deleted!",
            text: "Products deleted successfully.!",
            icon: "success"
          });
        }
      });
    }
  }

  const handleSearch = (e) => { // it is recommended to call handleSearch on the search button 🔍 Click instead of onChange/onInput of input box, because it won't have that much pressure of server
    if (e.target.value == '') return fetchProducts();
    axios.post(`${process.env.REACT_APP_API_URL}/api/admin-panel/size/search-sizes/${e.target.value}`)
      .then((response) => {
        setProducts(response.data.data);
        if (response.data.data.length == 0) return setnoSearchFound(true);
        setnoSearchFound(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleParentCategoryFilter = (e) => {
    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/product/products-by-parent-category/${e.target.value}`)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        fetchProducts();
        console.error(error);
      });
  }


  return (
    <div className="w-[90%] mx-auto my-[150px] rounded-[10px] bg-white border">
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
      <div className="m-3">
        <input
          type="text"
          name="search"
          id="categoryName"
          placeholder="search..."
          className="input border p-2 w-full rounded-[5px] my-[10px]"
          onInput={handleSearch}
        />
      </div>
      <span className="flex  justify-between h-[40px] bg-[#f8f8f9] text-[20px] text-[#303640] font-bold p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        View Product
        <FaTrash className="cursor-pointer" size={25} onClick={() => setOpen(true)} />
        <Modal classNames='TrashBin' open={open} onClose={() => setOpen(false)} center >
          <div className="w-[100%] mx-auto my-[20px]">
            <table className=" w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="text-left">
                    <button onClick={handleMultiRecover} className="bg-red-400 rounded-sm px-2 mb-2 py-1">Recover</button><br />
                    <button onClick={handleMultiPermanentDlt} className="bg-red-400 rounded-sm px-2 py-1">Delete Permanent</button>
                    <input onChange={handleMasterCheckboxInBin} checked={isMasterSelectCheckedInBin} type="checkbox" name="deleteAll" className="m-[0_10px] accent-[#5351c9] cursor-pointer input"
                    />
                  </th>
                  <th>Sno</th>
                  <th>Product Name</th>
                  <th>Parent Category</th>
                  <th>Product Category</th>
                  <th>Thumbnail</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  DeletedProducts && DeletedProducts.map((product, index) => (
                    <tr className="border-b">
                      <td>
                        <input value={product._id} checked={isChildSelectCheckedInBin[index]} onChange={(e) => handleChildCheckboxInBin(e, index)}
                          type="checkbox"
                          name="delete"
                          className="accent-[#5351c9] cursor-pointer input"
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{product.name}</td>
                      <td className="w-[100px] p-2">
                        {product.parent_category.name}
                      </td>
                      <td className="w-[100px] p-2">
                        {product.product_category && product.product_category.name}
                      </td>
                      <td className="object-contain cursor-pointer"
                        onClick={() => setDetailesOpen(true)} data-tooltip-id="details-tooltip" data-tooltip-content='Click for Details'>
                        <Tooltip id="details-tooltip" />
                        {product.thumbnail ?
                          <img
                            src={filepath + product.thumbnail}
                            width={80}
                            height={80}
                            className="rounded-[5px]"
                          /> :
                          <span className="flex align-middle"> <CiWarning color="orange" size={25} /> Image Not Found</span>
                        }

                      </td>
                      <td>
                        <MdDelete onClick={() => handlePermanentDlt(product._id, product.name)} className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                        |{" "}
                        <BiRecycle onClick={() => handleRecover(product._id, product.name)} className="my-[5px] text-yellow-500 cursor-pointer inline" />
                      </td>

                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </Modal>

        <Modal classNames='DetailedBox' open={DetailesOpen} onClose={() => setDetailesOpen(false)} center >

        </Modal>
      </span>

      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="border-b text-center">
              <th className="flex gap-[5px]">
                <button onClick={handleMultiDlt} className="bg-red-400 rounded-sm px-2 py-1">Delete</button>
                <input onChange={handleMasterCheckbox} checked={isMasterSelectChecked}
                  type="checkbox"
                  id="deleteAll"
                  name="delete"
                  className="input accent-[#5351c9] cursor-pointer h-[fit-content] m-[5px]"
                />
              </th>
              <th>Sno</th>
              <th>Product <br /> Name</th>
              <th className="flex flex-col">Parent <br /> Category
                <select onChange={handleParentCategoryFilter}>
                  <option>--Select--</option>
                  {
                    ParentCategories.map((category) => (
                      <option value={category._id}>{category.name}</option>
                    ))
                  }
                </select>
              </th>
              <th>Product <br /> Category</th>
              <th>Thumbnail</th>
              <th>Price</th>
              <th>MRP</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              Products && Products.map((product, index) => (
                <tr className="border-b text-center">
                  <td>
                    <input value={product._id} checked={isChildSelectChecked[index]} onChange={(e) => handleChildCheckbox(e, index)}
                      type="checkbox"
                      id="delete"
                      name="delete"
                      className="input accent-[#5351c9] cursor"
                    />
                  </td>
                  <td className="w-[50px] p-2">{index + 1}</td>
                  <td>{product.name}</td>
                  <td className="w-[100px] p-2">
                    {product.parent_category.name}
                  </td>
                  <td className="w-[130px] p-2">
                    {product.product_category && product.product_category.name}
                  </td>
                  <td className="object-contain text-center cursor-pointer"
                    onClick={() => setDetailesOpen(true)} data-tooltip-id={`details-tooltip-of-${product._id}`}>
                    <Tooltip
                      className="z-50"
                      id={`details-tooltip-of-${product._id}`}
                      content={
                        <DetailedProduct
                          product={product}
                          filepath={filepath} />}
                    />
                    {product.thumbnail ?
                      <img
                        src={filepath + product.thumbnail}
                        alt="men's t-shirt"
                        width={80}
                        height={80}
                        className="rounded-[5px] inline"
                      /> :
                      <span className="flex align-middle text-center"> <CiWarning color="orange" size={25} /> Image Not Found</span>
                    }
                  </td>
                  <td className="px-4">{product.price}&#8377;</td>
                  <td className="px-4">{product.mrp}&#8377;</td>
                  <td>
                    <MdDelete onClick={() => handleDlt(product._id, product.name)} className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                    |{" "}
                    <Link to={`/dashboard/products/update-product/${product._id}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td>
                    <button onClick={updateStatus} value={product._id} data-tooltip-id="btn-tooltip" data-tooltip-content={!product.status ? "Click to Active" : " Click to Inactive"} className={`${product.status ? "bg-green-600" : "bg-red-600"} text-white font-light rounded-md my-1 p-1 w-[80px] h-[35px] cursor-pointer`}>
                      {product.status ? "Active" : "Inactive"}
                    </button>
                    <Tooltip id="btn-tooltip" />
                  </td>
                </tr>
              ))

            }

          </tbody>
        </table>
      </div>
      <div className="No-Seach-Data-Found m-auto" style={
        {
          display: noSearchFound ? 'block' : 'none',
          backgroundSize: 'cover',
          width: '60vw',
          fontSize: '50px',
          textAlign: 'center',
          color: 'black',
          alignContent: 'center',
        }
      }>
        404 : No Data Found
      </div>
    </div>
  );
};

const DetailedProduct = (props) => {
  return (
    <div className="bg-black w-[95vw]" >
      <div className="w-[90%] mx-auto my-[20px]">
        <table className=" w-full">
          <thead>
            <tr className="border-b text-center">
              <th>Product Name</th>
              <th>Description</th>
              <th>Short Description</th>
              <th>Image On Hover</th>
              <th>Sizes</th>
              <th>Colors</th>
              <th>Gallery</th>
              <th>Stock</th>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>
            {

              <tr className="border-b w-[95vw]">
                <td className="w-[100px] break-all p-2">
                  {props.product.name}
                </td>
                <td className="w-[200px] break-all p-2">
                  {props.product.description}
                </td>
                <td className="w-[200px] break-all p-2">
                  {props.product.short_description}
                </td>
                <td className="object-contain cursor-pointer">
                  <div>
                    {props.product.image_on_hover ?
                      <img
                        src={props.filepath + props.product.image_on_hover}
                        alt="men's t-shirt"
                        width={80}
                        height={80}
                        className="rounded-[5px] inline"
                      /> :
                      <span className="flex text-center align-middle"> <CiWarning color="orange" size={25} /> Image Not Found</span>
                    }
                  </div>
                </td>
                <td>
                  {props.product.size.map((size) => (size.name)).join(' , ')}
                </td>
                <td>
                  {props.product.color.map((color) => (color.name)).join(' , ')}
                </td>
                <td className="flex justify-around flex-wrap">
                  {
                    props.product.gallery ? props.product.gallery.map((img) => (
                      <img
                        src={props.filepath + img}
                        alt="men's t-shirt"
                        width={80}
                        height={80}
                        className="rounded-[5px] self-center"
                      />
                    )) : <span className="flex text-center align-middle"> <CiWarning color="orange" size={25} /> Images Not Found</span>
                  }
                </td>
                <td>
                  {props.product.stock ? 'Available' : 'Out of Stock'}
                </td>
                <td>
                  {props.product.brand}
                </td>
              </tr>
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewProduct;
