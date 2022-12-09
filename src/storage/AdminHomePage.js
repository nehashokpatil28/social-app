 
 const AdminHomePage = () => {
    return(
        <div>
            <table>
                <tr>
                    <th>ComplaintID</th>
                    <th>Complaint Description</th>
                    <th>Complaint Type</th>
                    <th>Status</th>
                    <th>Data</th>
                </tr>
                <tr>
                    <td>11111</td>
                    <td>This is a Series Problelm</td>
                    <td>Electricity</td>
                    <td>
                        <select name= "status" id= "status">
                            <option value= "inprogress">Inprogress</option>
                            <option value= "completed">Completed</option>
                            <option value= "rejected">Rejected</option>
                        </select>
                    </td>
                    <td>26/11/2011</td>
                </tr>
            </table>
        </div>
    )
 }

 export default AdminHomePage;