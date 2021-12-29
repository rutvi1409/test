import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [activedata, setactivedata] = useState([]);

  const [inputvalue, setinputvalue] = useState("")
  const [inputupdate, setinputupdate] = useState("")
  const [add, setadd] = useState(true) 
  const [update, setupdate] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])


  const fetchData = async () => {

    fetch('https://jsonplaceholder.typicode.com/posts') 
      .then((res) => res.json())
      .then((data) => setactivedata(data))
      .catch((err) => {
        console.log(err);
      })
  }




  const handleAdd = () => {
    setadd(add === true ? false : true)
    if (add) {

      if (inputvalue !== "") {
        setactivedata([...activedata, { title: inputvalue }])
        setinputvalue("")
        console.log(activedata)
      }
    }
  }
  const handleOnChange = (e) => {
    setinputvalue(e.target.value)
    console.log(inputvalue)
    // if (add/) {
    // // setactivedata((data) =>setactivedata([...activedata, { value: inputvalue }]),
    // )

    //
    // setactivedata([...activedata, { title: inputvalue }])

  }

  const handleDelete = async (id) => {
    setactivedata(activedata.filter((m) => m.id !== id));
    toast("Post Successfully Deleted!");
  }

  const handleUpdate = async (id) => {
    setupdate(update === true ? false : true)
    if (update) {
      if (inputupdate !== " ") {
        setactivedata([update])
        setinputvalue("")
        console.log("update")
      }
    }
  }

  return (
    <>
    <ToastContainer />
      <div className="container">
        <button className="btn btn-primary mt-2" onClick={handleAdd} >Add</button>
        {/* <div>{JSON.stringify(abc)}</div> */}
        {add && <input value={inputvalue} type="text" onChange={handleOnChange} />}
        <div className="top-title row mt-3">
          <div className="col-9 col-first ">
            <h3><b>Title</b></h3>
          </div>
          <div className="col-3 col-sec d-flex ">
            <h3><b>Update</b></h3>
            <h3 className="ml-4"><b>Delete</b></h3>
          </div>
        </div>


        {activedata.map((item, i) => {
          return (
            <div className="for-title row" key={i}>
              <div className="col-9 col-first">
                <div className="div-title">{item.title}</div>
              </div>
              <div className="col-3 col-sec">
                <button className="update-btn" onClick={() => handleUpdate(item.id)}>Update</button>
                {/* {update && <input type="text" value={inputupdate} onChange={handleOnChange} />} */}

                <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
}

export default App;
