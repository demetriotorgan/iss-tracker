import './Dashboard.css'
import React from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import MapPanel from '../../components/Map/MapPanel'
import TelemetryPanel from '../../components/TelemetryPanel/TelemetryPanel'
import PassPrediction from '../../components/PassPrediction/PassPrediction'
import PeopleInSpace from '../../components/PeopleInSpace/PeopleInSpace'
import Analytics from '../../components/Analytics/Analytics'
import MissionSummary from '../../components/MissionSummary/MissionSummary'
import Footer from '../../components/Footer/Footer'

const Dashboard = () => {
    return (
        <>
            <div className="dashboard">
                <Header />
                
                <div className="dashboard-sidebar">
                    <Sidebar />
                </div>

                <div className="dashboard-map">
                    <MapPanel />
                </div>

                <div className="dashboard-telemetry">
                    <TelemetryPanel />
                </div>

                <div className="dashboard-pass">
                    <PassPrediction />
                </div>

                <div className="dashboard-people">
                    <PeopleInSpace />
                </div>

                <div className="dashboard-analytics">
                    <Analytics />
                </div>

                <div className="dashboard-summary">
                    <MissionSummary />
                </div>

                <div className="dashboard-footer">
                    <Footer />
                </div>

            </div>
        </>
    )
}

export default Dashboard