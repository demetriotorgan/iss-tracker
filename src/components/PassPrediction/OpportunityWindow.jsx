import React from 'react'
import './OpportunityWindow.css'

const OpportunityWindow = ({ distance, isVisible, visibilityStatus }) => {    
    const STATUS_LABELS = {
        IN_RANGE: 'IN RANGE',
        OUT_OF_RANGE: 'OUT OF RANGE'
    };
    return (
        <div className="opportunity-container">
            <div className="opportunity-header">JANELA DE OPORTUNIDADE</div>

            <div className="data-row">
                <span className="label">Status de Cobertura:</span>
                <span className={`status-pill ${distance < 2000 ? 'status-active' : 'status-inactive'}`}>
                    {distance < 2000 ? 'IN RANGE' : 'OUT OF RANGE'}
                </span>
            </div>

            <div className="data-row">
                <span className="label">Condição Visual:</span>
                <span className={`status-pill ${isVisible ? 'status-active' : 'status-alert'}`}>
                    {isVisible
                        ? 'VISÍVEL (ÓTIMA)'
                        : (visibilityStatus === 'eclipsed' ? 'OCULTA (ECLIPSE)' : 'FORA DE ALCANCE')}
                </span>
            </div>
        </div>
    );
};

export default OpportunityWindow