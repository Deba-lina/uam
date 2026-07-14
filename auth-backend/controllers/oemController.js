import ExcelJS from "exceljs";
import Oem from "../models/Oem.js";
import fs from "fs";

export const uploadExcel = async (
  req,
  res
) => {

  try {

    const workbook =
      new ExcelJS.Workbook();

    await workbook.xlsx.readFile(
      req.file.path
    );

    const worksheet =
      workbook.getWorksheet(1);

    const rows = [];

    worksheet.eachRow(
      (row, rowNumber) => {

        if (rowNumber === 1) {
          return;
        }

        rows.push({

          oemName:
            row.getCell(2).value,

          make:
            row.getCell(3).value,

          capacity:
            row.getCell(4).value,

          installationDate:
            row.getCell(5).value,

          site:
            row.getCell(6).value,

          state:
            row.getCell(7).value

        });

      }
    );

    const operations =
      rows.map(row => ({

        updateOne: {

          filter: {
            oemName: row.oemName,
            site: row.site
          },

          update: {
            $set: row
          },

          upsert: true

        }

      }));

    const result =
      await Oem.bulkWrite(
        operations
      );

    res.status(200).json({

      totalRecords:
        rows.length,

      inserted:
        result.upsertedCount,

      updated:
        result.modifiedCount,

      message:
        "File processed successfully"

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      message:
        "File upload failed"

    });

  } finally {

    if (
      req.file &&
      req.file.path
    ) {

      fs.unlink(
        req.file.path,
        (err) => {

          if (err) {

            console.error(
              "Error deleting file:",
              err
            );

          } else {

            console.log(
              "Excel file removed successfully"
            );

          }

        }
      );

    }

  }

};

export const getOems = async (
  req,
  res
) => {

  try {

    const oems = await Oem.find();

    res.status(200).json(
      oems
    );

  } catch (error) {

    res.status(500).json({

      message:
        "Unable to fetch OEM data"

    });

  }

};