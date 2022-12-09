import axios from "axios"
import { useEffect, useState } from "react"
import "./ComplaintTracker.css"
const ComplaintTracker = (props) => {

    const [complaintResult, setComplaintResult] = useState([]);

      useEffect(() =>{
        axios.get("/getComaplints").then((response) => {
            setComplaintResult(response?.data?.result)
            
        })
      },[])
    // console.log("tabelData", props?.rows);
    return (
        <div>
            <div>
                <input type="search" name="search" onChange={(e) => { props.handlecomplaintIDsearchBy(e) }} />
                <button onClick={props.getComplaintDetails}>Search</button>
            </div>
            <div className="ComplaintTracker">
                <table>
                    <tr>
                        <th>ComplaintID</th>
                        <th>ComplaintDescription</th>
                        <th>ComplaintType</th>
                        <th>ComplaintStatus</th>
                        <th>Date</th>
                        <th>City</th>
                        <th>District</th>
                        <th>PostalCode</th>
                        <th>State</th>
                    </tr>
                    {
                         complaintResult.map(item => {
                            console.log(item)
                            return (<tr>
                                <td>{item.complaintId}</td>
                                <td>{item.description}</td>
                                <td>{item.complaintType}</td>
                                <td>{item.username}</td>
                                <td>{item.phone}</td>
                                <td>{item.city}</td>
                                <td>{item.district}</td>
                                <td>{item.postalCode}</td>
                                <td>{item.state}</td>
                            </tr>)
                        })
                    }
                </table>
            </div>

        </div>
    )
}
export default ComplaintTracker;