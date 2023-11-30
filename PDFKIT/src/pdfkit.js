import PDFDocument from "pdfkit-table";

export function buildPDF(dataCallback, endCallback) {
  const doc = new PDFDocument();

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  //EXAMPLE OF TABLE
  const table = {
    headers: [
      { label: "Name", property: "name", width: 60, renderer: null },
      {
        label: "Description",
        property: "description",
        width: 150,
        renderer: null,
      },
      { label: "Price 1", property: "price1", width: 100, renderer: null },
      { label: "Price 2", property: "price2", width: 100, renderer: null },
      { label: "Price 3", property: "price3", width: 80, renderer: null },
      {
        label: "Price 4",
        property: "price4",
        width: 63,
        renderer: (value, indexColumn, indexRow, row) => {
          return `U$ ${Number(value).toFixed(2)}`;
        },
      },
    ],
    datas: [
      {
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis ante in laoreet egestas. ",
        price1: "$1",
        price3: "$ 3",
        price2: "$2",
        price4: "4",
        name: "Name 1",
      },
      {
        name: "bold:Name 2",
        description: "bold:Lorem ipsum dolor.",
        price1: "bold:$1",
        price3: "$3",
        price2: "$2",
        price4: "4",
        options: { fontSize: 10, separation: true },
      },
      {
        name: "Name 3",
        description: "Lorem ipsum dolor.",
        price1: "bold:$1",
        price4: "4.111111",
        price2: "$2",
        price3: { label: "PRICE $3", options: { fontSize: 12 } },
      },
    ],
    rows: [
      [
        "Apple",
        "Nullam ut facilisis mi. Nunc dignissim ex ac vulputate facilisis.",
        "$ 105,99",
        "$ 105,99",
        "$ 105,99",
        "105.99",
      ],
      [
        "Tire",
        "Donec ac tincidunt nisi, sit amet tincidunt mauris. Fusce venenatis tristique quam, nec rhoncus eros volutpat nec. Donec fringilla ut lorem vitae maximus. Morbi ex erat, luctus eu nulla sit amet, facilisis porttitor mi.",
        "$ 105,99",
        "$ 105,99",
        "$ 105,99",
        "105.99",
      ],
    ],
  };

  doc.table(table, {
    prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
    prepareRow: (row, indexColumn, indexRow, rectRow) =>
      doc.font("Helvetica").fontSize(8),
  });

  doc.end();
}
