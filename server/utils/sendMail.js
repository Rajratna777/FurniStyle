const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports.sendOrderMail = async ({ email, userName, items, total }) => {

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 6);

  const estimatedDelivery = deliveryDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const productList = items.map(
    p => `
      <tr>
        <td style="border:1px solid #ddd;padding:8px">${p.name}</td>
        <td style="border:1px solid #ddd;padding:8px">${p.qty}</td>
        <td style="border:1px solid #ddd;padding:8px">₹${p.price}</td>
      </tr>
    `
  ).join("");

  const html = `
  <div style="font-family:Arial;background:#f6f6f6;padding:30px">
    <div style="max-width:600px;margin:auto;background:#fff;padding:20px">

      <h2 style="color:#b68d40">FurniStyle</h2>

      <p>
        <b>Thank you for shopping with FurniStyle, ${userName}.</b><br/>
        Your order has been successfully placed and is now being processed.
      </p>

      <p>
        <b>Estimated Delivery Date:</b>
        <span style="color:#b68d40">${estimatedDelivery}</span>
      </p>

      <h3>Order Details</h3>

      <table style="width:100%;border-collapse:collapse">
        <tr>
          <th style="border:1px solid #ddd;padding:8px">Product</th>
          <th style="border:1px solid #ddd;padding:8px">Qty</th>
          <th style="border:1px solid #ddd;padding:8px">Price</th>
        </tr>
        ${productList}
      </table>

      <h3>Total Paid: ₹${total}</h3>

      <p>Status: <b style="color:green">Confirmed</b></p>

      <hr/>
      <p style="font-size:13px;color:#777">
        Thank you for shopping with <b>FurniStyle</b>.
      </p>

    </div>
  </div>
  `;

  await transporter.sendMail({
    from: `"FurniStyle" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🛒 FurniStyle Order Confirmation",
    html
  });
};
