import React from "react";
import "./PastOffers.css";
import Table from "react-bootstrap/Table";

export default function IncomingInquiries() {
    return (


        <div className="card ">
            <div className="row ">
                <div className="col-6 mt-3 ">
                    <h6 class="card-title incomingBar1 "><h2>Past Offers</h2> </h6>
                </div>
                <div className="col-6 mt-3 ">
                    <div class="dropdown incomingBar1float-end mt-3 d-flex justify-content-end">
                        <button class="btn btn-secondary dropdown-toggle " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown button
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                        <pre>  </pre>
                    </div>
                </div>
            </div>
            <div class="card-body text-center">
                {/* Table start */}

                <Table >
                    <thead>
                        <tr className="incomingBar2">
                            <th>Date</th>
                            <th>Area</th>
                            <th>Similiar Items</th>
                            <th>Differnt Items</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Job Title one</td>
                            <td>Kashif</td>
                            <td>Testing address somewhere at rwp</td>
                            <td className="Action" >Quote</td>
                            <td>Kashif</td>
                        </tr>
                        <tr>
                            <td>Job Title one</td>
                            <td>Kashif</td>
                            <td>Testing address somewhere at rwp</td>
                            <td className="Action" >Quote</td>
                            <td>Kashif</td>
                        </tr>
                        <tr>
                            <td>Job Title one</td>
                            <td>Kashif</td>
                            <td>Testing address somewhere at rwp</td>
                            <td className="Action" >Quote</td>
                            <td>Kashif</td>
                        </tr>
                        <tr>
                            <td>Job Title one</td>
                            <td>Kashif</td>
                            <td>Testing address somewhere at rwp</td>
                            <td className="Action" >Quote</td>
                            <td>Kashif</td>
                        </tr>
                        <tr>
                            <td>Job Title one</td>
                            <td>Kashif</td>
                            <td>Testing address somewhere at rwp</td>
                            <td className="Action" >Quote</td>
                            <td>Kashif</td>
                        </tr>
                    </tbody>
                </Table>

                {/* Table end */}
            </div>
        </div>

    );
}
