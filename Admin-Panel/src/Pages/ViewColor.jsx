import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiRecycle } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "react-responsive-modal";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";

const ViewColor = () => {

  const [open, setOpen] = useState(false);

  const [Color, setColor] = useState([]);
  const [DeletedColors, setDeletedColors] = useState([]);

  const [isChildSelectChecked, setisChildSelectChecked] = useState([]);
  const [isMasterSelectChecked, setisMasterSelectChecked] = useState(false);
  const [checkedColorsIDs, setcheckedColorsIDs] = useState([]);

  const [isChildSelectCheckedInBin, setisChildSelectCheckedInBin] = useState([]);
  const [isMasterSelectCheckedInBin, setisMasterSelectCheckedInBin] = useState(false);
  const [checkedColorsIDsInBin, setcheckedColorsIDsInBin] = useState([]);

  const [noSearchFound, setnoSearchFound] = useState(false);


  const fetchColor = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/color/read-color`)
      .then((response) => {
        console.log(response.data);
        setColor(response.data.data);
        setcheckedColorsIDs([]);
        setcheckedColorsIDsInBin([]);
        setnoSearchFound(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const fetchDeletedColors = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/color/deleted-colors`)
      .then((response) => {
        console.log(response.data);
        setDeletedColors(response.data.data);
        setcheckedColorsIDs([]);
        setcheckedColorsIDsInBin([]);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const updateStatus = (e) => {
    const status = (e.target.textContent !== 'Active');
    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/color/update-status/${e.target.value}`, { status })
      .then((response) => {
        console.log(response.data);
        setColor((prev) => (
          prev.map((color) => {
            if (color._id == e.target.value) {
              return { ...color, status };
            }
            else {
              return color;
            }
          })
        ))
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchColor();
    fetchDeletedColors();
  }, [])

  useEffect(() => {
    setisChildSelectChecked(new Array(Color.length).fill(false));
    if (Color.length === 0) setisMasterSelectChecked(false);
  }, [Color])

  useEffect(() => {
    setisChildSelectCheckedInBin(new Array(DeletedColors.length).fill(false));
    if (DeletedColors.length === 0) setisMasterSelectCheckedInBin(false);
  }, [DeletedColors])

  const handleMasterCheckbox = (e) => {
    const newMasterCheckedState = !isMasterSelectChecked;
    setisMasterSelectChecked(newMasterCheckedState);

    if (e.target.checked) setcheckedColorsIDs(Color.map((color) => color._id));
    if (!e.target.checked) setcheckedColorsIDs([]);

    // Set all checkboxes to the same state as master checkbox
    setisChildSelectChecked(new Array(Color.length).fill(newMasterCheckedState));
  }

  const handleChildCheckbox = (e, index) => {

    if (e.target.checked) setcheckedColorsIDs(((prev) => [...prev, e.target.value]));
    if (!e.target.checked) {
      const temp_array = checkedColorsIDs;
      const index = temp_array.indexOf(e.target.value);
      if (index > -1) temp_array.splice(index, 1);
      setcheckedColorsIDs(temp_array);
    }

    const updatedCheckedStates = isChildSelectChecked.map((checked, i) => i === index ? !checked : checked);
    setisChildSelectChecked(updatedCheckedStates);
    // If all checkboxes are checked, set master checkbox to true, otherwise false
    const allChecked = updatedCheckedStates.every((checked) => checked === true);
    setisMasterSelectChecked(allChecked);
  }

  const handleDlt = (id, name) => {
    console.log(name);
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

        axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/color/delete-color/${id}`)
          .then((response) => {
            console.log(response.data);
            fetchColor();
            fetchDeletedColors();
            toast.success(`${name} Color Deleted Successfully`, {
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
    if (checkedColorsIDs.length > 0) {

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

          axios.put('${process.env.REACT_APP_API_URL}/api/admin-panel/color/delete-colors', { checkedColorsIDs })
            .then((response) => {
              console.log(response.data);
              fetchColor();
              fetchDeletedColors();
              toast.success(`${checkedColorsIDs.length} Color/s Deleted Successfully`, {
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
    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/color/recover-color/${id}`)
      .then((response) => {
        console.log(response.data.data);
        fetchColor();
        fetchDeletedColors();
        toast.success(`${name} Color Recovered Successfully`, {
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
      text: "Deleting this Color will permanently remove it.!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axios.delete(`${process.env.REACT_APP_API_URL}/api/admin-panel/color/permanent-delete-color/${id}`)
          .then((response) => {
            console.log(response.data.data);
            fetchColor();
            fetchDeletedColors();
            toast.success(`${name} Color Deleted Permanently`, {
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
          text: "Color deleted successfully",
          icon: "success"
        });
      }
    });


  }



  const handleMasterCheckboxInBin = (e) => {
    const newMasterCheckedState = !isMasterSelectCheckedInBin;
    setisMasterSelectCheckedInBin(newMasterCheckedState);

    if (e.target.checked) setcheckedColorsIDsInBin(DeletedColors.map((size) => size._id));
    if (!e.target.checked) setcheckedColorsIDsInBin([]);

    // Set all checkboxes to the same state as master checkbox
    setisChildSelectCheckedInBin(new Array(DeletedColors.length).fill(newMasterCheckedState));
  }

  const handleChildCheckboxInBin = (e, index) => {

    if (e.target.checked) setcheckedColorsIDsInBin(((prev) => [...prev, e.target.value]));
    if (!e.target.checked) {
      const temp_array = checkedColorsIDsInBin;
      const index = temp_array.indexOf(e.target.value);
      if (index > -1) temp_array.splice(index, 1);
      setcheckedColorsIDsInBin(temp_array);
    }

    const updatedCheckedStates = isChildSelectCheckedInBin.map((checked, i) => i === index ? !checked : checked);
    setisChildSelectCheckedInBin(updatedCheckedStates);
    // If all checkboxes are checked, set master checkbox to true, otherwise false
    const allChecked = updatedCheckedStates.every((checked) => checked === true);
    setisMasterSelectCheckedInBin(allChecked);
  }

  const handleMultiRecover = () => {
    if (checkedColorsIDsInBin.length > 0) {
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

          axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/color/recover-colors`, { checkedColorsIDsInBin })
            .then((response) => {
              console.log(response.data);
              fetchColor();
              fetchDeletedColors();
              toast.success(`All ${checkedColorsIDsInBin.length} Colors Recovered Successfully`, {
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
    if (checkedColorsIDsInBin.length > 0) {
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


          axios.delete(`${process.env.REACT_APP_API_URL}/api/admin-panel/color/permanent-delete-colors`, { data: { checkedColorsIDsInBin } })
            .then((response) => {
              console.log(response.data);
              fetchColor();
              fetchDeletedColors();
              toast.success(`All ${checkedColorsIDsInBin.length} Colors Deleted Permanently`, {
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
    if (e.target.value == '') return fetchColor();
    axios.post(`${process.env.REACT_APP_API_URL}/api/admin-panel/color/search-colors/${e.target.value}`)
      .then((response) => {
        setColor(response.data.data);
        if (response.data.data.length == 0) return setnoSearchFound(true);
        setnoSearchFound(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  return (
    <div className="w-[90%] bg-white rounded-[10px] border mx-auto my-[150px]">
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
      <span className="flex justify-between h-[40px] border-b rounded-[10px_10px_0_0] bg-[#f8f8f9] text-[#303640] p-[8px_16px] text-[20px]">
        View Color
        <FaTrash className="cursor-pointer" size={25} onClick={() => setOpen(true)} />

        <Modal open={open} onClose={() => setOpen(false)} center>
          <div className="w-[90%] mx-auto my-[20px]">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th>
                    <button onClick={handleMultiRecover} className="bg-red-400 rounded-sm px-2 mb-2 py-1">Recover</button><br />
                    <button onClick={handleMultiPermanentDlt} className="bg-red-400 rounded-sm px-2 py-1">Delete Permanent</button>
                    <input onChange={handleMasterCheckboxInBin} checked={isMasterSelectCheckedInBin} type="checkbox" name="deleteAll" className="m-[0_10px] accent-[#5351c9] cursor-pointer input"
                    />
                  </th>
                  <th className="p-2">Sno.</th>
                  <th className="p-2">Color Name</th>
                  <th className="p-2">Color</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  DeletedColors.map((color, index) => (
                    <tr className="border-b">
                      <td>
                        <input value={color._id} checked={isChildSelectCheckedInBin[index]} onChange={(e) => handleChildCheckboxInBin(e, index)}
                          type="checkbox"
                          name="delete"
                          className="accent-[#5351c9] cursor-pointer input"
                        />
                      </td>
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{color.name}</td>
                      <td className="p-2">
                        <div style={{ backgroundColor: color.code }}
                          className={`w-[90%] mx-auto h-[20px] border`}></div>
                      </td>
                      <td className="p-2">
                        <MdDelete onClick={(e) => handlePermanentDlt(color._id, color.name)} className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                        |{" "}
                        <BiRecycle onClick={() => handleRecover(color._id, color.name)} className="my-[5px] text-yellow-500 cursor-pointer inline" />
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
            <tr className="border-b text-left">
              <th className="flex p-2">
                <button onClick={handleMultiDlt} className="bg-[#5351c9] font-light text-white rounded-md p-1 w-[80px] h-[35px] my-[10px] mr-[10px]">
                  Delete
                </button>
                <input onChange={handleMasterCheckbox} checked={isMasterSelectChecked}
                  type="checkbox"
                  name="deleteAll"
                  className="cursor-pointer accent-[#5351c9] input"
                />
              </th>
              <th className="p-2">Sno.</th>
              <th className="p-2">Color Name</th>
              <th className="p-2">Color</th>
              <th className="p-2">Action</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              Color.map((color, index) => (
                <tr className="border-b">
                  <td className="p-2">
                    <input value={color._id} checked={isChildSelectChecked[index]} onChange={(e) => handleChildCheckbox(e, index)}
                      type="checkbox"
                      name="delete"
                      className="cursor-pointer accent-[#5351c9] input"
                    />
                  </td>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{color.name}</td>
                  <td className="p-2">
                    <div style={{ backgroundColor: color.code }}
                      className={`w-[90%] mx-auto h-[20px] border`}></div>
                  </td>
                  <td className="p-2">
                    <MdDelete onClick={(e) => handleDlt(color._id, color.name)} className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                    |{" "}
                    <Link to={`/dashboard/color/update-colors/${color._id}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td className="p-2">
                    <button onClick={updateStatus} value={color._id} data-tooltip-id="btn-tooltip" data-tooltip-content={!color.status ? "Click to Active" : " Click to Inactive"} className={`${color.status ? "bg-green-600" : "bg-red-600"} text-white font-light rounded-md my-1 p-1 w-[80px] h-[35px] cursor-pointer`}>
                      {color.status ? "Active" : "Inactive"}
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

export default ViewColor;
