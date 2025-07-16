const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const formData = JSON.parse(event.body);
    
    // Spam detection checks
    const spamScore = calculateSpamScore(formData);
    
    if (spamScore > 5) {
      console.log('Spam detected with score:', spamScore);
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Message sent successfully' })
      };
    }
    
    // Send email if not spam
    await sendEmail(formData);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Message sent successfully' })
    };
    
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Internal server error' })
    };
  }
};

function calculateSpamScore(formData) {
  let score = 0;
  
  // Check honeypot fields
  if (formData._gotcha || formData.email_confirm || formData.website) {
    score += 10;
  }
  
  // Check timing
  const timestamp = parseInt(formData._timestamp);
  const now = Date.now();
  if (now - timestamp < 5000) {
    score += 5;
  }
  
  // Check user interactions
  const mouseMoves = parseInt(formData._mouse_moves) || 0;
  const keyPresses = parseInt(formData._key_presses) || 0;
  if (mouseMoves < 3 || keyPresses < 2) {
    score += 3;
  }
  
  // Check JavaScript challenge
  if (!formData._js_challenge || !formData._js_challenge.startsWith('js_enabled_')) {
    score += 8;
  }
  
  // Check browser fingerprint
  if (!formData._user_agent || formData._user_agent.length < 10) {
    score += 5;
  }
  
  // Check for common spam patterns
  const message = (formData.message || '').toLowerCase();
  const email = (formData.email || '').toLowerCase();
  
  const spamKeywords = ['viagra', 'casino', 'loan', 'credit', 'debt', 'make money', 'earn money'];
  spamKeywords.forEach(keyword => {
    if (message.includes(keyword)) score += 2;
  });
  
  // Check email patterns
  if (email.includes('@temp') || email.includes('@test')) {
    score += 3;
  }
  
  return score;
}

async function sendEmail(formData) {
  // Configure your email service here
  // You can use Gmail, SendGrid, or any other email service
  
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'your-email@example.com', // Replace with your email
    subject: `New Contact Form Message from ${formData.name}`,
    text: `
Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}
    `,
    html: `
<h3>New Contact Form Message</h3>
<p><strong>Name:</strong> ${formData.name}</p>
<p><strong>Email:</strong> ${formData.email}</p>
<p><strong>Message:</strong></p>
<p>${formData.message}</p>
    `
  };
  
  await transporter.sendMail(mailOptions);
} 