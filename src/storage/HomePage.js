import React, { useState } from "react";
import { FcFile } from "react-icons/fc";

const HomePage = (props) => {

  const handClick1 = () => {
    // setFileValue([])
  }

  // console.log("fileValue", fileValue)
  return (
    <div>
      <hr />
      <h5>Choose Valid File</h5>
      <input name="fielee" type="file" onChange={(e) => { props.handleFileUpload(e) }} />
      <br />
      {/* <label><FcFile /></label><h6>{fileValue[0]?.name}</h6> */}
      <button onClick={handClick1}>Delete</button><hr />
      <div>
        <h5>Choose Complaint Type</h5>
        <div>
          <input type="radio" id="1" name="complaintType" value="Road-Repairing Department" onChange={(e) => { props.handChangeAddress(e) }} />
          <label htmlFor="1">Road-Repairing Department</label><br />
          <input type="radio" id="2" name="complaintType" value="Electricity Department" onChange={(e) => { props.handChangeAddress(e) }} />
          <label htmlFor="2">Electricity Department</label><br />
          <input type="radio" id="3" name="complaintType" value="Cleaning Department" onChange={(e) => { props.handChangeAddress(e) }} />
          <label htmlFor="3">Cleaning Department</label><br />
          <input type="radio" id="4" name="complaintType" value="Other" onChange={(e) => { props.handChangeAddress(e) }} />
          <label htmlFor="4">Other</label>
        </div>
        </div>
           Description :-
           <input type= "text" name= "description" onChange= {(e) => {props.handChangeAddress(e)}} />
        <div>
        <div>
          <h5>Enter Valid Address</h5>
          City :-
          <input type="text" name="city" onChange={(e) => { props.handChangeAddress(e)}} />
        </div><br />
        <div>
          District :-
          <input type="text" name="district" onChange={(e) => { props.handChangeAddress(e)}} />
        </div><br />
        <div>
          State :-
          <input type="text" name="state" onChange={(e) => { props.handChangeAddress(e)}} />
        </div><br />
        <div>
          Postal-Code :-
          <input type="number" name="postalCode" onChange={(e) => { props.handChangeAddress(e)}} />
        </div><br />
        <button onClick={props.handleComplaintSubmission}>Submit</button>
      </div>
    </div>
  )
}
export default HomePage;