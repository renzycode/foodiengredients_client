import React from "react";

const LoadingCard = () => (
    <div className="col-12">
        <div className="card mx-4 my-4 my-card">
            <div className="placeholder-glow mb-0">
                <div className="card-text placeholder col-12 mb-0 rounded-top" style={{ height: 300}}></div>
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-between placeholder-glow">
                    <h5 className="card-title my-title placeholder rounded col-6"></h5>
                    <p className="card-text placeholder rounded col-1" style={{ height: 5}}></p>
                </div>
                <div className="placeholder-glow my-2">
                    <p className="card-text placeholder rounded col-8"></p></div>
                <div className="placeholder-glow my-2">
                    <p className="card-text placeholder rounded col-10 me-1 mb-0"></p>
                    <p className="card-text placeholder rounded col-9 me-1 mb-0"></p>
                    <p className="card-text placeholder rounded col-8 me-1 mb-0"></p>
                </div>
                <div className="placeholder-glow my-2">
                    <p className="card-text placeholder rounded col-3 me-1 mb-0"></p>
                    <p className="card-text placeholder rounded col-5 me-1 mb-0"></p>
                </div>
                <div className="d-flex justify-content-end placeholder-glow">
                    <div className="card-text placeholder col-1 mb-0 rounded" style={{ height: 30}}></div>
                </div>
            </div>
        </div>
        <div className="card mx-4 my-4 my-card">
            <div className="placeholder-glow m-1 mb-0 mx-3">
                <div className="card-text placeholder col-12 mb-0" style={{ height: 300}}></div>
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-between placeholder-glow">
                    <h5 className="card-title my-title placeholder rounded col-6"></h5>
                    <p className="card-text placeholder rounded col-1" style={{ height: 5}}></p>
                </div>
                <div className="placeholder-glow my-2">
                    <p className="card-text placeholder rounded col-8"></p></div>
                <div className="placeholder-glow my-2">
                    <p className="card-text placeholder rounded col-10 me-1 mb-0"></p>
                    <p className="card-text placeholder rounded col-9 me-1 mb-0"></p>
                    <p className="card-text placeholder rounded col-8 me-1 mb-0"></p>
                </div>
                <div className="placeholder-glow my-2">
                    <p className="card-text placeholder rounded col-3 me-1 mb-0"></p>
                    <p className="card-text placeholder rounded col-5 me-1 mb-0"></p>
                </div>
                <div className="d-flex justify-content-end placeholder-glow">
                    <div className="card-text placeholder col-1 mb-0 rounded" style={{ height: 30}}></div>
                </div>
            </div>
        </div>
    </div>
    
);

export default LoadingCard;
