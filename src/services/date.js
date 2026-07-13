export function timeString(date) {
    // Formatação dinâmica
    return date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
    });
}

export function formatarData(date) {    
    // Extrai o dia, mês e ano local
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('pt-BR', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`
}

