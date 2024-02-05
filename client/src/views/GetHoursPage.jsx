export function GetHoursPage() {
  return (
    <div id="gethours">
      <div className="menu-navbar">
        <ul>
          <li>Mi cuenta</li>
          <li>Tabla Horas</li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="teachers-menu">
        <ul>
          {/* // Por cada profesor se añadira un li */}
          <li>Patricia</li>
        </ul>
      </div>
      <div className="container-card">
        {/* // Se creará tantas cartas como asignaturas */}
        <div className="card">DAW 5 Horas</div>
      </div>
    </div>
  );
}
