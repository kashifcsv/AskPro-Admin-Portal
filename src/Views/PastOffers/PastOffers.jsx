import React from "react";
import Nav from "../../Components/Navigation/Navbar/Nav";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";
import Footer from "../../Components/Navigation/Footer/Footer";
import PastOffers from '../../Components/PastOffers/PastOffers'


function Main(props) {
    return (
        <div className="main_menu">
            <div className="row">
                <div className="col-12">
                    <Nav />
                </div>
            </div>
            <div className="row ">
                <div className="col-1 bg-dark">
                    <Sidebar />

                </div>
                {/* ROW 1 */}
                <div className="col-11">
                    <div className="">
                        <br></br>


                        <div className="row justify-content-center ">
                            <div className="col-10 ">

                                <PastOffers />
                            </div>

                        </div>
                        <div className="row justify-content-center ">
                            <div className="col-10 ">

                                <pre></pre>
                                <pre></pre>
                                <pre></pre>
                                <pre></pre>
                                <pre></pre>
                                <pre></pre>
                                <pre></pre>
                                <pre></pre>
                                <pre></pre>
                                <pre></pre>
                                <pre></pre>
                                <pre></pre>
                                <pre></pre>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <Footer />
                </div>
            </div>
        </div>
    );
}

Main.propTypes = {};

export default Main;
