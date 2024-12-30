import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import Modal from "react-responsive-modal";
import { FaTrash } from "react-icons/fa";
import { BiReceipt, BiRecycle } from "react-icons/bi";

const ViewSizes = () => {

  const [open, setOpen] = useState(false);

  const [Size, setSize] = useState([]);
  const [DeletedSizes, setDeletedSizes] = useState([]);

  const [isChildSelectChecked, setisChildSelectChecked] = useState([]);
  const [isMasterSelectChecked, setisMasterSelectChecked] = useState(false);
  const [checkedSizeIDs, setcheckedSizeIDs] = useState([]);

  const [isChildSelectCheckedInBin, setisChildSelectCheckedInBin] = useState([]);
  const [isMasterSelectCheckedInBin, setisMasterSelectCheckedInBin] = useState(false);
  const [checkedSizeIDsInBin, setcheckedSizeIDsInBin] = useState([]);

  const [noSearchFound, setnoSearchFound] = useState(false);

  const fetchSizes = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/size/read-sizes`)
      .then((response) => {
        setSize(response.data.data);
        setcheckedSizeIDsInBin([]);
        setcheckedSizeIDs([]);
        setnoSearchFound(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const fetchDeletedSizes = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/size/deleted-sizes`)
      .then((response) => {
        console.log(response.data);
        setDeletedSizes(response.data.data);
        setcheckedSizeIDsInBin([]);
        setcheckedSizeIDs([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const updateStatus = (e) => {
    const status = (e.target.textContent !== 'Active');
    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/size/update-status/${e.target.value}`, { status })
      .then((response) => {
        console.log(response.data);
        setSize((prev) => (
          prev.map((size) => {
            if (size._id == e.target.value) {
              return { ...size, status };
            }
            else {
              return size;
            }
          })
        ))
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchSizes();
    fetchDeletedSizes();
  }, [])

  useEffect(() => {
    setisChildSelectChecked(new Array(Size.length).fill(false));
    if (Size.length === 0) setisMasterSelectChecked(false);
  }, [Size])

  useEffect(() => {
    setisChildSelectCheckedInBin(new Array(DeletedSizes.length).fill(false));
    if (DeletedSizes.length === 0) setisMasterSelectCheckedInBin(false);
  }, [DeletedSizes])


  const handleMasterCheckbox = (e) => {
    const newMasterCheckedState = !isMasterSelectChecked;
    setisMasterSelectChecked(newMasterCheckedState);

    if (e.target.checked) setcheckedSizeIDs(Size.map((size) => size._id));
    if (!e.target.checked) setcheckedSizeIDs([]);

    // Set all checkboxes to the same state as master checkbox
    setisChildSelectChecked(new Array(Size.length).fill(newMasterCheckedState));
  }

  const handleChildCheckbox = (e, index) => {

    if (e.target.checked) setcheckedSizeIDs(((prev) => [...prev, e.target.value]));
    if (!e.target.checked) {
      const temp_array = checkedSizeIDs;
      const index = temp_array.indexOf(e.target.value);
      if (index > -1) temp_array.splice(index, 1);
      setcheckedSizeIDs(temp_array);
    }

    const updatedCheckedStates = isChildSelectChecked.map((checked, i) => i === index ? !checked : checked);
    setisChildSelectChecked(updatedCheckedStates);
    // If all checkboxes are checked, set master checkbox to true, otherwise false
    const allChecked = updatedCheckedStates.every((checked) => checked === true);
    setisMasterSelectChecked(allChecked);
  }

  const handleMasterCheckboxInBin = (e) => {
    const newMasterCheckedState = !isMasterSelectCheckedInBin;
    setisMasterSelectCheckedInBin(newMasterCheckedState);

    if (e.target.checked) setcheckedSizeIDsInBin(DeletedSizes.map((size) => size._id));
    if (!e.target.checked) setcheckedSizeIDsInBin([]);

    // Set all checkboxes to the same state as master checkbox
    setisChildSelectCheckedInBin(new Array(DeletedSizes.length).fill(newMasterCheckedState));
  }

  const handleChildCheckboxInBin = (e, index) => {

    if (e.target.checked) setcheckedSizeIDsInBin(((prev) => [...prev, e.target.value]));
    if (!e.target.checked) {
      const temp_array = checkedSizeIDsInBin;
      const index = temp_array.indexOf(e.target.value);
      if (index > -1) temp_array.splice(index, 1);
      setcheckedSizeIDsInBin(temp_array);
    }

    const updatedCheckedStates = isChildSelectCheckedInBin.map((checked, i) => i === index ? !checked : checked);
    setisChildSelectCheckedInBin(updatedCheckedStates);
    console.log(updateStatus);
    // If all checkboxes are checked, set master checkbox to true, otherwise false
    const allChecked = updatedCheckedStates.every((checked) => checked === true);
    setisMasterSelectCheckedInBin(allChecked);
    console.log(allChecked);
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

        axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/size/delete-size/${id}`)
          .then((response) => {
            console.log(response.data);
            fetchSizes();
            fetchDeletedSizes();
            toast.success(`${name} Size Deleted Successfully`, {
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

    if (checkedSizeIDs.length > 0) {
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

          axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/size/delete-sizes`, { checkedSizeIDs })
            .then((response) => {
              console.log(response.data);
              fetchSizes();
              fetchDeletedSizes();
              toast.success(`All ${checkedSizeIDs.length} Sizes Deleted Successfully`, {
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
    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/size/recover-size/${id}`)
      .then((response) => {
        console.log(response.data.data);
        fetchSizes();
        fetchDeletedSizes();
        toast.success(`${name} Size Recovered Successfully`, {
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

  const handleMultiRecover = () => {
    if (checkedSizeIDsInBin.length > 0) {
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

          axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/size/recover-sizes`, { checkedSizeIDsInBin })
            .then((response) => {
              console.log(response.data);
              fetchSizes();
              fetchDeletedSizes();
              toast.success(`All ${checkedSizeIDsInBin.length} Sizes Recovered Successfully`, {
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


  const handlePermanentDlt = (id, name) => {

    Swal.fire({
      title: "Are you sure?",
      text: "Deleting this Size will permanently remove it.!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axios.delete(`${process.env.REACT_APP_API_URL}/api/admin-panel/size/permanent-delete-size/${id}`)
          .then((response) => {
            console.log(response.data.data);
            fetchSizes();
            fetchDeletedSizes();
            toast.success(`${name} Size Deleted Permanently`, {
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
          text: "Size deleted successfully",
          icon: "success"
        });
      }
    });


  }

  const handleMultiPermanentDlt = () => {
    console.log(checkedSizeIDsInBin);
    if (checkedSizeIDsInBin.length > 0) {
      Swal.fire({
        title: "Are you sure?",
        html: "Selected items will be Deleted Permanently<br>THE CHANGES CAN'T BE REVERT!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

          /* 
          DELETE requests with a body require specifying data in axios. By default, axios.delete expects any payload to be provided this way. Here’s the correct syntax:
          axios.delete(
          `${process.env.REACT_APP_API_URL}/api/admin-panel/size/permanent-delete-sizes`, 
            { data: { ArrayofCheckedIDs } });

          This will ensure that ArrayofCheckedIDs is included in the request body, and the backend should receive it under req.body.ArrayofCheckedIDs.
          Alternatively, if the backend is expecting it as a query parameter, you could structure it this way:
          axios.delete(
          `${process.env.REACT_APP_API_URL}/api/admin-panel/size/permanent-delete-sizes`, 
            { params: { ArrayofCheckedIDs } });
          However, using data is the more common approach for sending arrays in a DELETE request body.
          */

          axios.delete(`${process.env.REACT_APP_API_URL}/api/admin-panel/size/permanent-delete-sizes`, { data: { checkedSizeIDsInBin } })
            .then((response) => {
              console.log(response.data);
              fetchSizes();
              fetchDeletedSizes();
              toast.success(`All ${checkedSizeIDsInBin.length} Sizes Deleted Permanently`, {
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
            text: "Deleted succefully.",
            icon: "success"
          });
        }
      });
    }
  }

  const handleSearch = (e) => { // it is recommended to call handleSearch on the search button 🔍 Click instead of onChange/onInput of input box, because it won't have that much pressure of server
    if (e.target.value == '') return fetchSizes();
    axios.post(`${process.env.REACT_APP_API_URL}/api/admin-panel/size/search-sizes/${e.target.value}`)
      .then((response) => {
        setSize(response.data.data);
        if (response.data.data.length == 0) return setnoSearchFound(true);
        setnoSearchFound(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className="w-[90%] bg-white mx-auto border rounded-[10px] my-[150px]">
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
      <span className="flex justify-between border-b rounded-[10px_10px_0_0] bg-[#f8f8f9] text-[#303640] h-[50px] p-[8px_16px] text-[23px] font-bold">
        View Size
        <FaTrash className="cursor-pointer" size={25} onClick={() => setOpen(true)} />

        <Modal open={open} onClose={() => setOpen(false)} center>
          <div className="w-[90%] mx-auto">
            <table className="w-full my-[20px]">
              <thead>
                <tr className="text-left border-b">
                  <th>
                    <button onClick={handleMultiRecover} className="bg-red-400 rounded-sm px-2 mb-2 py-1">Recover</button><br />
                    <button onClick={handleMultiPermanentDlt} className="bg-red-400 rounded-sm px-2 py-1">Delete Permanent</button>
                    <input onChange={handleMasterCheckboxInBin} checked={isMasterSelectCheckedInBin} type="checkbox" name="deleteAll" className="m-[0_10px] accent-[#5351c9] cursor-pointer input"
                    />
                  </th>
                  <th>Sno</th>
                  <th>Size Name</th>
                  <th>Size Order</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  DeletedSizes.map((size, index) => (
                    <tr className="border-b">
                      <td>
                        <input value={size._id} checked={isChildSelectCheckedInBin[index]} onChange={(e) => handleChildCheckboxInBin(e, index)}
                          type="checkbox"
                          name="delete"
                          className="accent-[#5351c9] cursor-pointer input"
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{size.name}</td>
                      <td>{size.order}</td>
                      <td className="flex gap-[5px]">
                        <MdDelete onClick={() => handlePermanentDlt(size._id, size.name)} className="my-[5px] text-red-500 cursor-pointer" /> |{" "}
                        <BiRecycle onClick={() => handleRecover(size._id, size.name)} className="my-[5px] text-yellow-500 cursor-pointer" />
                      </td>

                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </Modal>
      </span>
      <div className="w-[90%] mx-auto">
        <table className="w-full my-[20px]">
          <thead>
            <tr className="text-left border-b">
              <th>
                <button onClick={handleMultiDlt} className="bg-red-400 rounded-sm px-2 py-1">Delete</button>
                <input onChange={handleMasterCheckbox} checked={isMasterSelectChecked} type="checkbox" name="deleteAll" className="m-[0_10px] accent-[#5351c9] cursor-pointer input"
                />
              </th>
              <th>Sno</th>
              <th>Size Name</th>
              <th>Size Order</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              Size.map((size, index) => (
                <tr className="border-b">
                  <td>
                    <input value={size._id} checked={isChildSelectChecked[index]} onChange={(e) => handleChildCheckbox(e, index)}
                      type="checkbox"
                      name="delete"
                      className="accent-[#5351c9] cursor-pointer input"
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{size.name}</td>
                  <td>{size.order}</td>
                  <td className="flex gap-[5px]">
                    <MdDelete onClick={() => handleDlt(size._id, size.name)} className="my-[5px] text-red-500 cursor-pointer" /> |{" "}
                    <Link to={`/dashboard/sizes/update-size/${size._id}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer" />
                    </Link>
                  </td>
                  <td>
                    <button onClick={updateStatus} value={size._id} data-tooltip-id="btn-tooltip" data-tooltip-content={!size.status ? "Click to Active" : " Click to Inactive"} className={`${size.status ? "bg-green-600" : "bg-red-600"} text-white font-light rounded-md my-1 p-1 w-[80px] h-[35px] cursor-pointer`}>
                      {size.status ? "Active" : "Inactive"}
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

export default ViewSizes;
