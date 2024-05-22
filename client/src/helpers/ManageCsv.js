// export function jsonToCsv(json) {
//   const replacer = (key, value) => (value === null ? "" : value);
//   const header = Object.keys(json[0]);
//   const csv = json.map((row) =>
//     header
//       .map((fieldName) => JSON.stringify(row[fieldName], replacer))
//       .join(",")
//   );
//   csv.unshift(header.join(","));
//   return csv.join("\r\n");
// }




//¡¡¡¡npm install csv-writer Necesario!!!!

function jsonToCsv(jsonData, csvFilePath) { //Le pasas el json y la ruta en la que quieras que lo imprima
    const createCsvWriter = require('csv-writer').createObjectCsvWriter; //Con esto importamos el módulo, mejor tenerlo fuera de la función, aunque si lo vamos a llamar desde otra 
    const headers = Object.keys(jsonData[0]);

    const csvWriter = createCsvWriter({
        path: csvFilePath,
        header: headers.map(header => ({ id: header, title: header }))
    });

    // Escribir los datos del JSON en el archivo CSV
    csvWriter.writeRecords(jsonData)
        .then(() => console.log('El archivo CSV ha sido creado exitosamente.'))
        .catch(err => console.error('Error al escribir el archivo CSV:', err));
}


//Ejemplo de json que lo pillo del trabajo XD
const json = [
    {
        "files": "ind_Stahl_Bestellung.json",
        "id_pedido": 13593,
        "type_doc": "HYBRID",
        "client": "EINKAUFSBÜRO DEUTSCHER EISENHÄNDLER GMBH",
        "date_equal": "None",
        "date_case": "Aparece/No sacamos",
        "n_oferta_equal": true,
        "oferta_case": "True",
        "reference_equal": true,
        "reference_case": "True",
        "incoterm_bool": true,
        "incoterm_case": "True",
        "Comentarios": null
    },
    {
        "files": "2024_04_23_17_29_34.252623_emailbody.json",
        "id_pedido": 13629,
        "type_doc": "EMAIL",
        "client": "FERGALSAN, S.L.",
        "date_equal": "None",
        "date_case": "No aparece/No sacamos",
        "n_oferta_equal": true,
        "oferta_case": "True",
        "reference_equal": true,
        "reference_case": "True",
        "incoterm_bool": true,
        "incoterm_case": "True",
        "Comentarios": null
    },
    {
        "files": "ind_PEDIDO_ARMADURAS_VILADECANS_MALLA_23-04-24.json",
        "id_pedido": 13627,
        "type_doc": "HYBRID",
        "client": "ARMADURAS DE ACERO FERRALIA, S.L.",
        "date_equal": "True",
        "date_case": "True",
        "n_oferta_equal": true,
        "oferta_case": "True",
        "reference_equal": false,
        "reference_case": "Mal validado - Es correcto",
        "incoterm_bool": true,
        "incoterm_case": "True",
        "Comentarios": "No tiene en cuenta los \\t"
    }
];

jsonToCsv(json, 'datos.csv');





//Esta función lee un archivo CSV y lo convierte a JSON
//Te la dejo por si le quieres echar un vistazo, pero lo que importa es la de abajo
export function CsvToJsonFile(csv) { //El parametro que se le tiene que pasar es la ruta del csv el. /home/Escritorio/LuimiMola/archivo.csv
  const fs = require("fs");
  const csv = require("csv-parser"); //npm install csv-parser  (Hay que instalarlo)
  const datosCSV = [];

  // Función para leer el archivo CSV
  fs.createReadStream(csv) //Ruta del archivo CSV (y hay que ponerle el nombre tbm)
    .pipe(csv())
    .on("data", (row) => {
      datosCSV.push(row);
    })
    .on("end", () => {
      const datosJSON = JSON.stringify(datosCSV);
      fs.writeFileSync("datos.json", datosJSON); //Se crea el archivo donde queramos, yo lo metí aquí
      //console.log("Archivo CSV convertido a JSON exitosamente.");
    });
}



//Esta es la que te retorna un json
//La forma en la que se llama a la función me la pasó mi gran amigo GPT
//Si ves que la quieres de otra manera me avisas y modifico
function CsvToJson(csvContent) {
    const csvParser = require("csv-parser");
    const { Readable } = require("stream");
    return new Promise((resolve, reject) => {
        const datosCSV = [];
        const readableStream = Readable.from(csvContent);

        readableStream
            .pipe(csvParser())
            .on("data", (row) => {
                datosCSV.push(row);
            })
            .on("end", () => {
                resolve(datosCSV);
            })
            .on("error", (err) => {
                reject(err);
            });
    });
}

const csvContent = `name,age,city
John,30
Jane,25,Los Angeles`;

CsvToJson(csvContent)
    .then((jsonData) => {
        console.log("Datos JSON:", jsonData);
    })
    .catch((err) => {
        console.error("Error al convertir CSV a JSON:", err);
    });
