// Minutas 1.0

const ACTIVE_DOC = DocumentApp.getActiveDocument();
const BODY = ACTIVE_DOC.getBody();
const TABLES = BODY.getTables();

const FOLDER_MINUTAS = '<id de la carpeta>';
const FILE_DATABASE = ''

const TABLES_DATA = {
  participantes: [],
  acuerdos: []
}

function onOpen() {
  DocumentApp.getUi()
    .createMenu('Minutas')
    .addItem('Limpiar', 'restart')
    .addItem('Guardar minuta', 'minuta')
    .addItem('Agregar grabación', 'setStreamLink')
    // .addItem('Prueba', 'updateDatabase')
    .addToUi();

}

function restart() {
  TABLES.forEach((tb, i) => {
    const title = tb.getCell(0,0).getText();

    switch(title) {
      case 'Cargos de Roles':
        clean(tb.getRow(1), 3, tb.getNumRows());
        break;
      case 'Contenido (Temas)':
        clean(tb.getRow(1), 3, tb.getNumRows());
        break;
      case 'Participantes':
        clean(tb.getRow(0), 3, tb.getNumRows());
        break;
      case 'Introducción':
        console.log(tb.getCell(2, 2).clear())
        break;
      case 'Comienzo':
        console.log(tb.getCell(4, 0).getLinkUrl())
        tb.getCell(4, 0).setLinkUrl('')
        break;
      case 'NOTAS DE LOS PARTICIPANTES (“Personales”)':
        tb.getRow(1).editAsText().replaceText("\.+", "*nombre*")
        clean(tb.getRow(1), 3, tb.getNumRows());
        break;
    }
  });
}

function clean(tb, start, end) {
  console.log(start, end)
  let row = tb.getNextSibling().asTableRow();

  console.log(row.getText())
  row.editAsText().replaceText('.+','');
  if(start < end) {
    start += 1;
    clean(row, start, end);
  }
}

function log(tb, start, end) {
  let row = tb.getNextSibling();
  if(row) {
    row = row.asTableRow();
    if(!row.getText()) row.removeFromParent()
    console.log(row.getText(), start, end)
  }

  start += 1;
  log(row, start, end)
}



function minuta() {
  const ui = DocumentApp.getUi();
  const response = ui.prompt('Fecha de la minuta:', 'Escribe la fecha de la minuta.', ui.ButtonSet.OK_CANCEL);

  // Process the user's response.
  if (response.getSelectedButton() == ui.Button.OK) {
    Logger.log('The user\'s name is %s.', response.getResponseText());

    try {
      let timestamp = response.getResponseText();
      let username = Session.getActiveUser().getEmail();

      const folder = DriveApp.getFolderById(FOLDER_MINUTAS);
      DriveApp.getFileById(DocumentApp.getActiveDocument().getId()).makeCopy('minuta ' + timestamp + ".doc", folder)

      const pdfblob = DocumentApp.getActiveDocument().getAs('application/pdf');

      /* Add the PDF extension */
      pdfblob.setName('minuta ' + timestamp + ".pdf");

      const pdf = folder.createFile(pdfblob);

      pdf.setDescription("Uploaded by " + username);

      return "Thank you, your file was uploaded successfully!";
    } catch (error) {
      console.error(error);
    }
  } else {
    Logger.log('The user clicked the close button in the dialog\'s title bar.');
  }
}

function setStreamLink() {
  const ui = DocumentApp.getUi();
  const response = ui.prompt('Enlace a la transmisión guardada', 'Añade una url.', ui.ButtonSet.OK_CANCEL);

  // Process the user's response.
  if (response.getSelectedButton() == ui.Button.OK) {
    TABLES.forEach((tb, i) => {
      const title = tb.getCell(0,0).getText();

      switch(title) {
        case 'Comienzo':
          console.log(tb.getCell(4, 0).getLinkUrl())
          tb.getCell(4, 0).setLinkUrl(response.getResponseText())
          break;
      }
    })
  }
}

function updateDatabase() {
  const information = [];

  TABLES.forEach((tb, i) => {
    const title = tb.getCell(0,0).getText();

    switch(title) {
      case 'Cargos de Roles':
        information[6] = tb.getCell(2, 0).getText();
        information[7] = tb.getCell(2, 1).getText();
        information[8] = tb.getCell(2, 2).getText();
        information[9] = tb.getCell(2, 3).getText();
        break;
      case 'Contenido (Temas)':
        checkAcuerdos(tb.getRow(1), 3, tb.getNumRows());
        break;
      case 'Participantes':
        checkParticipantes(tb.getRow(0), 3, tb.getNumRows());
        break;
      case 'Comienzo':
        information[5] = tb.getCell(4, 0).getLinkUrl();
        break;
    }
  });

  console.log(TABLES_DATA);
}

function checkAcuerdos(tb, start, end) {
  let row = tb.getNextSibling().asTableRow();

  console.log(row.getCell(0).getText().length)

  if(row.getCell(0).getText().length > 5) {
    TABLES_DATA['acuerdos'].push([row.getCell(0).getText(),row.getCell(1).getText(),row.getCell(2).getText(),row.getCell(3).getText(),row.getCell(4).getText(),row.getCell(5).getText()])
  }

  if(start < end) {
    start += 1;
    checkAcuerdos(row, start, end);
  }
}

function checkParticipantes(tb, start, end) {
  let row = tb.getNextSibling().asTableRow();

  if(row.getCell(0).getText().length > 5) {
    TABLES_DATA['participantes'].push([row.getCell(0).getText(),row.getCell(1).getText(),row.getCell(2).getText()])
  }

  if(start < end) {
    start += 1;
    checkParticipantes(row, start, end);
  }
}
