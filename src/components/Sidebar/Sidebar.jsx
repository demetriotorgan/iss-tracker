import React, { useState } from 'react';
import { LayoutDashboard, Radio, Calendar, BarChart2, Globe, Bell, Settings, Info } from 'lucide-react';
import './Sidebar.css';

const menuItems = [
  { id: 'dashboard', title: 'VISÃO GERAL', subtitle: 'DASHBOARD', icon: LayoutDashboard },
  { id: 'tracking', title: 'RASTREAMENTO', subtitle: 'TEMPO REAL', icon: Radio },
  { id: 'passes', title: 'PASSAGENS', subtitle: 'SOBRE SUA ÁREA', icon: Calendar },
  { id: 'analytics', title: 'ANÁLISES', subtitle: 'GRÁFICOS E DADOS', icon: BarChart2 },
  { id: '3d-orbit', title: 'ÓRBITA 3D', subtitle: 'SIMULAÇÃO', icon: Globe },
  { id: 'alerts', title: 'ALERTAS', subtitle: 'NOTIFICAÇÕES', icon: Bell },
  { id: 'settings', title: 'CONFIGURAÇÕES', subtitle: 'AJUSTES', icon: Settings },
  { id: 'about', title: 'SOBRE', subtitle: 'INFORMAÇÕES', icon: Info },
];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  return (
    <nav className="sidebar">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.id;
        
        return (
          <div 
            key={item.id} 
            className={`menu-item ${isActive ? 'active' : ''}`}
            onClick={() => setActiveItem(item.id)}
          >
            <Icon size={24} />
            <div className="menu-text">
              <span className="menu-title">{item.title}</span>
              <span className="menu-subtitle">{item.subtitle}</span>
            </div>
          </div>
        );
      })}
    </nav>    
  );
};

export default Sidebar