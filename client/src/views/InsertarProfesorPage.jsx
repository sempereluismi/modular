import { useState } from "react";

export function InsertarProfesorPage() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <>
      <h1>Insertar Profesor</h1>
      <div>
        <input type="file" onChange={handleFileChange} accept="text/csv" />
        {selectedFile && (
          <div>
            <p>Nombre del archivo: {selectedFile.name}</p>
            <p>Tamaño del archivo: {selectedFile.size} bytes</p>
            <p>Tipo del archivo: {selectedFile.type}</p>
            <p>Última modificación: {selectedFile.lastModifiedDate.toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </>
  );
}
