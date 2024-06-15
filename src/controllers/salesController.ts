import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Sale from '../models/sale';
import PDFDocument from 'pdfkit';

export const getSalesByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  const sales = await Sale.findAll({ where: { userId: userId } });
  res.json(sales);
};

export const getSalesById = async (req: Request, res: Response) => {
  const sale = await Sale.findOne({ where: { id: req.params.id } });
  if (!sale) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  res.json(sale);
};

export const getSales = async (req: Request, res: Response) => {
  const sales = await Sale.findAll();
  res.json(sales);
};

export const addSale = async (req: Request, res: Response) => {
  const { customerName, product, amount, saleDate, userId } = req.body;
  const sale = await Sale.create({ customerName, product, amount, saleDate, userId: userId });
  res.status(201).json(sale);
};

export const updateSaleById = async (req: Request, res: Response) => {
  const { customerName, product, amount, saleDate, userId } = req.body;
  const sale = await Sale.findOne({ where: { id: req.params.id} });
  if (!sale) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  sale.customerName = customerName;
  sale.product = product;
  sale.amount = amount;
  sale.saleDate = saleDate;
  sale.userId = userId;
  await sale.save();
  res.json({ message: 'Sale updated successfully' });
};

export const deleteSaleById = async (req: Request, res: Response) => {
  const sale = await Sale.findOne({ where: { id: req.params.id } });
  if (!sale) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  await sale.destroy();
  res.json({ message: 'Sale deleted successfully' });
};
const formatDate = (date: Date) => {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getSalesPdf = async (req: Request, res: Response) => {
  let start_date = req.query.start_date;
  let end_date = req.query.end_date;

  if (typeof start_date === 'string' && typeof end_date === 'string') {
    const [startDay, startMonth, startYear] = start_date.split('-').map(Number);
    const [endDay, endMonth, endYear] = end_date.split('-').map(Number);

    const sales = await Sale.findAll({
      where: {
        saleDate: {
          [Op.between]: [new Date(startYear, startMonth - 1, startDay), new Date(endYear, endMonth - 1, endDay)]
        }
      }
    });

    const doc = new PDFDocument();
    doc.fontSize(12)
       .text(`Sales from ${formatDate(new Date(startYear, startMonth - 1, startDay))} to ${formatDate(new Date(endYear, endMonth - 1, endDay))}`)
       .moveDown(1);

    sales.forEach((sale, index) => {
      doc.text(`ID: ${sale.id}`)
         .moveDown(0.5)
         .text(`Customer: ${sale.customerName}`)
         .moveDown(0.5)
         .text(`Product: ${sale.product}`)
         .moveDown(0.5)
         .text(`Amount: ${sale.amount}`)
         .moveDown(0.5)
         .text(`Date: ${formatDate(sale.saleDate)}`)
         .moveDown(0.5);

      if (index < sales.length - 1) {
        doc.moveTo(50, doc.y)
           .lineTo(550, doc.y)
           .stroke()
           .moveDown(0.5);
      }
    });
    res.setHeader('Content-Disposition', 'attachment; filename=sales.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);
    doc.end();
  } else {
    res.status(400).json({ message: 'Invalid start_date or end_date' });
  }
};