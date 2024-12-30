import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiRecycle } from "react-icons/bi";
import { CiEdit, CiWarning } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "react-responsive-modal";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";

const ViewCategory = () => {
  let [show1, setShow1] = useState(false);
  let [show2, setShow2] = useState(false);
  const [ProductCategories, setProductCategories] = useState([]);
  const [DeletedProductCategories, setDeletedProductCategories] = useState([]);
  const [ParentCategories, setParentCategories] = useState([]);

  const [isChildSelectChecked, setisChildSelectChecked] = useState([]);
  const [isMasterSelectChecked, setisMasterSelectChecked] = useState(false);
  const [checkedCategoriesIDs, setcheckedCategoriesIDs] = useState([]);

  const [isChildSelectCheckedInBin, setisChildSelectCheckedInBin] = useState([]);
  const [isMasterSelectCheckedInBin, setisMasterSelectCheckedInBin] = useState(false);
  const [checkedCategoriesIDsInBin, setcheckedCategoriesIDsInBin] = useState([]);

  const [filepath, setfilepath] = useState('');
  const [open, setOpen] = useState(false);

  const [noSearchFound, setnoSearchFound] = useState(false);

  const fetchParentCategories = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/parent-category/read-category`)
      .then((response) => {
        setParentCategories(response.data.data);
        setcheckedCategoriesIDs([]);
        setcheckedCategoriesIDsInBin([]);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  const fetchProductCategories = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/read-category`)
      .then((response) => {
        console.log(response.data.data);
        setfilepath(response.data.filepath);
        setProductCategories(response.data.data);
        setcheckedCategoriesIDs([]);
        setcheckedCategoriesIDsInBin([]);
        setnoSearchFound(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const fetchDeletedProductCategories = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/deleted-categories`)
      .then((response) => {
        setDeletedProductCategories(response.data.data);
        setcheckedCategoriesIDs([]);
        setcheckedCategoriesIDsInBin([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchProductCategories();
    fetchParentCategories();
    fetchDeletedProductCategories();
  }, [])


  useEffect(() => {
    setisChildSelectChecked(new Array(ProductCategories.length).fill(false));
    if (ProductCategories.length === 0) setisMasterSelectChecked(false);
  }, [ProductCategories])

  useEffect(() => {
    setisChildSelectCheckedInBin(new Array(DeletedProductCategories.length).fill(false));
    if (DeletedProductCategories.length === 0) setisMasterSelectCheckedInBin(false);
  }, [DeletedProductCategories])

  const updateStatus = (e) => {
    const status = (e.target.textContent !== 'Active');
    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/update-status/${e.target.value}`, { status })
      .then((response) => {
        console.log(response.data);
        setProductCategories((prev) => (
          prev.map((productCategory) => {
            if (productCategory._id == e.target.value) {
              return { ...productCategory, status };
            }
            else {
              return productCategory;
            }
          })
        ))
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const updateIsFeatured = (e) => {
    const is_featured = (e.target.textContent !== 'Featured');
    console.log(is_featured);
    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/update-IsFeatured/${e.target.value}`, { is_featured })
      .then((response) => {
        console.log(response.data);
        setProductCategories((prev) => (
          prev.map((productCategory) => {
            if (productCategory._id == e.target.value) {
              return { ...productCategory, is_featured };
            }
            else {
              return productCategory;
            }
          })
        ))
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const handleMasterCheckbox = (e) => {
    const newMasterCheckedState = !isMasterSelectChecked;
    setisMasterSelectChecked(newMasterCheckedState);

    if (e.target.checked) setcheckedCategoriesIDs(ProductCategories.map((parentCategory) => parentCategory._id));
    if (!e.target.checked) setcheckedCategoriesIDs([]);

    // Set all checkboxes to the same state as master checkbox
    setisChildSelectChecked(new Array(ProductCategories.length).fill(newMasterCheckedState));
  }


  const handleChildCheckbox = (e, index) => {

    if (e.target.checked) setcheckedCategoriesIDs(((prev) => [...prev, e.target.value]));
    if (!e.target.checked) {
      const temp_array = checkedCategoriesIDs;
      const index = temp_array.indexOf(e.target.value);
      if (index > -1) temp_array.splice(index, 1);
      setcheckedCategoriesIDs(temp_array);
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
        axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/delete-category/${id}`)
          .then((response) => {
            console.log(response.data);
            fetchProductCategories();
            fetchDeletedProductCategories();
            toast.success(`${name} Category Deleted Successfully`, {
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
    if (checkedCategoriesIDs.length > 0) {
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

          axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/delete-categories`, { checkedCategoriesIDs })
            .then((response) => {
              console.log(response.data);
              fetchProductCategories();
              fetchDeletedProductCategories();
              toast.success(`All ${checkedCategoriesIDs.length} Categories Deleted Successfully`, {
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
    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/recover-category/${id}`)
      .then((response) => {
        console.log(response.data.data);
        fetchProductCategories();
        fetchDeletedProductCategories();
        toast.success(`${name} Categories Recovered Successfully`, {
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
      text: "Deleting this Product Category will permanently remove it, along with all linked Products.!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axios.delete(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/permanent-delete-category/${id}`)
          .then((response) => {
            console.log(response.data.data);
            fetchProductCategories();
            fetchDeletedProductCategories();
            toast.success(`${name} Category Deleted Permanently`, {
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
          text: "Product Category deleted successfully, along with all linked Products.",
          icon: "success"
        });
      }
    });


  }

  const handleMasterCheckboxInBin = (e) => {
    const newMasterCheckedState = !isMasterSelectCheckedInBin;
    setisMasterSelectCheckedInBin(newMasterCheckedState);

    if (e.target.checked) setcheckedCategoriesIDsInBin(DeletedProductCategories.map((size) => size._id));
    if (!e.target.checked) setcheckedCategoriesIDsInBin([]);

    // Set all checkboxes to the same state as master checkbox
    setisChildSelectCheckedInBin(new Array(DeletedProductCategories.length).fill(newMasterCheckedState));
  }

  const handleChildCheckboxInBin = (e, index) => {

    if (e.target.checked) setcheckedCategoriesIDsInBin(((prev) => [...prev, e.target.value]));
    if (!e.target.checked) {
      const temp_array = checkedCategoriesIDsInBin;
      const index = temp_array.indexOf(e.target.value);
      if (index > -1) temp_array.splice(index, 1);
      setcheckedCategoriesIDsInBin(temp_array);
    }

    const updatedCheckedStates = isChildSelectCheckedInBin.map((checked, i) => i === index ? !checked : checked);
    setisChildSelectCheckedInBin(updatedCheckedStates);
    // If all checkboxes are checked, set master checkbox to true, otherwise false
    const allChecked = updatedCheckedStates.every((checked) => checked === true);
    setisMasterSelectCheckedInBin(allChecked);
  }

  const handleMultiRecover = () => {
    if (checkedCategoriesIDsInBin.length > 0) {
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

          axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/recover-categories`, { checkedCategoriesIDsInBin })
            .then((response) => {
              console.log(response.data);
              fetchProductCategories();
              fetchDeletedProductCategories();
              toast.success(`All ${checkedCategoriesIDsInBin.length} Product Categories Recovered Successfully`, {
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
    if (checkedCategoriesIDsInBin.length > 0) {
      Swal.fire({
        title: "Are you sure?",
        html: "Deleting these Product Category will permanently remove it, along with all linked Products.!<br>THIS ACTION CAN'T BE REVERT",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {


          axios.delete(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/permanent-delete-categories`, { data: { checkedCategoriesIDsInBin } })
            .then((response) => {
              console.log(response.data);
              fetchProductCategories();
              fetchDeletedProductCategories();
              toast.success(`All ${checkedCategoriesIDsInBin.length} Parent Category Deleted Permanently`, {
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
            text: "Product Category deleted successfully, along with all linked Products.!",
            icon: "success"
          });
        }
      });
    }
  }

  const handleSearch = (e) => { // it is recommended to call handleSearch on the search button 🔍 Click instead of onChange/onInput of input box, because it won't have that much pressure of server
    if (e.target.value == '') return fetchProductCategories();
    axios.post(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/search-categories/${e.target.value}`)
      .then((response) => {
        setProductCategories(response.data.data);
        if (response.data.data.length == 0) return setnoSearchFound(true);
        setnoSearchFound(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleParentCategoryFilter = (e) => {
    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/product-categories-by-parent-category/${e.target.value}`)
      .then((response) => {
        console.log(response.data.data);
        setProductCategories(response.data.data);
        console.log(e.target.value);
      })
      .catch((error) => {
        fetchProductCategories();
        console.error(error);
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
      <span className="flex justify-between h-[40px] bg-[#f8f8f9] text-[20px] text-[#303640] p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        View Category
        <FaTrash className="cursor-pointer" size={25} onClick={() => setOpen(true)} />
        <Modal open={open} onClose={() => setOpen(false)} center>
          <div className="w-[100%] mx-auto my-[20px]">
            <table className="w-full">
              <thead>
                <tr className="text-center border-b">
                  <th className="text-left">
                    <button onClick={handleMultiRecover} className="bg-red-400 rounded-sm px-2 mb-2 py-1">Recover</button><br />
                    <button onClick={handleMultiPermanentDlt} className="bg-red-400 rounded-sm px-2 py-1">Delete Permanent</button>
                    <input onChange={handleMasterCheckboxInBin} checked={isMasterSelectCheckedInBin} type="checkbox" name="deleteAll" className="m-[0_10px] accent-[#5351c9] cursor-pointer input"
                    />
                  </th>
                  <th>Sno</th>
                  <th>Category Name</th>
                  <th>Parent Category</th>
                  <th>Slug</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {

                  DeletedProductCategories.map((category, index) => (
                    <tr className="border-b">
                      <td>
                        <input value={category._id} checked={isChildSelectCheckedInBin[index]} onChange={(e) => handleChildCheckboxInBin(e, index)}
                          type="checkbox"
                          name="delete"
                          className="accent-[#5351c9] cursor-pointer input"
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{category.name}</td>
                      <td>{category.parent_category && category.parent_category.name}</td>
                      <td>{category.slug}</td>
                      <td className="object-contain p-2">
                        {category.thumbnail ?
                          <img
                            src={`${filepath + category.thumbnail}`}
                            width={80}
                            height={80}
                          /> :
                          <span className="flex align-middle"> <CiWarning color="orange" size={25} /> Image Not Found</span>
                        }
                      </td>

                      <td>
                        <MdDelete onClick={() => handlePermanentDlt(category._id, category.name)} className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                        |{" "}
                        <BiRecycle onClick={() => handleRecover(category._id, category.name)} className="my-[5px] text-yellow-500 cursor-pointer inline" />
                      </td>

                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </Modal>
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="text-center border-b">
              <th>
                <button onClick={handleMultiDlt} className="bg-red-400 rounded-sm px-2 py-1">Delete</button>
                <input onChange={handleMasterCheckbox} checked={isMasterSelectChecked}
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
                  className="accent-[#5351c9]"
                />
              </th>
              <th>Sno</th>
              <th>Category Name</th>
              <th className="flex flex-col">Parent Category
                <select onChange={handleParentCategoryFilter}>
                  <option>--Select--</option>
                  {
                    ParentCategories.map((category) => (
                      <option value={category._id}>{category.name}</option>
                    ))
                  }
                </select>
              </th>
              <th>Slug</th>
              <th>Image</th>
              <th>Description</th>
              <th>Action</th>
              <th>Status</th>
              <th className="text-center">Is Featured</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {
              ProductCategories.map((category, index) => (
                <tr className="border-b">
                  <td>
                    <input value={category._id} checked={isChildSelectChecked[index]} onChange={(e) => handleChildCheckbox(e, index)}
                      type="checkbox"
                      name="delete"
                      id="delete1"
                      className="accent-[#5351c9] cursor-pointer"
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>{category.parent_category && category.parent_category.name}</td>
                  <td>{category.slug}</td>
                  <td className="object-contain p-2">
                    {category.thumbnail ?
                      <img
                        src={`${filepath + category.thumbnail}`}
                        alt="product men's t-shirt"
                        width={80}
                        height={80}
                      /> :
                      <span style={{ width: '100px', margin: '0px', padding: '0px' }} className="flex align-middle"> <CiWarning color="orange" size={20} /> Image Not Found</span>
                    }
                  </td>
                  <td className="w-[80px] flex-wrap">
                    {category.description}
                  </td>
                  <td>
                    <MdDelete onClick={() => handleDlt(category._id, category.name)} className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                    |{" "}
                    <Link to={`/dashboard/products/update-category/${category._id}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td>
                    <button onClick={updateStatus} value={category._id} data-tooltip-id="btn-tooltip" data-tooltip-content={!category.status ? "Click to Active" : " Click to Inactive"} className={`${category.status ? "bg-green-600" : "bg-red-600"} text-white font-light rounded-md my-1 p-1 w-[80px] h-[35px] cursor-pointer`}>
                      {category.status ? "Active" : "Inactive"}
                    </button>
                    <Tooltip id="btn-tooltip" />
                  </td>
                  <td className="text-center">
                    <button onClick={updateIsFeatured} value={category._id} data-tooltip-id="btn-isfeatured" data-tooltip-content={!category.is_featured ? "Click to set Featured" : " Click to remove from Featured"} className={`${category.is_featured ? "bg-green-600" : "bg-red-600"} text-white font-light rounded-md my-1 p-1  h-[35px] cursor-pointer`}>
                      {category.is_featured ? "Featured" : "Not Featured"}
                    </button>
                    <Tooltip id="btn-isfeatured" />
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

export default ViewCategory;
