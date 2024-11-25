import React from "react";
import "./AEnrolleesTable.css";

const AEnrolleesTable = () => {
  return (
    <div className="enrollees-container">
      <h1 className="enrollees-title">New Enrollees</h1>
      <table className="enrollees-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Age</th>
            <th>Address</th>
            <th>Contact No.</th>
            <th>Status</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {/* Example Rows */}
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>Male</td>
            <td>20</td>
            <td>123 Sample St.</td>
            <td>09123456789</td>
            <td>Enrolled</td>
            <td>BSIT</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jane Smith</td>
            <td>Female</td>
            <td>21</td>
            <td>456 Elm St.</td>
            <td>09234567890</td>
            <td>Enrolled</td>
            <td>BSCS</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Michael Brown</td>
            <td>Male</td>
            <td>19</td>
            <td>789 Maple Ave.</td>
            <td>09345678901</td>
            <td>Pending</td>
            <td>BSBA</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Emily Johnson</td>
            <td>Female</td>
            <td>22</td>
            <td>101 Pine St.</td>
            <td>09456789012</td>
            <td>Enrolled</td>
            <td>BSIT</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Chris Lee</td>
            <td>Male</td>
            <td>20</td>
            <td>202 Oak Rd.</td>
            <td>09567890123</td>
            <td>Enrolled</td>
            <td>BSEd</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Anna Davis</td>
            <td>Female</td>
            <td>21</td>
            <td>303 Birch Ln.</td>
            <td>09678901234</td>
            <td>Pending</td>
            <td>BSN</td>
          </tr>
          <tr>
            <td>7</td>
            <td>James Wilson</td>
            <td>Male</td>
            <td>23</td>
            <td>404 Cedar Ave.</td>
            <td>09789012345</td>
            <td>Enrolled</td>
            <td>BSCS</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Olivia Martinez</td>
            <td>Female</td>
            <td>19</td>
            <td>505 Spruce Blvd.</td>
            <td>09890123456</td>
            <td>Enrolled</td>
            <td>BSIT</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Daniel Garcia</td>
            <td>Male</td>
            <td>20</td>
            <td>606 Willow St.</td>
            <td>09901234567</td>
            <td>Enrolled</td>
            <td>BSBA</td>
          </tr>
          <tr>
            <td>10</td>
            <td>Sophia Robinson</td>
            <td>Female</td>
            <td>18</td>
            <td>707 Aspen Rd.</td>
            <td>09111234567</td>
            <td>Pending</td>
            <td>BSA</td>
          </tr>
        </tbody>
      </table>
      {/* Box below the table */}
      <div className="enrollees-table-box">
        {/* Add content to the box here */}
        <p>Note: This section can contain controls or additional information.</p>
      </div>
    </div>
  );
};

export default AEnrolleesTable;
